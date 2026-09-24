import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { db } from './db';
import { contentBlocks, projects } from './db/schema';
import { eq } from 'drizzle-orm';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// S3 Client for Cloudflare R2
const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.CLOUDFLARE_BUCKET_NAME!;
const PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL!;

// --- API ROUTES ---

// 1. Pre-signed URL for uploading images
app.post('/api/upload-url', async (req, res) => {
  try {
    const { filename, contentType } = req.body;
    if (!filename) return res.status(400).json({ error: 'Filename is required' });

    // Sanitize filename and add timestamp to avoid collisions
    const safeFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: safeFilename,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });
    const publicUrl = `${PUBLIC_URL}/${safeFilename}`;

    res.json({ uploadUrl: signedUrl, publicUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});

// 2. Content Blocks (Generic text)
app.get('/api/content', async (req, res) => {
  try {
    const blocks = await db.select().from(contentBlocks);
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.post('/api/content', async (req, res) => {
  try {
    const { id, value } = req.body;
    await db.insert(contentBlocks).values({ id, value }).onConflictDoUpdate({
      target: contentBlocks.id,
      set: { value, updatedAt: new Date() },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// 3. Projects
app.get('/api/projects', async (req, res) => {
  try {
    const allProjects = await db.select().from(projects).orderBy(projects.createdAt);
    res.json(allProjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = await db.insert(projects).values(req.body).returning();
    res.json(newProject[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const updated = await db.update(projects).set({ ...req.body, updatedAt: new Date() }).where(eq(projects.id, parseInt(req.params.id))).returning();
    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await db.delete(projects).where(eq(projects.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});

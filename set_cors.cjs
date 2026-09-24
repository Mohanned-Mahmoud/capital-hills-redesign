const { S3Client, PutBucketCorsCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

async function run() {
  try {
    const command = new PutBucketCorsCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
            AllowedOrigins: ['*'],
            ExposeHeaders: [],
            MaxAgeSeconds: 3000,
          },
        ],
      },
    });
    
    await S3.send(command);
    console.log("CORS updated successfully on Cloudflare R2!");
  } catch (e) {
    console.error("Error setting CORS:", e);
  }
}

run();

import { db } from './db';
import { contentBlocks, projects } from './db/schema';
import { projects as initialProjects } from '../src/data/projects';

async function seed() {
  try {
    console.log('Seeding database...');
    
    // Seed content blocks
    const defaultContent = [
      { id: 'hero_title', value: 'A clearer path' },
      { id: 'hero_subtitle', value: 'Homes worth coming home to' },
      { id: 'chairman_quote', value: 'Trust is more than a promise. It is the foundation of everything we build.' },
    ];
    
    for (const block of defaultContent) {
      await db.insert(contentBlocks).values(block).onConflictDoUpdate({
        target: contentBlocks.id,
        set: { value: block.value }
      });
    }
    
    console.log('Seeded content blocks');

    // Seed projects
    // First clear existing projects (for clean seed)
    await db.delete(projects);

    for (const p of initialProjects) {
      await db.insert(projects).values({
        slug: p.slug,
        name: p.name,
        location: p.location,
        city: p.city,
        projectSpace: p.projectSpace || null,
        builtUpArea: p.builtUpArea || null,
        construction: p.construction || null,
        product: p.product,
        finishing: p.finishing || null,
        delivery: p.delivery || null,
        extraDetails: p.extraDetails || null,
        gallery: p.gallery,
        description: p.description || null,
      });
    }

    console.log('Seeded projects');
    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();

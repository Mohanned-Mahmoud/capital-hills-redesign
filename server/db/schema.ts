import { pgTable, serial, text, json, timestamp, boolean } from 'drizzle-orm/pg-core';

// For generic website content (e.g., hero text, chairman message, etc)
export const contentBlocks = pgTable('content_blocks', {
  id: text('id').primaryKey(), // e.g., 'hero_title', 'chairman_message'
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// For projects
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  city: text('city').notNull(),
  projectSpace: text('project_space'),
  builtUpArea: text('built_up_area'),
  construction: text('construction'),
  product: text('product').notNull(),
  finishing: text('finishing'),
  delivery: text('delivery'),
  extraDetails: json('extra_details'), // Store as JSON object
  gallery: json('gallery').notNull(), // Store array of image URLs
  description: text('description'),
  featured: boolean('featured').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

import { db } from './db';
import { contentBlocks } from './db/schema';
import { eq } from 'drizzle-orm';

const defaultContent: Record<string, string> = {
  'hero_title': 'A clearer path',
  'hero_subtitle': 'Thoughtfully planned communities. A better tomorrow.',
  'home_hero_bg': 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=2000',
  'stat_1_val': '18',
  'stat_1_suf': '',
  'stat_1_lbl': 'Key projects delivered',
  'stat_2_val': '4',
  'stat_2_suf': '',
  'stat_2_lbl': 'Prime Egyptian cities',
  'stat_3_val': '2017',
  'stat_3_suf': '',
  'stat_3_lbl': 'Year established',
  'stat_4_val': '15',
  'stat_4_suf': ' yrs',
  'stat_4_lbl': 'Max instalment plan',
  'home_why_eyebrow': 'Why Capital Hills',
  'home_why_title_1': 'Invest With',
  'home_why_title_2': 'Trust.',
  'home_why_desc': 'We believe real estate is more than a property. It is a decision about your future, your family, your business, and your investment.',
  'home_cta_eyebrow': 'One good conversation',
  'home_cta_title': "Let's find the place that makes sense for you.",
  'home_cta_desc': 'Tell us your city, your range, and what you need. We will come back with useful options, not a sales pitch.',
  'home_cta_bg': 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=1000',
  'chairman_quote': 'Trust is more than a promise. It is the foundation of everything we build.',
  'chairman_name_1': 'Eng. Mohamed Salah',
  'chairman_name_2': 'Abdel Qader',
  'chairman_title': 'Chairman — Capital Hills Developments',
  'chairman_p1': 'At Capital Hills Developments, we believe real estate development is about more than building. It is about shaping communities, creating lasting value, and building trust that stands the test of time.',
  'chairman_p2': "For the past 10 years, we have been building our presence in the real estate sector, guided by a commitment to developing destinations that meet our customers' evolving needs — combining thoughtful planning, quality, and strategic locations with a long-term perspective.",
  'chairman_p3': 'We recognize that every project represents an important decision for our customers — whether they are choosing a home, growing a business, or making an investment. This responsibility guides our approach and reinforces our commitment to delivering value at every stage of the journey.',
  'chairman_p4': 'As we continue to grow, we remain focused on building strong relationships with our customers, partners, and communities, while fostering an environment where our people can grow, contribute, and succeed.',
  'home_chairman_img': '/chairman.png',
  'global_footer_desc': 'Creating spaces where people can live, work, grow, and connect.',
  'global_footer_phone': '16693',
  'global_footer_email': 'hello@capitalhillsdevelopments.eg',
  'whyus_hero_title': 'WHAT DEFINES US',
  'whyus_hero_desc_1': "Since 2017, we have been shaping Cairo's landscape by connecting East and West through developments that merge modern architecture with practical functionality and a clear understanding of our clients' aspirations. Every project we deliver is guided by a commitment to long-term value, serving as an investment for our clients while enriching the wider community.",
  'whyus_hero_desc_2': "From dynamic commercial hubs that drive business growth to lifestyle-focused residential spaces that elevate everyday living, our portfolio reflects a vision of progress, innovation, and sustainability. At Capital Hills Developments, we don't just build for today — we build for generations to come.",
  'whyus_core_title': 'CORE VALUES',
  'whyus_story_eyebrow': 'THIS IS OURS',
  'whyus_story_title_1': 'Every Story',
  'whyus_story_title_2': 'has',
  'whyus_story_title_3': 'A Start.',
  'whyus_story_p1': 'Long before Capital Hills was established, the foundations were already in place.',
  'whyus_story_p2': 'Since 2017, the company delivered standalone buildings across Hadayek October and 6th of October, focused on solid construction and reliable execution.',
  'whyus_story_p3': 'In 2020, this experience evolved into Capital Hills Developments, marking the shift from individual projects to large-scale, mixed-use destinations. Today, Capital Hills continues to build integrated developments that support modern living, business growth, and long-term value.',
  'whyus_mission_title': 'The Path We Build',
  'whyus_mission_desc': 'We build integrated communities and deliver real, measurable returns on every investment on time, every time, with a personal relationship behind every deal.',
  'whyus_vision_title': 'The World We See',
  'whyus_vision_desc': 'To be a trusted real estate partner, creating communities and investment opportunities that deliver lasting value.',
  'contact_eyebrow': 'A real person is close by',
  'contact_title_1': "Let's make the",
  'contact_title_2': 'next step feel simple.',
  'contact_desc': 'Call, message, or book a quiet walk-through. Tell us what you are considering and we will bring useful answers.',
  'contact_phone': '16693',
  'contact_email': 'hello@capitalhillsdevelopments.eg',
  'contact_address': 'Cairo, Egypt'
};

async function seed() {
  console.log('Seeding default content into DB...');
  
  for (const [key, value] of Object.entries(defaultContent)) {
    // Check if exists
    const existing = await db.select().from(contentBlocks).where(eq(contentBlocks.id, key));
    
    if (existing.length === 0) {
      await db.insert(contentBlocks).values({ id: key, value: value });
      console.log(`Inserted: ${key}`);
    } else if (!existing[0].value) {
      // If exists but empty, update it
      await db.update(contentBlocks).set({ value: value }).where(eq(contentBlocks.id, key));
      console.log(`Updated empty key: ${key}`);
    }
  }
  
  console.log('Seeding complete!');
  process.exit(0);
}

seed();

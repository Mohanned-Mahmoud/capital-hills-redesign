import { db } from './db';
import { contentBlocks } from './db/schema';
import { eq } from 'drizzle-orm';

const defaultContent: Record<string, string> = {
  // Why Us
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
  'whyus_hero_bg': 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=2000',
  'whyus_cta_eyebrow': "Ready to see what we've built?",
  'whyus_cta_title': "Browse our latest projects.",
  
  // Lists for Why Us (JSON)
  'whyus_core_list': JSON.stringify([
    { title: 'CUSTOMER FOCUS', copy: 'Placing our clients interests at the center of every decision and action.' },
    { title: 'TRANSPARENCY', copy: 'Building long-term trust through clarity, integrity and open communication.' },
    { title: 'COMMITMENT', copy: 'Honoring our promises with consistency, reliability and excellence in execution time.' },
    { title: 'INNOVATION', copy: 'Leveraging modern solutions and creative thinking to elevate living, working and investment experiences.' },
    { title: 'DIVERSITY', copy: 'Fostering inclusive communities that embrace different needs, preferences and lifestyles.' },
  ]),
  'whyus_categories_list': JSON.stringify([
    { title: 'LIVING', subtitle: 'Residential Developments', desc: 'Lifestyle driven communities thoughtfully designed to blend comfort, beauty and convenience.' },
    { title: 'WORKING', subtitle: 'Commercial Developments', desc: 'Strategic business destinations offering prime visibility, seamless accessibility and long-term value.' },
    { title: 'TOGETHER', subtitle: 'Mixed-Use Projects', desc: 'Integrated destinations that combine retail, offices, medical facilities and leisure spaces to create dynamic hubs of modern living and working.' }
  ]),

  // Contact
  'contact_eyebrow': 'A real person is close by',
  'contact_title_1': "Let's make the",
  'contact_title_2': 'next step feel simple.',
  'contact_desc': "Whether you're looking for your next home or a strategic investment, our advisors are ready to guide you.",
  'contact_phone': '16693',
  'contact_email': 'hello@capitalhillsdevelopments.eg',
  'contact_address': 'Galleria 40, Sheikh Zayed, Egypt',
  'contact_form_eyebrow': 'Have a quick question?',
  'contact_form_title': 'We can start there.',
  'contact_form_desc': 'No forms that go into a black hole. Leave your number and a sentence, and a member of our team will call.',
  'contact_map_url': 'https://www.google.com/maps?q=Galleria+40,+Sheikh+Zayed,+Egypt&output=embed'
};

async function seed() {
  console.log('Seeding Why Us and Contact...');
  for (const [key, value] of Object.entries(defaultContent)) {
    const existing = await db.select().from(contentBlocks).where(eq(contentBlocks.id, key));
    if (existing.length === 0) {
      await db.insert(contentBlocks).values({ id: key, value: value });
      console.log(`Inserted: ${key}`);
    } else if (!existing[0].value) {
      await db.update(contentBlocks).set({ value: value }).where(eq(contentBlocks.id, key));
      console.log(`Updated empty key: ${key}`);
    }
  }
  console.log('Seeding complete!');
  process.exit(0);
}

seed();

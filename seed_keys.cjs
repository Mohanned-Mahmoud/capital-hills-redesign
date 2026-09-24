const defaultKeys = {
  // Home
  'stat_1_val': '18',
  'stat_1_suf': '',
  'stat_1_lbl': 'Key projects delivered',
  'stat_2_val': '5000',
  'stat_2_suf': '+',
  'stat_2_lbl': 'Happy families',
  'stat_3_val': '10',
  'stat_3_suf': 'M',
  'stat_3_lbl': 'Sqm under development',
  'stat_4_val': '100',
  'stat_4_suf': '+',
  'stat_4_lbl': 'Industry awards',
  'home_projects_title': 'LATEST PROJECTS',
  'home_projects_desc': 'Discover our portfolio of signature developments, designed to redefine modern living across Egypt.',
  'home_projects_btn': 'View All Projects',
  'partners_title_1': 'WE BUILT',
  'partners_title_2': 'RELATIONSHIPS WITH',
  
  // Why Us
  'whyus_hero_title_1': 'Building',
  'whyus_hero_title_2': 'beyond',
  'whyus_hero_title_3': 'boundaries',
  'whyus_hero_desc': "We don't just build structures; we architect communities. For over a decade, Capital Hills has been at the forefront of urban innovation in Egypt.",
  'whyus_pillars_title_1': 'THE PILLARS',
  'whyus_pillars_title_2': 'OF OUR LEGACY',

  // Contact
  'contact_title': 'Let\\'s talk',
  'contact_subtitle': 'future.',
  'contact_desc': "Whether you're looking for your next home or a strategic investment, our advisors are ready to guide you."
};

async function seed() {
  for (const [key, value] of Object.entries(defaultKeys)) {
    try {
      await fetch('http://localhost:3001/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, value })
      });
      console.log(`Seeded ${key}`);
    } catch(e) {
      console.error(`Failed ${key}`, e);
    }
  }
}

seed();

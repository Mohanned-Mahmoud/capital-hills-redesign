const defaultKeys = {
  'global_header_talk': 'Talk to us',
  'global_footer_desc': 'Homes with sound thinking behind them. For the way Egyptians actually live.',
  'global_footer_explore': 'Explore',
  'global_footer_visit': 'Visit',
  'global_footer_need': 'Need a second opinion?',
  'global_footer_need_desc': 'Tell us what you are looking for. A real person will call with a clear answer.',
  'global_footer_copy': '© 2026 Capital Hills Developments',
  'global_footer_slogan': 'Built for better decisions.'
};

async function seed() {
  for (const [key, value] of Object.entries(defaultKeys)) {
    try {
      await fetch('http://localhost:3001/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, value })
      });
      console.log('Seeded ' + key);
    } catch(e) {
      console.error(e);
    }
  }
}

seed();

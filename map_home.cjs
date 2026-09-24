const fs = require('fs');

let homeCode = fs.readFileSync('src/pages/home.tsx', 'utf8');

// Replace Stats
homeCode = homeCode.replace(
  /\{ value: 18, suffix: '', label: 'Key projects delivered' \},/,
  `{ value: parseInt(content['stat_1_val']) || 18, suffix: content['stat_1_suf'] || '', label: content['stat_1_lbl'] || 'Key projects delivered' },`
);
homeCode = homeCode.replace(
  /\{ value: 5000, suffix: '\+', label: 'Happy families' \},/,
  `{ value: parseInt(content['stat_2_val']) || 5000, suffix: content['stat_2_suf'] || '+', label: content['stat_2_lbl'] || 'Happy families' },`
);
homeCode = homeCode.replace(
  /\{ value: 10, suffix: 'M', label: 'Sqm under development' \},/,
  `{ value: parseInt(content['stat_3_val']) || 10, suffix: content['stat_3_suf'] || 'M', label: content['stat_3_lbl'] || 'Sqm under development' },`
);
homeCode = homeCode.replace(
  /\{ value: 100, suffix: '\+', label: 'Industry awards' \},/,
  `{ value: parseInt(content['stat_4_val']) || 100, suffix: content['stat_4_suf'] || '+', label: content['stat_4_lbl'] || 'Industry awards' },`
);

// Replace Latest Projects headers
homeCode = homeCode.replace(
  /LATEST PROJECTS<\/span>/,
  `{content['home_projects_title'] || 'LATEST PROJECTS'}</span>`
);
homeCode = homeCode.replace(
  /<p className="text-xl md:text-2xl text-\[\#947e82\] max-w-2xl mt-4 leading-relaxed">.*?Discover our portfolio of signature developments.*?<\/p>/s,
  `<p className="text-xl md:text-2xl text-[#947e82] max-w-2xl mt-4 leading-relaxed">\n              {content['home_projects_desc'] || 'Discover our portfolio of signature developments, designed to redefine modern living across Egypt.'}\n            </p>`
);

// Replace View All Projects
homeCode = homeCode.replace(
  /<span className="font-bold text-sm tracking-widest uppercase">View All Projects<\/span>/,
  `<span className="font-bold text-sm tracking-widest uppercase">{content['home_projects_btn'] || 'View All Projects'}</span>`
);

// Replace Partners Headers
homeCode = homeCode.replace(
  /<span className="block font-bold text-\[\#421319\]">WE BUILT<\/span>/,
  `<span className="block font-bold text-[#421319]">{content['partners_title_1'] || 'WE BUILT'}</span>`
);
homeCode = homeCode.replace(
  /<span className="block font-light text-\[\#f5f2e9\]">RELATIONSHIPS WITH<\/span>/,
  `<span className="block font-light text-[#f5f2e9]">{content['partners_title_2'] || 'RELATIONSHIPS WITH'}</span>`
);

fs.writeFileSync('src/pages/home.tsx', homeCode);
console.log('Mapped home.tsx strings');

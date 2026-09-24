const fs = require('fs');

let detailCode = fs.readFileSync('src/pages/project-detail.tsx', 'utf8');

detailCode = detailCode.replace(
  /const \[compare, setCompare\] = useState\(projects\.find\(\(item\) => item\.slug !== slug\)\?\.slug \|\| projects\[0\]\.slug\);/,
  "const [compare, setCompare] = useState(() => projects.find((item) => item.slug !== slug)?.slug || projects[0]?.slug || '');"
);

detailCode = detailCode.replace(
  /const comparison = getProject\(compare\) \|\| projects\.find\(\(item\) => item\.slug !== project\.slug\) \|\| projects\[0\];/,
  "const comparison = getProject(compare) || projects.find((item) => item.slug !== project.slug) || projects[0] || project;"
);

fs.writeFileSync('src/pages/project-detail.tsx', detailCode);
console.log('Fixed project-detail.tsx crashes');

let projectsCode = fs.readFileSync('src/pages/projects.tsx', 'utf8');
projectsCode = projectsCode.replace(
  /projects\.filter/g,
  "allProjects.filter"
);
projectsCode = projectsCode.replace(
  /projects\.map/g,
  "allProjects.map"
);
fs.writeFileSync('src/pages/projects.tsx', projectsCode);
console.log('Fixed projects.tsx crashes');

let homeCode = fs.readFileSync('src/pages/home.tsx', 'utf8');
// Check if home.tsx has similar mapping over an initially empty `projects` array that might crash?
// No, mapping an empty array is fine, it just returns empty.
// Crash only happens when accessing elements by index like `[0].slug`

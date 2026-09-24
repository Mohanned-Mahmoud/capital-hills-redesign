const fs = require('fs');

let code = fs.readFileSync('src/pages/project-detail.tsx', 'utf8');
code = code.replace(
  /const { slug } = useParams<{ slug: string }>\(\);\r?\n  const project = getProject\(slug\);/,
  `const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug) || getProject(slug);

  if (!project) {
    return <Shell><div className="pt-32 pb-32 text-center font-display text-2xl text-[#421319]">Project not found</div></Shell>;
  }`
);

fs.writeFileSync('src/pages/project-detail.tsx', code);
console.log('Fixed project-detail.tsx');

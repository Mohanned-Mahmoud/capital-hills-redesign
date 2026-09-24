const fs = require('fs');

let code = fs.readFileSync('src/pages/home.tsx', 'utf8');

// 1. Home signature
code = code.replace(
  /export default function Home\(\) \{\s*const \[review, setReview\] = useState\(0\);/,
  `export default function Home() {
  const { content, projects } = useData();
  const tickerItems = projects.flatMap((p) => [\`\${p.name} — \${p.city}\`, '·']);
  const [review, setReview] = useState(0);`
);

// 2. Hero Title
code = code.replace(
  /<span className="font-sans font-semibold">A clearer path<\/span>/,
  `<span className="font-sans font-semibold">{content['hero_title'] || 'A clearer path'}</span>`
);

// 3. Hero Subtitle
code = code.replace(
  /Thoughtfully planned communities\. <span className="font-display italic text-lg text-\[\#f5f2e9\]">A better tomorrow\.<\/span>/,
  `{content['hero_subtitle'] || 'Thoughtfully planned communities. A better tomorrow.'}`
);

// 4. Chairman Quote
code = code.replace(
  /Trust is more than a promise\.<br \/>\s*<span className="italic text-\[\#947e82\]">It is the foundation of everything we build\.<\/span>/,
  `{content['chairman_quote'] || 'Trust is more than a promise. It is the foundation of everything we build.'}`
);

fs.writeFileSync('src/pages/home.tsx', code);
console.log('Fixed home.tsx');

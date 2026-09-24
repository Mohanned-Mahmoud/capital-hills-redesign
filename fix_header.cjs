const fs = require('fs');
let code = fs.readFileSync('src/components/site.tsx', 'utf8');

// Find Header and inject useData
const headerRegex = /export function Header\(\) \{/;
if (headerRegex.test(code)) {
  if (!code.includes('const { content } = useData();', code.indexOf('export function Header() {'))) {
    code = code.replace(headerRegex, "export function Header() {\n  const { content } = useData();");
    fs.writeFileSync('src/components/site.tsx', code);
    console.log('Fixed Header!');
  } else {
    console.log('useData already in Header!');
  }
} else {
  console.log('Header not found!');
}

const fs = require('fs');
let c = fs.readFileSync('src/components/site.tsx', 'utf8');

c = c.replace(/export function Header\(\) \{/, 'export function Header() {\n  const { content } = useData();');
c = c.replace(/join\('\\n  const \{ content \} = useData\(\);\\n  const \{ content \} = useData\(\);\\n'\)/g, "join('\\n')");
// Let's just be extremely safe and check if it already has useData() in Header
if (!c.includes('export function Header() {\n  const { content } = useData();')) {
    c = c.replace('export function Header() {\r\n  const [open, setOpen] = useState(false);', 'export function Header() {\r\n  const { content } = useData();\r\n  const [open, setOpen] = useState(false);');
}
fs.writeFileSync('src/components/site.tsx', c);
console.log('Fixed Header');

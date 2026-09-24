const fs = require('fs');

let code = fs.readFileSync('src/components/site.tsx', 'utf8');

// Inject useData import if not there
if (!code.includes("import { useData }")) {
  code = code.replace(
    /import \{ FadeIn \} from '@\/components\/animations';/,
    "import { FadeIn } from '@/components/animations';\nimport { useData } from '@/context/DataContext';"
  );
}

// Inject useData into Header
code = code.replace(
  /export function Header\(\{ lightPage = false \}: \{ lightPage\?: boolean \}\) \{/,
  "export function Header({ lightPage = false }: { lightPage?: boolean }) {\n  const { content } = useData();"
);

// Replace "Talk to us" in Header
code = code.replace(
  /<Phone size=\{13\} \/> Talk to us/,
  "<Phone size={13} /> {content['global_header_talk'] || 'Talk to us'}"
);

// Inject useData into Footer
code = code.replace(
  /export function Footer\(\) \{/,
  "export function Footer() {\n  const { content } = useData();"
);

// Replace strings in Footer
code = code.replace(
  /Homes with sound thinking behind them\. For the way Egyptians actually live\./,
  "{content['global_footer_desc'] || 'Homes with sound thinking behind them. For the way Egyptians actually live.'}"
);

code = code.replace(
  />Explore</,
  ">{content['global_footer_explore'] || 'Explore'}<"
);
code = code.replace(
  />Visit</,
  ">{content['global_footer_visit'] || 'Visit'}<"
);
code = code.replace(
  />Need a second opinion\?</,
  ">{content['global_footer_need'] || 'Need a second opinion?'}<"
);
code = code.replace(
  /Tell us what you are looking for\. A real person will call with a clear answer\./,
  "{content['global_footer_need_desc'] || 'Tell us what you are looking for. A real person will call with a clear answer.'}"
);

code = code.replace(
  /© 2026 Capital Hills Developments/,
  "{content['global_footer_copy'] || '© 2026 Capital Hills Developments'}"
);
code = code.replace(
  /Built for better decisions\./,
  "{content['global_footer_slogan'] || 'Built for better decisions.'}"
);

fs.writeFileSync('src/components/site.tsx', code);
console.log('Mapped site.tsx');

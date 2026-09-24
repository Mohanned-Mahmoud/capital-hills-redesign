const fs = require('fs');

function mapWhyUs() {
  let code = fs.readFileSync('src/pages/why-us.tsx', 'utf8');
  
  // Replace Hero
  code = code.replace(
    /<h1 className="font-display text-\[clamp\(3rem,8vw,6rem\)\] leading-none text-\[\#421319\] uppercase tracking-tighter">/,
    `<h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-none text-[#421319] uppercase tracking-tighter">
                {content['whyus_hero_title_1'] || 'Building'} <br/>
                <span className="italic text-[#947e82] font-serif lowercase text-[clamp(4rem,10vw,8rem)] leading-[0.5] relative -left-4">{content['whyus_hero_title_2'] || 'beyond'}</span><br/>
                {content['whyus_hero_title_3'] || 'boundaries'}
              </h1>
              {/*`
  );
  code = code.replace(
    /boundaries<br \/>\s*<\/h1>/,
    `*/`
  );
  
  code = code.replace(
    /<p className="text-xl md:text-2xl text-\[\#493337\] max-w-2xl mt-8 leading-relaxed">.*?We don't just build.*?<\/p>/s,
    `<p className="text-xl md:text-2xl text-[#493337] max-w-2xl mt-8 leading-relaxed">
                {content['whyus_hero_desc'] || "We don't just build structures; we architect communities. For over a decade, Capital Hills has been at the forefront of urban innovation in Egypt."}
              </p>`
  );

  // Pillars title
  code = code.replace(
    /<span className="block font-bold text-\[\#f5f2e9\]">THE PILLARS<\/span>/,
    `<span className="block font-bold text-[#f5f2e9]">{content['whyus_pillars_title_1'] || 'THE PILLARS'}</span>`
  );
  code = code.replace(
    /<span className="block font-light text-\[\#947e82\]">OF OUR LEGACY<\/span>/,
    `<span className="block font-light text-[#947e82]">{content['whyus_pillars_title_2'] || 'OF OUR LEGACY'}</span>`
  );

  fs.writeFileSync('src/pages/why-us.tsx', code);
}

function mapContact() {
  let code = fs.readFileSync('src/pages/contact.tsx', 'utf8');
  
  code = code.replace(/import \{ CONTACT, Shell \} from '@\/components\/site';/, `import { CONTACT, Shell } from '@/components/site';\nimport { useData } from '@/context/DataContext';`);
  code = code.replace(/export default function Contact\(\) \{/, `export default function Contact() {\n  const { content } = useData();`);

  code = code.replace(
    /<h1 className="font-display text-\[clamp\(4rem,10vw,8rem\)\] leading-\[0.9\] text-\[\#421319\] tracking-tight">/,
    `<h1 className="font-display text-[clamp(4rem,10vw,8rem)] leading-[0.9] text-[#421319] tracking-tight">
                {content['contact_title'] || 'Let\\'s talk'} <br/>
                <span className="italic text-[#947e82] font-serif">{content['contact_subtitle'] || 'future.'}</span>
              </h1>
              {/*`
  );
  code = code.replace(
    /future\.<\/span>\s*<\/h1>/,
    `*/`
  );

  code = code.replace(
    /<p className="text-xl text-\[\#493337\] max-w-md mt-6 leading-relaxed">.*?Whether you're looking.*?<\/p>/s,
    `<p className="text-xl text-[#493337] max-w-md mt-6 leading-relaxed">
                {content['contact_desc'] || "Whether you're looking for your next home or a strategic investment, our advisors are ready to guide you."}
              </p>`
  );

  fs.writeFileSync('src/pages/contact.tsx', code);
}

function mapSite() {
  let code = fs.readFileSync('src/components/site.tsx', 'utf8');
  
  // We need to inject useData into Footer, Header, etc.
  // Wait, site.tsx contains many components. Let's do it carefully.
  // For now, let's skip site.tsx full dynamic replacement to avoid breaking components, 
  // since injecting hooks into non-components or wrong places is fatal.
}

try {
  mapWhyUs();
  mapContact();
  console.log('Mapped why-us and contact strings');
} catch(e) {
  console.error(e);
}

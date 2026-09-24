import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Shell } from '@/components/site';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const coreValues = [
  { title: 'CUSTOMER FOCUS', copy: 'Placing our clients interests at the center of every decision and action.' },
  { title: 'TRANSPARENCY', copy: 'Building long-term trust through clarity, integrity and open communication.' },
  { title: 'COMMITMENT', copy: 'Honoring our promises with consistency, reliability and excellence in execution time.' },
  { title: 'INNOVATION', copy: 'Leveraging modern solutions and creative thinking to elevate living, working and investment experiences.' },
  { title: 'DIVERSITY', copy: 'Fostering inclusive communities that embrace different needs, preferences and lifestyles.' },
];

export default function WhyUs() {
  return (
    <Shell>
      <main>
        {/* ── Slide 1: WHAT DEFINES US ── */}
        <section className="relative flex flex-col justify-end overflow-hidden bg-[#250f12] px-8 py-20 pt-36 text-[#f5f2e9] md:px-16 md:pt-32 min-h-[90vh]">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=2000"
              alt="WHAT DEFINES US"
              className="h-full w-full object-cover opacity-30 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#250f12] via-[#250f12]/80 to-transparent" />
            
            {/* Circular cut-out with emblem */}
            <div className="absolute right-[-10%] top-[20%] w-[800px] opacity-[0.05] pointer-events-none">
              <img src="/capital-hills-icon-light.png" alt="" className="w-full h-auto" />
            </div>
          </div>
          <FadeIn className="relative z-10 max-w-3xl">
            <h1 className="font-display text-5xl leading-[1.02] tracking-[-0.02em] md:text-[clamp(3rem,5vw,4.5rem)] text-[#f5f2e9]">
              WHAT DEFINES US
            </h1>
            <p className="mt-7 text-base leading-7 text-[#f5f2e9]/80 font-sans">
              Since 2017, we have been shaping Cairo's landscape by connecting East and West through developments that merge modern architecture with practical functionality and a clear understanding of our clients' aspirations. Every project we deliver is guided by a commitment to long-term value, serving as an investment for our clients while enriching the wider community.
            </p>
            <p className="mt-5 text-base leading-7 text-[#f5f2e9]/80 font-sans">
              From dynamic commercial hubs that drive business growth to lifestyle-focused residential spaces that elevate everyday living, our portfolio reflects a vision of progress, innovation, and sustainability. At Capital Hills Developments, we don't just build for today — we build for generations to come.
            </p>
          </FadeIn>
        </section>

        {/* ── Slide 2: CORE VALUES ── */}
        <section className="py-20 md:py-32 bg-[#421319] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-[20%] w-[300px] h-[300px] bg-white rounded-full blur-[100px]" />
          </div>
          <div className="container-shell relative z-10">
            <FadeIn>
              <h2 className="font-display text-3xl md:text-4xl text-[#f5f2e9] mb-12 border-b border-[#f5f2e9]/20 pb-4">CORE VALUES</h2>
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {coreValues.map((v, i) => (
                  <StaggerItem key={v.title}>
                    <h3 className="font-sans font-bold text-lg text-[#947e82] mb-3">{v.title}</h3>
                    <p className="text-sm leading-6 text-[#f5f2e9]/80">{v.copy}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          </div>
        </section>

        {/* ── Slide 3 & 4: THIS IS OURS ── */}
        <section className="py-24 md:py-40 bg-[#f5f2e9] relative">
          <div className="container-shell">
            <FadeIn className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl text-[#421319]">
                <span className="block font-sans font-medium">Every Story</span>
                <span className="block font-display italic text-[#947e82] text-3xl mt-2 mb-2">has</span>
                <span className="block font-mono">A Start.</span>
              </h2>
            </FadeIn>

            <FadeIn>
              <h2 className="font-sans text-5xl md:text-7xl font-light tracking-tighter text-[#421319] opacity-20 mb-8 uppercase">THIS IS OURS</h2>
              <div className="max-w-4xl border-l-2 border-[#947e82] pl-8">
                <p className="font-sans font-bold text-lg md:text-xl text-[#421319] mb-8">WITH TOTAL INVESTMENTS EXCEEDING EGP 100 BILLION</p>
                <div className="space-y-6 text-[#493337] text-base md:text-lg leading-relaxed">
                  <p>Long before Capital Hills was established, the foundations were already in place.</p>
                  <p>Since 2017, the company delivered standalone buildings across Hadayek October and 6th of October, focused on solid construction and reliable execution.</p>
                  <p>In 2020, this experience evolved into Capital Hills Developments, marking the shift from individual projects to large-scale, mixed-use destinations. Today, Capital Hills continues to build integrated developments that support modern living, business growth, and long-term value.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Slide 5 & 6: MISSION & VISION ── */}
        <section className="grid md:grid-cols-2 min-h-[60vh]">
          {/* Mission */}
          <div className="bg-[#421319] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden">
            <FadeIn className="relative z-10">
              <h2 className="font-display text-4xl text-[#947e82] mb-6">The Path We Build</h2>
              <p className="text-lg leading-relaxed text-[#f5f2e9]">
                We build integrated communities and deliver real, measurable returns on every investment on time, every time, with a personal relationship behind every deal.
              </p>
              <p className="mt-12 font-mono text-xs uppercase tracking-widest text-[#f5f2e9]/50 text-center">Invest With Trust / Grow With Community</p>
            </FadeIn>
          </div>
          {/* Vision */}
          <div className="bg-[#f5f2e9] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden">
            <FadeIn className="relative z-10">
              <h2 className="font-display text-4xl text-[#421319] mb-6">The World We See</h2>
              <p className="text-lg leading-relaxed text-[#493337]">
                To be a trusted real estate partner, creating communities and investment opportunities that deliver lasting value.
              </p>
              <p className="mt-12 font-mono text-xs uppercase tracking-widest text-[#493337]/50 text-center">Invest With Trust / Grow With Community</p>
            </FadeIn>
          </div>
        </section>

        {/* ── Slide 7: LIVING / WORKING / TOGETHER ── */}
        <section className="py-24 bg-[#493337]">
          <div className="container-shell">
            <FadeIn>
              <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="bg-[#f5f2e9] p-8 rounded-xl shadow-xl transform md:-translate-y-8">
                  <h3 className="font-display text-3xl text-[#421319] mb-2">LIVING</h3>
                  <p className="font-mono text-xs text-[#947e82] mb-4 uppercase tracking-widest">Residential Developments</p>
                  <p className="text-[#493337]">Lifestyle driven communities thoughtfully designed to blend comfort, beauty and convenience.</p>
                </div>
                <div className="bg-[#f5f2e9] p-8 rounded-xl shadow-xl transform md:translate-y-8">
                  <h3 className="font-display text-3xl text-[#421319] mb-2">WORKING</h3>
                  <p className="font-mono text-xs text-[#947e82] mb-4 uppercase tracking-widest">Commercial Developments</p>
                  <p className="text-[#493337]">Strategic business destinations offering prime visibility, seamless accessibility and long-term value.</p>
                </div>
                <div className="bg-[#f5f2e9] p-8 rounded-xl shadow-xl md:col-span-2 md:w-2/3 md:mx-auto transform md:translate-y-4">
                  <h3 className="font-display text-3xl text-[#421319] mb-2">TOGETHER</h3>
                  <p className="font-mono text-xs text-[#947e82] mb-4 uppercase tracking-widest">Mixed-Use Projects</p>
                  <p className="text-[#493337]">Integrated destinations that combine retail, offices, medical facilities and leisure spaces to create dynamic hubs of modern living and working.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CHAIRMAN'S MESSAGE ── */}
        <section className="relative bg-[#231f20] overflow-hidden">

          {/* ── Decorative geometry layer ── */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            {/* Massive faint ring top-right */}
            <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full border border-[#947e82]/10" />
            <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full border border-[#947e82]/8" />
            {/* Accent line bottom-left */}
            <div className="absolute bottom-0 left-0 w-[2px] h-[60%] bg-gradient-to-t from-[#947e82]/40 to-transparent" />
            {/* Horizontal rule mid */}
            <div className="absolute top-[48%] left-0 right-0 h-[1px] bg-[#947e82]/[0.07]" />
          </div>

          <div className="container-shell relative z-10 py-24 md:py-36">
            {/* ── Top eyebrow ── */}
            <FadeIn>
              <div className="flex items-center gap-6 mb-16">
                <div className="w-10 h-[2px] bg-[#947e82]" />
                <p className="font-mono text-[10px] uppercase tracking-[.28em] text-[#947e82]">Chairman's Message</p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-12 gap-12 md:gap-0 items-start">

              {/* ── LEFT: Photo column ── */}
              <FadeIn delay={0.1} className="md:col-span-5 md:sticky md:top-28 self-start">
                <div className="relative">
                  {/* Accent border frame — offset behind photo */}
                  <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#947e82]/30 rounded-xl" />
                  {/* Photo */}
                  <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                    <img
                      src="/chairman.png"
                      alt="Eng. Mohamed Salah Abdel Qader — Chairman"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                    {/* Subtle brand tint at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#421319]/60 to-transparent" />
                    {/* Name badge pinned bottom */}
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <p className="font-display text-2xl text-[#f5f2e9] leading-tight">Eng. Mohamed Salah<br />Abdel Qader</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[.2em] text-[#947e82]">Chairman — Capital Hills Developments</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* ── RIGHT: Quote + body ── */}
              <div className="md:col-span-7 md:pl-16 flex flex-col gap-10">
                {/* Pull-quote — the most visually impactful element */}
                <FadeIn delay={0.2}>
                  <div className="relative">
                    <span aria-hidden="true" className="absolute -top-6 -left-2 font-display text-[120px] leading-none text-[#947e82]/20 select-none">"</span>
                    <p className="relative font-display text-3xl md:text-4xl leading-[1.2] text-[#f5f2e9] tracking-tight pt-4">
                      Trust is more than a promise.<br />
                      <span className="italic text-[#947e82]">It is the foundation of everything we build.</span>
                    </p>
                  </div>
                </FadeIn>

                {/* Divider */}
                <FadeIn delay={0.25}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-[2px] bg-[#947e82]" />
                    <div className="flex-1 h-[1px] bg-[#947e82]/20" />
                  </div>
                </FadeIn>

                {/* Body paragraphs */}
                <FadeIn delay={0.3}>
                  <div className="space-y-5 text-[15px] leading-8 text-[#f5f2e9]/65 font-sans">
                    <p>At Capital Hills Developments, we believe real estate development is about more than building. It is about shaping communities, creating lasting value, and building trust that stands the test of time.</p>
                    <p>For the past 10 years, we have been building our presence in the real estate sector, guided by a commitment to developing destinations that meet our customers' evolving needs — combining thoughtful planning, quality, and strategic locations with a long-term perspective.</p>
                    <p>We recognize that every project represents an important decision for our customers — whether they are choosing a home, growing a business, or making an investment. This responsibility guides our approach and reinforces our commitment to delivering value at every stage of the journey.</p>
                    <p>As we continue to grow, we remain focused on building strong relationships with our customers, partners, and communities, while fostering an environment where our people can grow, contribute, and succeed.</p>
                  </div>
                </FadeIn>

                {/* Stats strip */}
                <FadeIn delay={0.35}>
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#947e82]/20">
                    {[
                      { num: '10+', label: 'Years of trust' },
                      { num: '11', label: 'Landmark projects' },
                      { num: '100B+', label: 'EGP investments' },
                    ].map(({ num, label }) => (
                      <div key={label}>
                        <p className="font-display text-3xl text-[#947e82]">{num}</p>
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-[#f5f2e9]/40">{label}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#947e82] py-24">
          <FadeIn className="container-shell text-center max-w-2xl mx-auto">
            <p className="eyebrow text-[#421319]">Ready to see what we've built?</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-[#421319] md:text-5xl">
              Browse our latest projects.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/#projects" className="inline-flex items-center gap-2 rounded-full bg-[#421319] px-7 py-3.5 text-sm font-bold text-[#f5f2e9] transition hover:bg-[#250f12]">
                View projects <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#421319]/30 px-7 py-3.5 text-sm font-bold text-[#421319] transition hover:bg-[#421319]/10">
                Contact us
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
    </Shell>
  );
}

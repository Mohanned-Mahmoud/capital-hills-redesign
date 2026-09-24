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

        {/* ── CTA ── */}
        <section className="bg-[#947e82] py-24">
          <FadeIn className="container-shell text-center max-w-2xl mx-auto">
            <p className="eyebrow text-[#421319]">Ready to see what we've built?</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-[#421319] md:text-5xl">
              Browse our latest projects.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-full bg-[#421319] px-7 py-3.5 text-sm font-bold text-[#f5f2e9] transition hover:bg-[#250f12]">
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

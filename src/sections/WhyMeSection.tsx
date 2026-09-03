import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WhyUsBento } from '../components/WhyUsBento';
import FadeIn from '../components/FadeIn';

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function WhyMeSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-40px' });

  return (
    <section id="why-me" className="relative bg-[#0C0C0C] py-20 sm:py-24 md:py-28 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-10 sm:mb-14">
          <FadeIn delay={0} y={40}>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[#34d399] font-medium tracking-widest text-xs sm:text-sm uppercase block mb-2">
                  Competitive Advantage
                </span>
                <h2
                  className="hero-heading font-black uppercase leading-none tracking-tight text-[#D7E2EA]"
                  style={{ fontSize: 'clamp(2.8rem, 9vw, 120px)' }}
                >
                  Why Me
                </h2>
              </div>
              <span className="text-[#D7E2EA] font-light uppercase tracking-widest text-sm opacity-40 pb-1 hidden sm:block">
                The Edge
              </span>
            </div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headingInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="mt-4 h-px"
              style={{
                background: 'linear-gradient(90deg, rgba(52,211,153,0.3), rgba(215,226,234,0.1), transparent)',
                transformOrigin: 'left',
              }}
            />
          </FadeIn>
        </div>

        {/* ── VengeanceUI WhyUsBento Grid ── */}
        <FadeIn delay={0.15} y={30}>
          <WhyUsBento />
        </FadeIn>

      </div>
    </section>
  );
}

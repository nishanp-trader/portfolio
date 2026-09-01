import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, PenTool, TrendingUp, BarChart3 } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'Auditing your current presence, understanding your goals, and building a tailored roadmap.',
    icon: Search,
    accent: '#34d399', // Green
    accentBg: 'rgba(52,211,153,0.1)',
  },
  {
    number: '02',
    title: 'Content & Creative',
    description: 'Designing high-impact digital assets and crafting compelling copy that resonates with your audience.',
    icon: PenTool,
    accent: '#a78bfa', // Purple
    accentBg: 'rgba(167,139,250,0.1)',
  },
  {
    number: '03',
    title: 'Execution & Growth',
    description: 'Deploying campaigns, managing community engagement, and executing the strategy flawlessly.',
    icon: TrendingUp,
    accent: '#fbbf24', // Amber
    accentBg: 'rgba(251,191,36,0.1)',
  },
  {
    number: '04',
    title: 'Analytics & Scaling',
    description: 'Tracking data, analyzing KPIs, optimizing for ROI, and scaling what works best.',
    icon: BarChart3,
    accent: '#60a5fa', // Blue
    accentBg: 'rgba(96,165,250,0.1)',
  }
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function ProcessSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-40px' });

  return (
    <section id="process" className="relative bg-[#0C0C0C] py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-16 sm:mb-24">
          <FadeIn delay={0} y={40}>
            <div className="flex items-end justify-between">
              <h2
                className="hero-heading font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 9vw, 120px)' }}
              >
                Process
              </h2>
              <span className="text-[#D7E2EA] font-light uppercase tracking-widest text-sm opacity-40 pb-1 hidden sm:block">
                How I Work
              </span>
            </div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headingInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="mt-4 h-px"
              style={{
                background: 'linear-gradient(90deg, rgba(215,226,234,0.15), transparent)',
                transformOrigin: 'left',
              }}
            />
          </FadeIn>
        </div>

        {/* ── Process Steps ── */}
        <div className="relative">
          {/* Animated Horizontal connecting line (Desktop only) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: EASE }}
            className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#34d399] via-[#a78bfa] to-[#fbbf24] opacity-30 z-0" 
            style={{ transformOrigin: 'left' }}
          />
          
          {/* Sweeping Energy Burst on the line */}
          <motion.div
            className="hidden lg:block absolute top-12 left-[12%] w-[15%] h-[2px] blur-[3px] z-10"
            style={{ 
              background: 'linear-gradient(90deg, transparent, #fff, transparent)',
              transformOrigin: 'left'
            }}
            initial={{ x: '0%', opacity: 0 }}
            whileInView={{ x: '450%', opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: "linear", delay: 0.1 }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-20">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.number} delay={i * 0.45} y={30}>
                  <div className="flex flex-col items-center text-center group cursor-default">
                    {/* Icon Circle */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative"
                      style={{
                        background: '#111',
                        border: `1px solid ${step.accent}44`,
                        boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
                      }}
                    >
                      {/* Inner glowing circle */}
                      <div className="absolute inset-2 rounded-full" style={{ background: step.accentBg }} />
                      
                      <Icon className="w-8 h-8 relative z-10" style={{ color: step.accent }} />
                      
                      {/* Step Number Badge */}
                      <div 
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                        style={{ background: step.accent, color: '#111' }}
                      >
                        {step.number}
                      </div>
                    </motion.div>

                    {/* Text Content */}
                    <h3 
                      className="font-black uppercase tracking-wide mb-3"
                      style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: '#D7E2EA' }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="font-light leading-relaxed opacity-60 max-w-[280px]"
                      style={{ fontSize: '0.9rem', color: '#D7E2EA' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

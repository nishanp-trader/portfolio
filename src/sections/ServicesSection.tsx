import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LineChart, Share2, Target, Code2 } from 'lucide-react';
import FadeIn from '../components/FadeIn';

/* ─── Data ───────────────────────────────────────────── */
const SERVICES = [
  {
    number: '01',
    name: 'Trading',
    description: 'Technical and price-action driven trading across forex and gold markets, backed by disciplined risk management.',
    icon: LineChart,
    accent: '#34d399',
    accentBg: 'rgba(52,211,153,0.05)',
  },
  {
    number: '02',
    name: 'Social Media',
    description: 'Growing and managing brand presence across platforms with consistent, on-strategy content and community engagement.',
    icon: Share2,
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.05)',
  },
  {
    number: '03',
    name: 'Digital Marketing',
    description: 'Running campaigns, content strategy, and growth initiatives that turn attention into measurable results.',
    icon: Target,
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.05)',
  },
  {
    number: '04',
    name: 'Development',
    description: 'Building clean, responsive, and performant web interfaces using modern frameworks like React and Tailwind.',
    icon: Code2,
    accent: '#60a5fa',
    accentBg: 'rgba(96,165,250,0.05)',
  },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;
const HEADING = 'Services';

/* ─── Card ───────────────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      whileHover="hover"
      className="relative flex flex-col h-full rounded-[28px] sm:rounded-[36px] overflow-hidden p-6 sm:p-8 md:p-10 cursor-default"
      style={{
        background: '#111111',
        border: '1px solid rgba(215,226,234,0.1)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      }}
    >
      {/* Dynamic Hover Border */}
      <motion.div
        className="absolute inset-0 rounded-[28px] sm:rounded-[36px] opacity-0 pointer-events-none transition-opacity duration-500"
        variants={{
          hover: { opacity: 1 },
        }}
        style={{
          boxShadow: `inset 0 0 0 1px ${service.accent}44`,
        }}
      />

      {/* Background radial glow */}
      <motion.div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full pointer-events-none opacity-40 transition-opacity duration-500"
        variants={{ hover: { opacity: 1 } }}
        style={{
          background: `radial-gradient(circle, ${service.accent}22 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top row: Icon & Number */}
        <div className="flex items-start justify-between mb-10 sm:mb-16">
          <motion.div
            variants={{
              hover: { scale: 1.1, rotate: [0, -5, 5, 0] },
            }}
            transition={{ duration: 0.4 }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
            style={{
              background: service.accentBg,
              border: `1px solid ${service.accent}33`,
            }}
          >
            <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: service.accent }} />
          </motion.div>

          <span
            className="font-black leading-none pointer-events-none"
            style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: service.accent, opacity: 0.15 }}
          >
            {service.number}
          </span>
        </div>

        {/* Title & Description */}
        <div className="mt-auto">
          <h3
            className="font-black uppercase leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#D7E2EA' }}
          >
            {service.name}
          </h3>
          <p
            className="font-light leading-relaxed opacity-60"
            style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: '#D7E2EA' }}
          >
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export default function ServicesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-40px' });

  return (
    <section
      id="services"
      className="relative bg-[#0C0C0C] py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-16 sm:mb-20">
          <div className="flex items-end justify-between">
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 9vw, 120px)' }}
              aria-label="Services"
            >
              {HEADING.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, rotateX: -30 }}
                  animate={headingInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
                  style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                >
                  {char}
                </motion.span>
              ))}
            </h2>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={headingInView ? { opacity: 0.4, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
              className="text-[#D7E2EA] font-light uppercase tracking-widest text-sm pb-1 hidden sm:block"
            >
              04 Offerings
            </motion.span>
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
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>
        
      </div>
    </section>
  );
}

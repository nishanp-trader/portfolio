import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ─── Data ─────────────────────────────────────────────── */
const STATS = [
  { value: 3, suffix: '+', label: 'Years of Experience' },
  { value: 245, suffix: '%', label: 'Average ROI Delivered' },
  { value: 50, suffix: '+', label: 'Brands & Clients Served' },
  { value: 12, suffix: 'K+', label: 'Followers Grown' },
];

const SKILLS = [
  { name: 'Price Action', category: 'trading' },
  { name: 'Forex & Gold', category: 'trading' },
  { name: 'Risk Management', category: 'trading' },
  { name: 'TradingView', category: 'trading' },
  { name: 'Meta Ads', category: 'marketing' },
  { name: 'Google Ads', category: 'marketing' },
  { name: 'SEO Strategy', category: 'marketing' },
  { name: 'Content Strategy', category: 'marketing' },
  { name: 'Instagram Growth', category: 'social' },
  { name: 'Community Mgmt', category: 'social' },
  { name: 'Brand Voice', category: 'social' },
  { name: 'Analytics', category: 'social' },
  { name: 'React', category: 'dev' },
  { name: 'TypeScript', category: 'dev' },
  { name: 'Tailwind CSS', category: 'dev' },
  { name: 'Framer Motion', category: 'dev' },
];

const CATEGORY_COLORS: Record<string, string> = {
  trading: 'rgba(52, 211, 153, 0.15)',   // emerald tint
  marketing: 'rgba(167, 139, 250, 0.15)', // violet tint
  social: 'rgba(251, 191, 36, 0.12)',     // amber tint
  dev: 'rgba(96, 165, 250, 0.15)',        // blue tint
};

const CATEGORY_BORDER: Record<string, string> = {
  trading:   'rgba(52, 211, 153, 0.35)',
  marketing: 'rgba(167, 139, 250, 0.35)',
  social:    'rgba(251, 191, 36, 0.3)',
  dev:       'rgba(96, 165, 250, 0.35)',
};

const CATEGORY_TEXT: Record<string, string> = {
  trading:   '#34d399',
  marketing: '#a78bfa',
  social:    '#fbbf24',
  dev:       '#60a5fa',
};

/* ─── Animated counter ──────────────────────────────────── */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ─── Skill pill ────────────────────────────────────────── */
function SkillPill({
  name,
  category,
  index,
}: {
  name: string;
  category: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.06, y: -3 }}
      className="px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide cursor-default select-none transition-shadow duration-300"
      style={{
        background: CATEGORY_COLORS[category],
        border: `1px solid ${CATEGORY_BORDER[category]}`,
        color: CATEGORY_TEXT[category],
        boxShadow: `0 0 0 0 ${CATEGORY_COLORS[category]}`,
      }}
      whileHover={{
        scale: 1.06,
        y: -3,
        boxShadow: `0 0 18px 2px ${CATEGORY_COLORS[category]}`,
      }}
    >
      {name}
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────── */
export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax on the decorative line
  const lineX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const EASE = [0.25, 0.1, 0.25, 1] as const;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 sm:py-32 overflow-hidden"
    >
      {/* Decorative moving gradient line */}
      <motion.div
        style={{ x: lineX }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px pointer-events-none"
        aria-hidden
      >
        <div
          className="w-full h-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(215,226,234,0.06) 30%, rgba(215,226,234,0.12) 50%, rgba(215,226,234,0.06) 70%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Glowing orbs */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* ── Stats row ── */}
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[#D7E2EA] font-light uppercase tracking-[0.3em] text-xs sm:text-sm opacity-50 text-center mb-16 sm:mb-20"
        >
          By the numbers
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-24 sm:mb-32">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
              className="flex flex-col items-center text-center gap-3 group"
            >
              {/* Number */}
              <div
                className="font-black text-[#D7E2EA] leading-none"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Thin accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.4, duration: 0.6, ease: EASE }}
                className="w-8 h-px origin-left"
                style={{ background: 'rgba(215,226,234,0.3)' }}
              />

              {/* Label */}
              <p
                className="text-[#D7E2EA] font-light uppercase tracking-wider opacity-50"
                style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="w-full h-px mb-24 sm:mb-32 origin-left"
          style={{ background: 'rgba(215,226,234,0.08)' }}
        />

        {/* ── Skills header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14"
        >
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
          >
            My Stack
          </h2>
          <p
            className="text-[#D7E2EA] font-light leading-relaxed opacity-50 max-w-xs"
            style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1rem)' }}
          >
            Tools & disciplines I use daily across trading, marketing, and development.
          </p>
        </motion.div>

        {/* ── Skill pills ── */}
        <div className="flex flex-wrap gap-3">
          {SKILLS.map((skill, i) => (
            <SkillPill key={skill.name} name={skill.name} category={skill.category} index={i} />
          ))}
        </div>

        {/* ── Legend ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-wrap gap-5 mt-10 sm:mt-14"
        >
          {[
            { label: 'Trading', category: 'trading' },
            { label: 'Marketing', category: 'marketing' },
            { label: 'Social', category: 'social' },
            { label: 'Dev', category: 'dev' },
          ].map(({ label, category }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: CATEGORY_TEXT[category] }}
              />
              <span
                className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-40"
                style={{ fontSize: '0.7rem' }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Briefcase, Calendar } from 'lucide-react';

/* ─── Data ───────────────────────────────────────────── */
interface Experience {
  period: string;
  current: boolean;
  company: string;
  location: string;
  site: string;
  siteLabel: string;
  position: string;
  accent: string;
  accentBg: string;
  objectives: string[];
}

const EXPERIENCES: Experience[] = [
  {
    period: '21 April 2020 – 15 October 2021',
    current: false,
    company: 'Capital Recruitment Manpower',
    location: 'Basundhara',
    site: 'https://www.capitalrecruitment.com.np',
    siteLabel: 'capitalrecruitment.com.np',
    position: 'Office Boy / Documentation',
    accent: '#34d399',
    accentBg: 'rgba(52,211,153,0.07)',
    objectives: [
      'Organized and maintained all company documents in a secure and efficient manner.',
      'Ensured all documents were properly indexed and filed for easy retrieval.',
      'Created and maintained document retention schedules for timely and compliant disposal.',
      'Provided customer service by answering employee and client questions about documents.',
    ],
  },
  {
    period: '20 October 2021 – 15 January 2023',
    current: false,
    company: 'Allen Career Center',
    location: 'Thapathali',
    site: 'https://www.allen.edu.np',
    siteLabel: 'allen.edu.np',
    position: 'Typist / Social Media Marketing',
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.07)',
    objectives: [
      'Transcribed and formatted documents accurately according to company standards.',
      'Proofread documents for errors to ensure quality and consistency.',
      'Developed and executed social media marketing campaigns across platforms.',
      'Created and managed engaging social media content for target audiences.',
      'Tracked and analysed social media metrics to measure campaign performance.',
      'Built and engaged with growing social media audiences.',
    ],
  },
  {
    period: '25 January 2023 – Present',
    current: true,
    company: 'Job Track Manpower',
    location: 'Kathmandu',
    site: 'https://jobtrack.com.np/',
    siteLabel: 'jobtrack.com.np',
    position: 'Office Boy / Documentation',
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.07)',
    objectives: [
      'Support company compliance with all applicable document management regulations.',
      'Develop and implement new document management procedures to improve efficiency.',
      'Train employees on document management procedures and best practices.',
      'Maintain accurate records and ensure documentation accessibility across teams.',
    ],
  },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;
const HEADING = 'Experience';

/* ─── Card ───────────────────────────────────────────── */
function TimelineCard({
  exp,
  index,
  side,
}: {
  exp: Experience;
  index: number;
  side: 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -56 : 56 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      whileHover="hover"
      className="w-full cursor-default"
    >
      <motion.div
        variants={{
          hover: {
            y: -6,
            boxShadow: `0 0 0 1px ${exp.accent}33, 0 20px 50px ${exp.accent}18`,
          },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative overflow-hidden rounded-[22px] sm:rounded-[26px] p-5 sm:p-7"
        style={{
          background: '#111111',
          border: '1px solid rgba(215,226,234,0.13)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        {/* Accent top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background:
              side === 'left'
                ? `linear-gradient(90deg, transparent 40%, ${exp.accent})`
                : `linear-gradient(90deg, ${exp.accent}, transparent 60%)`,
          }}
        />

        {/* Ambient accent glow bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${side === 'left' ? '80%' : '20%'} 100%, ${exp.accent}0f 0%, transparent 70%)`,
          }}
        />

        {/* Watermark number */}
        <span
          className="absolute right-4 top-3 font-black leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(4rem, 9vw, 6.5rem)', color: exp.accent, opacity: 0.05 }}
          aria-hidden
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Period */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Calendar className="w-3 h-3 flex-shrink-0 opacity-50" style={{ color: exp.accent }} />
          <span className="text-[0.62rem] uppercase tracking-widest" style={{ color: exp.accent, opacity: 0.65 }}>
            {exp.period}
          </span>
          {exp.current && (
            <span
              className="px-2 py-0.5 rounded-full text-[0.58rem] font-semibold uppercase tracking-wide"
              style={{ background: exp.accentBg, color: exp.accent, border: `1px solid ${exp.accent}44` }}
            >
              Current
            </span>
          )}
        </div>

        {/* Company */}
        <h3
          className="font-black uppercase leading-tight tracking-tight mb-0.5"
          style={{ fontSize: 'clamp(1rem, 2.4vw, 1.5rem)', color: '#D7E2EA' }}
        >
          {exp.company}
        </h3>
        <p className="text-[0.68rem] uppercase tracking-widest opacity-35 mb-3" style={{ color: '#D7E2EA' }}>
          {exp.location}
        </p>

        {/* Position */}
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-3 h-3 flex-shrink-0" style={{ color: exp.accent }} />
          <span className="font-medium uppercase tracking-wide" style={{ fontSize: '0.74rem', color: exp.accent }}>
            {exp.position}
          </span>
        </div>

        {/* Website */}
        <a
          href={exp.site}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mb-5 hover:opacity-80 transition-opacity duration-200"
          onClick={e => e.stopPropagation()}
        >
          <ExternalLink className="w-3 h-3" style={{ color: exp.accent, opacity: 0.55 }} />
          <span className="text-[0.66rem] uppercase tracking-widest underline underline-offset-2" style={{ color: exp.accent, opacity: 0.55 }}>
            {exp.siteLabel}
          </span>
        </a>

        {/* Divider */}
        <div className="h-px mb-4" style={{ background: 'rgba(215,226,234,0.07)' }} />

        {/* Objectives — staggered reveal */}
        <ul className="flex flex-col gap-2.5">
          {exp.objectives.map((obj, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.25 + i * 0.07, ease: EASE }}
              className="flex items-start gap-2.5"
            >
              <motion.span
                className="flex-shrink-0 rounded-full"
                style={{ background: exp.accent, width: 5, height: 5, marginTop: 8, opacity: 0.65 }}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + i * 0.07, type: 'spring' }}
              />
              <p
                className="font-light leading-relaxed opacity-60"
                style={{ fontSize: 'clamp(0.76rem, 1.3vw, 0.88rem)', color: '#D7E2EA' }}
              >
                {obj}
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

/* ─── Center dot ─────────────────────────────────────── */
function TimelineDot({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="relative flex justify-center" style={{ paddingTop: 6 }}>
      {/* Ambient glow behind dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
        className="absolute rounded-full"
        style={{
          width: 48, height: 48, top: -15, left: '50%', transform: 'translateX(-50%)',
          background: exp.accent,
          opacity: 0.12,
          filter: 'blur(12px)',
        }}
      />

      {/* Outer ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
        className="relative z-10 rounded-full flex items-center justify-center"
        style={{
          width: 28, height: 28,
          background: exp.accentBg,
          border: `1.5px solid ${exp.accent}55`,
        }}
      >
        {/* Inner dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.15, type: 'spring', stiffness: 400, damping: 15 }}
          className="rounded-full"
          style={{
            width: 10, height: 10,
            background: exp.accent,
            boxShadow: `0 0 10px ${exp.accent}cc`,
          }}
        />

        {/* Ping on current role */}
        {exp.current && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: exp.accent, opacity: 0.25 }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export default function WorkExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-40px' });

  /* Scroll-driven spine draw */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 60%'],
  });
  const rawSpine = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const spineScale = useSpring(rawSpine, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-[#0C0C0C] py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      {/* Subtle section background radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 30% at 20% 30%, rgba(52,211,153,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 40% 25% at 80% 60%, rgba(167,139,250,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 45% 30% at 50% 90%, rgba(251,191,36,0.04) 0%, transparent 70%)
          `,
        }}
      />

      {/* ── Heading with letter-by-letter animation ── */}
      <div ref={headingRef} className="max-w-5xl mx-auto mb-16 sm:mb-24">
        <div className="flex items-end justify-between">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 120px)' }}
            aria-label="Experience"
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
            className="text-[#D7E2EA] font-light uppercase tracking-widest text-sm pb-1"
          >
            {String(EXPERIENCES.length).padStart(2, '0')} roles
          </motion.span>
        </div>

        {/* Animated underline */}
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

      {/* ── Timeline ── */}
      <div className="relative max-w-5xl mx-auto">

        {/* Desktop center spine — scroll-driven draw */}
        <motion.div
          className="absolute hidden sm:block top-3 bottom-3 w-[1px]"
          style={{
            left: '50%',
            translateX: '-50%',
            scaleY: spineScale,
            transformOrigin: 'top',
            background:
              'linear-gradient(to bottom, transparent, rgba(215,226,234,0.15) 8%, rgba(215,226,234,0.15) 92%, transparent)',
          }}
        />

        {/* Mobile left-side spine */}
        <motion.div
          className="absolute sm:hidden top-3 bottom-3 w-[1px]"
          style={{
            left: 13,
            scaleY: spineScale,
            transformOrigin: 'top',
            background:
              'linear-gradient(to bottom, transparent, rgba(215,226,234,0.13) 8%, rgba(215,226,234,0.13) 92%, transparent)',
          }}
        />

        <div className="flex flex-col gap-14 sm:gap-20">
          {EXPERIENCES.map((exp, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div key={exp.company}>
                {/* ── Desktop: 3-col grid ── */}
                <div className="hidden sm:grid grid-cols-[1fr,56px,1fr] gap-6 items-start">
                  {/* Left column */}
                  <div>
                    {isLeft ? (
                      <TimelineCard exp={exp} index={i} side="left" />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                        className="flex justify-end pt-2"
                      >
                        <span
                          className="text-[0.6rem] uppercase tracking-widest opacity-20 text-right leading-relaxed"
                          style={{ color: '#D7E2EA', maxWidth: 150 }}
                        >
                          {exp.period}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Center: dot */}
                  <div>
                    <TimelineDot exp={exp} index={i} />
                  </div>

                  {/* Right column */}
                  <div>
                    {!isLeft ? (
                      <TimelineCard exp={exp} index={i} side="right" />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                        className="pt-2"
                      >
                        <span
                          className="text-[0.6rem] uppercase tracking-widest opacity-20 leading-relaxed"
                          style={{ color: '#D7E2EA', maxWidth: 150, display: 'block' }}
                        >
                          {exp.period}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* ── Mobile: dot + card ── */}
                <div className="sm:hidden grid grid-cols-[28px,1fr] gap-4 items-start">
                  <TimelineDot exp={exp} index={i} />
                  <TimelineCard exp={exp} index={i} side="right" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

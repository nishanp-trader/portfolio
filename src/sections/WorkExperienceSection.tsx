import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
  flexDuration: number; // For the timeline graph
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
    flexDuration: 18, // ~18 months
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
    flexDuration: 15, // ~15 months
  },
  {
    period: '25 Jan 2023 – 25 Feb 2023',
    current: false,
    company: 'Job Track Manpower',
    location: 'Kathmandu',
    site: 'https://jobtrack.com.np/',
    siteLabel: 'jobtrack.com.np',
    position: 'Office Boy / Documentation',
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.07)',
    objectives: [
      'Supported company compliance with all applicable document management regulations.',
      'Assisted in implementing document management procedures to improve efficiency.',
    ],
    flexDuration: 3, // 1 month, bumped to 3 for visual clickability
  },
  {
    period: 'March 2023 – 25 Nov 2025',
    current: false,
    company: 'PMS JOB NEPAL',
    location: 'Kathmandu',
    site: '#',
    siteLabel: 'pmsjobnepal.com',
    position: 'Social Media Handler & Content Manager',
    accent: '#f472b6',
    accentBg: 'rgba(244,114,182,0.07)',
    objectives: [
      'Managed all social media profiles and executed growth strategies.',
      'Created, curated, and managed all published digital content (images, video, written).',
      'Monitored, listened, and responded to users in a social way while cultivating leads.',
      'Analyzed key metrics and tweaked strategies as needed for optimal ROI.',
    ],
    flexDuration: 32, // ~32 months
  },
  {
    period: '21 January 2026 – Present',
    current: true,
    company: 'Anjali Overseas Services',
    location: 'Kathmandu',
    site: '#',
    siteLabel: 'anjalioverseas.com',
    position: 'Documentation Officer / Digital Marketer',
    accent: '#60a5fa',
    accentBg: 'rgba(96,165,250,0.07)',
    objectives: [
      'Handle end-to-end documentation processing and compliance.',
      'Lead digital marketing initiatives and manage all social media handles.',
      'Develop content strategies to boost online presence and client engagement.',
      'Streamline internal filing and digital record keeping systems.',
    ],
    flexDuration: 10, // ~10 months (present day)
  }
];

const EASE = [0.25, 0.1, 0.25, 1] as const;
const HEADING = 'Experience';

/* ─── Timeline Graph Component ───────────────────────── */
function TimelineGraph({
  activeIndex,
  setActiveIndex
}: {
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="w-full flex flex-col gap-3 mb-10 sm:mb-14">
      {/* ── Graph Bar ── */}
      <div className="flex w-full h-3 sm:h-4 bg-[#111] rounded-full overflow-hidden" style={{ border: '1px solid rgba(215,226,234,0.1)' }}>
        {EXPERIENCES.map((exp, i) => {
          const isActive = i === activeIndex;
          
          return (
            <motion.div
              key={exp.company}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + (i * 0.1), ease: EASE }}
              className="group relative cursor-pointer h-full transition-all duration-300 hover:opacity-100"
              style={{
                transformOrigin: 'left',
                flexGrow: exp.flexDuration,
                background: isActive ? exp.accent : `${exp.accent}44`,
                opacity: isActive ? 1 : 0.6,
                borderRight: i < EXPERIENCES.length - 1 ? '1px solid #0c0c0c' : 'none'
              }}
              onClick={() => setActiveIndex(i)}
            >
              {/* Tooltip on hover */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-[#111] text-[#D7E2EA] text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md border border-[#D7E2EA]/10 z-10 hidden sm:block">
                {exp.company}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Year Markers ── */}
      <div className="flex justify-between items-center text-[#D7E2EA] opacity-30 text-[9px] sm:text-[10px] font-medium uppercase tracking-widest px-1">
        <span>2020</span>
        <span>2021</span>
        <span>2023</span>
        <span>2024</span>
        <span>2026 (Present)</span>
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export default function WorkExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(EXPERIENCES.length - 1); 
  
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-40px' });

  const activeJob = EXPERIENCES[activeIndex];

  return (
    <section
      id="experience"
      className="relative bg-[#0C0C0C] py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      {/* Dynamic ambient glow based on active job */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${activeJob.accent}07 0%, transparent 70%)`
        }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-10 sm:mb-16">
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
              className="text-[#D7E2EA] font-light uppercase tracking-widest text-sm pb-1 hidden sm:block"
            >
              {String(EXPERIENCES.length).padStart(2, '0')} roles
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

        {/* ── Timeline Graph ── */}
        <TimelineGraph activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

        {/* ── Main Layout: Tabs (Left) + Details (Right) ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left: Tab List */}
          <div className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-2">
            {EXPERIENCES.map((exp, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={exp.company}
                  onClick={() => setActiveIndex(index)}
                  className="relative flex items-center text-left w-full p-4 sm:p-5 rounded-[18px] transition-all duration-300 group overflow-hidden"
                  style={{
                    background: isActive ? '#111111' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(215,226,234,0.1)' : 'transparent'}`,
                  }}
                >
                  {/* Hover/Active Highlight Line */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    initial={false}
                    animate={{
                      backgroundColor: isActive ? exp.accent : 'transparent',
                      opacity: isActive ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Active background glow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(90deg, ${exp.accent}11, transparent)` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex flex-col gap-1 z-10 ml-2">
                    <span 
                      className="font-black uppercase tracking-wide leading-tight transition-colors duration-300"
                      style={{ 
                        fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                        color: isActive ? '#D7E2EA' : 'rgba(215,226,234,0.4)' 
                      }}
                    >
                      {exp.company}
                    </span>
                    <span 
                      className="text-[0.65rem] uppercase tracking-widest transition-colors duration-300"
                      style={{ color: isActive ? exp.accent : 'rgba(215,226,234,0.25)' }}
                    >
                      {exp.period}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Job Details Card */}
          <div className="flex-1 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative h-full flex flex-col p-6 sm:p-10 rounded-[28px] overflow-hidden"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(215,226,234,0.1)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                }}
              >
                {/* Accent Top Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, ${activeJob.accent}, transparent 80%)`,
                  }}
                />

                {/* Ambient glow inside card */}
                <div
                  className="absolute top-0 left-0 w-[300px] h-[300px] pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${activeJob.accent}15 0%, transparent 70%)`,
                  }}
                />

                {/* Header info */}
                <div className="flex flex-col gap-5 mb-8 relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h3
                      className="font-black uppercase leading-tight tracking-tight"
                      style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#D7E2EA' }}
                    >
                      {activeJob.position}
                    </h3>
                    {activeJob.current && (
                      <span
                        className="px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider"
                        style={{
                          background: activeJob.accentBg,
                          color: activeJob.accent,
                          border: `1px solid ${activeJob.accent}44`,
                        }}
                      >
                        Current Role
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 opacity-70" style={{ color: activeJob.accent }} />
                      <span className="text-sm font-medium uppercase tracking-wide" style={{ color: '#D7E2EA' }}>
                        {activeJob.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 opacity-70" style={{ color: activeJob.accent }} />
                      <span className="text-[0.7rem] uppercase tracking-widest opacity-60" style={{ color: '#D7E2EA' }}>
                        {activeJob.period}
                      </span>
                    </div>

                    {activeJob.site !== '#' && (
                      <a
                        href={activeJob.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                      >
                        <ExternalLink className="w-3.5 h-3.5" style={{ color: activeJob.accent }} />
                        <span className="text-[0.7rem] uppercase tracking-widest underline underline-offset-4" style={{ color: activeJob.accent }}>
                          {activeJob.siteLabel}
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="h-px w-full mb-8 relative z-10" style={{ background: 'rgba(215,226,234,0.08)' }} />

                {/* Objectives */}
                <ul className="flex flex-col gap-4 relative z-10">
                  {activeJob.objectives.map((obj, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: EASE }}
                      className="flex items-start gap-4"
                    >
                      <span
                        className="flex-shrink-0 rounded-full mt-[8px]"
                        style={{ background: activeJob.accent, width: 6, height: 6, opacity: 0.8 }}
                      />
                      <p
                        className="font-light leading-relaxed opacity-70"
                        style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1rem)', color: '#D7E2EA' }}
                      >
                        {obj}
                      </p>
                    </motion.li>
                  ))}
                </ul>
                
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}

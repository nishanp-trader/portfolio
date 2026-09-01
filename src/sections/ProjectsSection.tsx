import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

/* ─── Data ───────────────────────────────────────────── */
interface Project {
  number: string;
  category: 'Client' | 'Personal';
  name: string;
  year: string;
  description: string;
  tags: string[];
  accent: string;
  accentBg: string;
}

const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Personal',
    name: 'Forex Analytics Dashboard',
    year: '2024',
    description:
      'A personal trading dashboard built to track XAUUSD and forex pairs in real time. Features equity curves, trade journal logs, risk/reward calculators, and full performance analytics — all in a data-dense dark UI.',
    tags: ['TradingView', 'React', 'TypeScript', 'Tailwind'],
    accent: '#34d399',
    accentBg: 'rgba(52,211,153,0.08)',
  },
  {
    number: '02',
    category: 'Client',
    name: 'Digital Marketing Campaign',
    year: '2024',
    description:
      'End-to-end digital marketing for a wellness brand — spanning Meta and Google Ads, A/B creative testing, funnel optimisation, and conversion tracking. Delivered 245% ROI and 3,120 qualified leads in 30 days.',
    tags: ['Meta Ads', 'Google Ads', 'A/B Testing', 'Analytics'],
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.08)',
  },
  {
    number: '03',
    category: 'Client',
    name: 'Brand Social Growth',
    year: '2023',
    description:
      'Social strategy and community management for a lifestyle brand. Grew following from 32K → 48.9K (+50%) in one quarter through cohesive content planning, engagement tactics, and on-brand creative direction.',
    tags: ['Instagram', 'Content Strategy', 'Community Mgmt', 'Analytics'],
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.07)',
  },
];

/* ─── Keyframe builder (unchanged) ───────────────────── */
const OFFSCREEN = 1100;
const PEEK_PX   = 28;
const ENTER_W   = 0.12;

function buildTransforms(index: number, total: number) {
  const step = 1 / total;
  const times: number[] = [];
  const yVals: number[] = [];
  const scaleVals: number[] = [];

  const kf = (t: number, y: number, s: number) => {
    const last = times[times.length - 1] ?? -1;
    times.push(Math.max(last + 0.001, Math.min(1, t)));
    yVals.push(y);
    scaleVals.push(s);
  };

  if (index === 0) {
    /* Card 0 — immediately visible when section is in view */
    kf(0, 0, 1);
  } else {
    /* Cards 1+ — enter from below on scroll */
    kf(0, OFFSCREEN, 1);
    const entryStart = index * step;
    if (entryStart > 0.01) kf(entryStart, OFFSCREEN, 1);
    kf(entryStart + ENTER_W, 0, 1);
  }

  /* As each subsequent card enters, push this card up and scale it down */
  let curY = 0;
  let curScale = 1;
  for (let j = index + 1; j < total; j++) {
    const jStart = j * step;
    const jEnd   = jStart + ENTER_W;
    kf(jStart, curY, curScale);
    curY     -= PEEK_PX;
    curScale -= 0.035;
    kf(jEnd, curY, curScale);
  }
  kf(1, curY, curScale);

  return { times, yVals, scaleVals };
}


/* ─── Card ────────────────────────────────────────────── */
function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const { times, yVals, scaleVals } = buildTransforms(index, total);

  const rawY = useTransform(progress, times, yVals);
  const scale = useTransform(progress, times, scaleVals);
  const y = useSpring(rawY, { stiffness: 85, damping: 22, restDelta: 0.5 });

  return (
    <motion.div
      style={{
        y,
        scale,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: index + 1,
        transformOrigin: 'top center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#D7E2EA]/20 flex flex-col gap-5 sm:gap-7 p-6 sm:p-8 md:p-10 w-full"
        style={{ background: '#111111', maxWidth: '720px' }}
      >
        {/* Accent top border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent 60%)` }}
        />

        {/* Large watermark number */}
        <span
          className="absolute right-6 top-4 font-black leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(5rem, 14vw, 10rem)',
            color: project.accent,
            opacity: 0.04,
          }}
          aria-hidden
        >
          {project.number}
        </span>

        {/* ── Top row: number + meta ── */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-5">
            <span
              className="font-black leading-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: project.accent }}
            >
              {project.number}
            </span>
            <div
              className="h-px flex-1 w-8 sm:w-14 opacity-30"
              style={{ background: project.accent }}
            />
          </div>

          <div className="flex items-center gap-3">
            <span
              className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-40"
              style={{ fontSize: '0.7rem' }}
            >
              {project.year}
            </span>
            <span
              className="px-2.5 py-1 rounded-full text-[0.65rem] font-medium uppercase tracking-wider"
              style={{
                background: project.accentBg,
                color: project.accent,
                border: `1px solid ${project.accent}40`,
              }}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* ── Project name ── */}
        <h3
          className="text-[#D7E2EA] font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
        >
          {project.name}
        </h3>

        {/* ── Description ── */}
        <p
          className="text-[#D7E2EA] font-light leading-relaxed opacity-60 max-w-2xl"
          style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)' }}
        >
          {project.description}
        </p>

        {/* ── Tags + button ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[0.7rem] font-medium uppercase tracking-wide"
                style={{
                  background: project.accentBg,
                  color: project.accent,
                  border: `1px solid ${project.accent}30`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <LiveProjectButton />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Progress dot ────────────────────────────────────── */
function ProgressDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const activateAt = index * step + ENTER_W;

  const dotScale = useTransform(
    progress,
    [Math.max(0, activateAt - 0.05), Math.min(1, activateAt)],
    [0.6, 1]
  );
  const dotOpacity = useTransform(
    progress,
    [Math.max(0, activateAt - 0.05), Math.min(1, activateAt)],
    [0.2, 1]
  );

  return (
    <motion.div
      style={{ scale: dotScale, opacity: dotOpacity }}
      className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA]"
    />
  );
}

/* ─── Section ─────────────────────────────────────────── */
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10"
      style={{ height: `${(PROJECTS.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col px-5 sm:px-8 md:px-10 pt-14 sm:pt-20 pb-10 gap-6 overflow-hidden">
        {/* Centered column */}
        <div className="flex flex-col gap-6 w-full max-w-[720px] mx-auto flex-1 min-h-0">
          {/* Heading */}
          <FadeIn delay={0} y={40} className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <h2
                className="hero-heading font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 9vw, 120px)' }}
              >
                Project
              </h2>
              <span className="text-[#D7E2EA] font-light uppercase tracking-widest text-sm opacity-40">
                {String(PROJECTS.length).padStart(2, '0')} works
              </span>
            </div>
          </FadeIn>

          {/* Stack area */}
          <div className="relative flex-1 min-h-0">
            {PROJECTS.map((project, i) => (
              <StackCard
                key={project.number}
                project={project}
                index={i}
                total={PROJECTS.length}
                progress={scrollYProgress}
              />
            ))}

            {/* Progress dots — right edge of the centered column */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
              {PROJECTS.map((_, i) => (
                <ProgressDot key={i} index={i} total={PROJECTS.length} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

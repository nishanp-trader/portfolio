import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { GALLERY_ITEMS } from '../data/galleryItems';

/* ── Config ─────────────────────────────────────────── */
const SLIDE_INTERVAL = 7000; // ms
const PEEK           = 72;   // px each side card peeks
const GAP            = 14;   // px gap between cards
const EASE           = [0.25, 0.1, 0.25, 1] as const;

interface GallerySectionProps { onViewAll: () => void }

export default function GallerySection({ onViewAll }: GallerySectionProps) {
  const [current, setCurrent]   = useState(1);
  const [timerKey, setTimerKey] = useState(0);

  /* Measure the carousel viewport (inside section padding) */
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapW, setWrapW]       = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const sync = () => setWrapW(el.clientWidth);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const total = GALLERY_ITEMS.length;
  /* Card fills exactly the space between the two peeking edges — no cap */
  const cardW = wrapW > 0 ? wrapW - 2 * (PEEK + GAP) : 320;
  /* Translate the track so the active card is exactly centred */
  const trackX = wrapW > 0
    ? (wrapW - cardW) / 2 - current * (cardW + GAP)
    : 0;

  /* ── Auto-advance (no pause-on-hover → no blink) ── */
  useEffect(() => {
    if (wrapW === 0) return;
    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [timerKey, total, wrapW]);

  const goTo = (i: number) => {
    setCurrent(((i % total) + total) % total);
    setTimerKey(k => k + 1); // restart interval
  };

  return (
    <section id="gallery" className="bg-[#0C0C0C] py-20 sm:py-24 md:py-32">

      {/* ── Everything shares the same horizontal padding ── */}
      <div className="px-5 sm:px-8 md:px-10">

        {/* Heading row */}
        <FadeIn delay={0} y={40}>
          <div className="flex items-end justify-between mb-10 sm:mb-14">
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Gallery
            </h2>
            <button
              onClick={onViewAll}
              className="text-[#D7E2EA] font-light uppercase tracking-wider text-sm hover:opacity-70 transition-opacity duration-200 flex items-center gap-2 pb-1"
            >
              View All <span aria-hidden>→</span>
            </button>
          </div>
        </FadeIn>

        {/* ── Carousel ── */}
        <FadeIn delay={0.1} y={40}>
          {/*
            max-w caps the track width on wide screens; wrapW then measures
            that capped width so peeking cards always touch both edges.
          */}
          <div
            ref={wrapRef}
            className="relative overflow-hidden rounded-[6px] mx-auto"
            style={{ height: 'clamp(400px, 62vh, 560px)', maxWidth: '920px' }}
          >
            {/* Sliding track — ALL cards always in DOM, never unmounted → no flash */}
            <motion.div
              className="absolute top-0 left-0 h-full flex items-stretch"
              style={{ gap: GAP }}
              animate={{ x: trackX }}
              transition={{ type: 'tween', duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {GALLERY_ITEMS.map((item, i) => {
                const dist     = Math.abs(i - current);
                const isActive = dist === 0;
                const isPeek   = dist === 1;
                /* Only prev, current and next are visible */
                const visible  = dist <= 1;

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      scale:   isActive ? 1 : 0.88,
                      opacity: isActive ? 1 : isPeek ? 0.6 : 0,
                    }}
                    transition={{ duration: 0.38, ease: EASE }}
                    style={{
                      minWidth:      cardW,
                      width:         cardW,
                      height:        '100%',
                      transformOrigin: 'center',
                      pointerEvents: visible ? 'auto' : 'none',
                    }}
                    className={visible ? 'cursor-pointer' : ''}
                    onClick={() => {
                      if (isActive) onViewAll();
                      else if (isPeek) goTo(i);
                    }}
                  >
                    {/* Project-card style card */}
                    <div
                      className="w-full h-full rounded-[28px] sm:rounded-[36px] overflow-hidden flex flex-col"
                      style={{
                        background: '#111111',
                        border: `1px solid ${isActive
                          ? 'rgba(215,226,234,0.22)'
                          : 'rgba(215,226,234,0.08)'}`,
                      }}
                    >
                      {/* Accent top bar */}
                      <div
                        className="flex-shrink-0 h-[2px]"
                        style={{
                          background:
                            `linear-gradient(90deg, ${item.accent}, transparent 60%)`,
                          opacity: isActive ? 1 : 0.35,
                        }}
                      />

                      {/* Image — object-contain, never cropped */}
                      <div className="relative flex-1 min-h-0 bg-[#0a0a0a] flex items-center justify-center">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          draggable={false}
                        />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center"
                              style={{
                                background: 'rgba(215,226,234,0.15)',
                                backdropFilter: 'blur(8px)',
                                border: '1.5px solid rgba(215,226,234,0.3)',
                              }}
                            >
                              <Play className="w-5 h-5 text-[#D7E2EA] ml-0.5" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Info — fades in only on active card (no hover state → no blink) */}
                      <div
                        className="flex-shrink-0 px-5 py-4 flex items-center justify-between gap-2"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity 0.35s ease',
                          pointerEvents: 'none',
                        }}
                      >
                        <div>
                          <p
                            className="text-[0.62rem] uppercase tracking-widest mb-0.5"
                            style={{ color: item.accent }}
                          >
                            {item.category} · {item.type === 'video' ? 'Video' : 'Photo'}
                          </p>
                          <h3 className="text-[#D7E2EA] font-medium uppercase text-sm leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <span className="text-[#D7E2EA] opacity-30 text-xs tabular-nums">
                          {i + 1} / {total}
                        </span>
                      </div>

                      {/* Progress bar — always running, no state toggle → no blink */}
                      <div
                        className="flex-shrink-0 h-[2px]"
                        style={{ background: 'rgba(215,226,234,0.07)', opacity: isActive ? 1 : 0 }}
                      >
                        {isActive && (
                          <motion.div
                            key={`${current}-${timerKey}`}
                            className="h-full"
                            style={{ background: item.accent, opacity: 0.55 }}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ── Arrows ── */}
            <button
              onClick={() => goTo(current - 1)}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-80"
              style={{
                background: 'rgba(12,12,12,0.78)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(215,226,234,0.2)',
              }}
            >
              <ChevronLeft className="w-5 h-5 text-[#D7E2EA]" />
            </button>
            <button
              onClick={() => goTo(current + 1)}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-80"
              style={{
                background: 'rgba(12,12,12,0.78)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(215,226,234,0.2)',
              }}
            >
              <ChevronRight className="w-5 h-5 text-[#D7E2EA]" />
            </button>
          </div>

          {/* ── Dot indicators ── */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {GALLERY_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to item ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width:      i === current ? '22px' : '6px',
                  height:     '6px',
                  background: i === current
                    ? '#D7E2EA'
                    : 'rgba(215,226,234,0.22)',
                }}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

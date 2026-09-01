import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { GALLERY_ITEMS, type GalleryItem } from '../data/galleryItems';

type FilterType = 'all' | 'photo' | 'video';

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface GalleryPageProps {
  onClose: () => void;
}

export default function GalleryPage({ onClose }: GalleryPageProps) {
  const [filter, setFilter]           = useState<FilterType>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered: GalleryItem[] =
    filter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(i => i.type === filter);

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  /* ── Close lightbox when filter changes ── */
  useEffect(() => { setLightboxIndex(null); }, [filter]);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else onClose();
      }
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight')
          setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : 0);
        if (e.key === 'ArrowLeft')
          setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : 0);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filtered.length, onClose]);

  return (
    /* ── Page container ── */
    <motion.div
      className="fixed inset-0 z-50 bg-[#0C0C0C]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {/* ── Scrollable content ── */}
      <div className="h-full overflow-y-auto">
        {/* Sticky nav */}
        <nav
          className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-8 md:px-10 py-5"
          style={{
            background: 'rgba(12,12,12,0.88)',
            backdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(215,226,234,0.07)',
          }}
        >
          {/* Brand */}
          <span className="hero-heading font-black uppercase text-xl sm:text-2xl">
            Nishan
          </span>

          {/* Filter tabs */}
          <div className="flex items-center gap-5 sm:gap-8">
            {(['all', 'photo', 'video'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="uppercase tracking-widest transition-all duration-200"
                style={{
                  fontSize: '0.75rem',
                  color: '#D7E2EA',
                  opacity: filter === f ? 1 : 0.35,
                  fontWeight: filter === f ? 600 : 300,
                  borderBottom: filter === f ? '1px solid #D7E2EA' : '1px solid transparent',
                  paddingBottom: '2px',
                }}
              >
                {f === 'all' ? 'All' : f === 'photo' ? 'Photos' : 'Videos'}
              </button>
            ))}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[#D7E2EA] opacity-50 hover:opacity-100 transition-opacity duration-200"
            aria-label="Close gallery"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline text-xs uppercase tracking-wider">Close</span>
          </button>
        </nav>

        {/* Grid — max-w centres the content, giving equal left/right margins */}
        <div className="px-5 sm:px-8 md:px-10 py-10 sm:py-14">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
              >
                {filtered.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.4, ease: EASE }}
                    className="group cursor-pointer flex flex-col overflow-hidden rounded-[20px] sm:rounded-[24px]"
                    style={{
                      background: '#111111',
                      border: '1px solid rgba(215,226,234,0.14)',
                    }}
                    onClick={() => setLightboxIndex(idx)}
                  >
                    {/* Accent top border */}
                    <div
                      className="flex-shrink-0 h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, ${item.accent}, transparent 60%)`,
                      }}
                    />

                    {/* Image area — A4 portrait ratio, full image always visible */}
                    <div
                      className="relative flex-shrink-0 overflow-hidden bg-[#0a0a0a]"
                      style={{ aspectRatio: '210 / 297' }}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />

                      {/* Hover gradient overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                        }}
                      />

                      {/* Video badge */}
                      {item.type === 'video' && (
                        <>
                          <div
                            className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                            style={{
                              background: 'rgba(12,12,12,0.7)',
                              backdropFilter: 'blur(6px)',
                              border: '1px solid rgba(215,226,234,0.2)',
                            }}
                          >
                            <Play className="w-3 h-3 text-[#D7E2EA]" />
                            <span className="text-[#D7E2EA] text-[0.6rem] uppercase tracking-wide">Video</span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center"
                              style={{
                                background: 'rgba(215,226,234,0.15)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(215,226,234,0.3)',
                              }}
                            >
                              <Play className="w-5 h-5 text-[#D7E2EA] ml-0.5" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Info strip */}
                    <div className="flex items-center justify-between px-4 py-3 gap-2">
                      <div className="min-w-0">
                        <p
                          className="text-[0.6rem] uppercase tracking-widest mb-0.5 truncate"
                          style={{ color: item.accent }}
                        >
                          {item.category} · {item.type === 'video' ? 'Video' : 'Photo'}
                        </p>
                        <p className="text-[#D7E2EA] font-medium uppercase text-xs sm:text-sm leading-tight truncate">
                          {item.title}
                        </p>
                      </div>
                      <span className="text-[#D7E2EA] opacity-25 text-[0.65rem] tabular-nums flex-shrink-0">
                        {idx + 1}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="flex items-center justify-center py-40">
                <p className="text-[#D7E2EA] opacity-25 uppercase tracking-widest text-sm">
                  Nothing here yet
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── Lightbox (absolute to the fixed page container) ── */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center px-5 sm:px-16"
            style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="relative w-full"
              style={{ maxWidth: '900px' }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-11 right-0 text-[#D7E2EA] opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Media */}
              {lightboxItem.type === 'video' && lightboxItem.videoUrl ? (
                <div
                  className="rounded-[18px] overflow-hidden"
                  style={{ aspectRatio: '16 / 9' }}
                >
                  <iframe
                    src={lightboxItem.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={lightboxItem.title}
                  />
                </div>
              ) : (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  className="w-full rounded-[18px] object-contain"
                  style={{ maxHeight: '72vh' }}
                />
              )}

              {/* Caption row */}
              <div className="flex items-center justify-between mt-4 px-1">
                <div>
                  <p
                    className="text-[0.65rem] uppercase tracking-widest mb-0.5"
                    style={{ color: lightboxItem.accent }}
                  >
                    {lightboxItem.category} · {lightboxItem.type}
                  </p>
                  <p className="text-[#D7E2EA] font-medium uppercase text-sm sm:text-base">
                    {lightboxItem.title}
                  </p>
                </div>
                <p className="text-[#D7E2EA] opacity-35 text-xs uppercase tracking-widest">
                  {(lightboxIndex ?? 0) + 1} / {filtered.length}
                </p>
              </div>

              {/* Prev / Next arrows */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : 0);
                }}
                aria-label="Previous"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-14 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{
                  background: 'rgba(215,226,234,0.1)',
                  border: '1px solid rgba(215,226,234,0.2)',
                }}
              >
                <ChevronLeft className="w-5 h-5 text-[#D7E2EA]" />
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : 0);
                }}
                aria-label="Next"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-14 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{
                  background: 'rgba(215,226,234,0.1)',
                  border: '1px solid rgba(215,226,234,0.2)',
                }}
              >
                <ChevronRight className="w-5 h-5 text-[#D7E2EA]" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

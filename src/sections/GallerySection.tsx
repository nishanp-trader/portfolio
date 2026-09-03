import FadeIn from '../components/FadeIn';
import { GALLERY_ITEMS } from '../data/galleryItems';
import { PerspectiveCarousel } from '../components/PerspectiveCarousel';

interface GallerySectionProps { onViewAll: () => void }

export default function GallerySection({ onViewAll }: GallerySectionProps) {
  const carouselItems = GALLERY_ITEMS.map(item => ({
    src: item.src,
    title: item.title,
    alt: item.category,
  }));

  const middleIndex = Math.floor(carouselItems.length / 2);

  return (
    <section id="gallery" className="bg-[#0C0C0C] pt-0 pb-20 sm:pb-24 md:pb-32 overflow-hidden">

      <div className="px-5 sm:px-8 md:px-10">

        {/* Heading row */}
        <FadeIn delay={0} y={40}>
          <div className="flex items-end justify-between mb-0 max-w-6xl mx-auto">
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

        {/* ── Perspective 3D Carousel ── */}
        <FadeIn delay={0.1} y={40}>
          <div style={{ height: '460px' }} className="w-full">
            <PerspectiveCarousel
              items={carouselItems}
              defaultActiveIndex={middleIndex}
              slideWidth={260}
              className="text-neutral-100"
            />
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

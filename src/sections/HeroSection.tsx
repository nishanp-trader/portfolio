import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

const NAV_ITEMS = [
  { label: 'About',    href: '#about' },
  { label: 'Gallery',  href: null },       // opens full gallery page
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

interface HeroSectionProps {
  onGalleryOpen: () => void;
}

export default function HeroSection({ onGalleryOpen }: HeroSectionProps) {
  return (
    <section className="h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn
        delay={0}
        y={-20}
        as="nav"
        className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8"
      >
        {NAV_ITEMS.map(({ label, href }) =>
          href ? (
            <a
              key={label}
              href={href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {label}
            </a>
          ) : (
            <button
              key={label}
              onClick={onGalleryOpen}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {label}
            </button>
          )
        )}
      </FadeIn>

      <div className="relative flex-1">
        <FadeIn delay={0.15} y={40} className="overflow-hidden w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[11vw] sm:text-[12vw] md:text-[13vw] lg:text-[14vw] mt-6 sm:mt-4 md:-mt-5 px-6 md:px-10">
            Hi, i&apos;m nishan
          </h1>
        </FadeIn>

        <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
          <FadeIn delay={0.6} y={30}>
            <img
              src="https://r2.motionsites.dev/motionsites/assets/30c9e391bb06.png"
              alt="Nishan portrait render"
              className="w-full h-auto select-none pointer-events-none"
              draggable={false}
            />
          </FadeIn>
        </div>
      </div>

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a trader, social media handler &amp; digital marketer building sharp digital experiences
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

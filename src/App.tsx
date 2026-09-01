import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import WorkExperienceSection from './sections/WorkExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import GallerySection from './sections/GallerySection';
import FooterSection from './sections/FooterSection';
import GalleryPage from './pages/GalleryPage';

export default function App() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <>
      <div className="bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
        <HeroSection onGalleryOpen={() => setGalleryOpen(true)} />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <WorkExperienceSection />
        <ProjectsSection />
        <GallerySection onViewAll={() => setGalleryOpen(true)} />
        <FooterSection />
      </div>

      {/* Full gallery page — rendered above everything else */}
      <AnimatePresence>
        {galleryOpen && (
          <GalleryPage onClose={() => setGalleryOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

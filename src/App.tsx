import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import WhyMeSection from './sections/WhyMeSection';
import ServicesSection from './sections/ServicesSection';
import WorkExperienceSection from './sections/WorkExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import FaqSection from './sections/FaqSection';
import FooterSection from './sections/FooterSection';
import ProcessSection from './sections/ProcessSection';

export default function App() {

  return (
    <div className="bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <HeroSection onGalleryOpen={() => {}} />
      <AboutSection />
      <WhyMeSection />
      <WorkExperienceSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <FaqSection />
      <MarqueeSection />
      <FooterSection />
    </div>
  );
}

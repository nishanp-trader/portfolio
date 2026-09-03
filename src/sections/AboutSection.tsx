import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import SocialFlipButton from '../components/SocialFlipButton';
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import type { SocialItem } from '../components/SocialFlipButton';

const socialItems: SocialItem[] = [
  { letter: "C", icon: <FaEnvelope />,   label: "Email",       href: "mailto:your@email.com" },
  { letter: "O", icon: <FaLinkedin />,   label: "LinkedIn",    href: "https://linkedin.com" },
  { letter: "N", icon: <FaInstagram />,  label: "Instagram",   href: "https://instagram.com" },
  { letter: "T", icon: <FaGithub />,     label: "GitHub",      href: "https://github.com" },
  { letter: "A", icon: <FaWhatsapp />,   label: "WhatsApp",    href: "https://wa.me/" },
  { letter: "C", icon: <span className="text-base font-bold">✕</span>, label: "X (Twitter)", href: "https://x.com" },
  { letter: "T", icon: <FaEnvelope />,   label: "Contact",     href: "mailto:your@email.com" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen px-5 sm:px-8 md:px-10 py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="https://r2.motionsites.dev/motionsites/assets/30c8e5b22d0b.png"
          alt="3D moon icon"
          className="w-full h-auto"
        />
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]"
      >
        <img
          src="https://r2.motionsites.dev/motionsites/assets/4c2c70cdef4d.png"
          alt="Abstract 3D object"
          className="w-full h-auto"
        />
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="https://r2.motionsites.dev/motionsites/assets/a40d0959952f.png"
          alt="3D lego icon"
          className="w-full h-auto"
        />
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]"
      >
        <img
          src="https://r2.motionsites.dev/motionsites/assets/9c08bb4c916c.png"
          alt="3D object group"
          className="w-full h-auto"
        />
      </FadeIn>

      <div className="flex flex-col items-center text-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text="I work across digital marketing, AI content creation, graphic design, and social media management. I enjoy blending data-driven strategy with high-impact creative execution. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          <FadeIn delay={0.2} y={30}>
            <SocialFlipButton items={socialItems} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

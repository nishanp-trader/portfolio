import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const NAV_LINKS = ['About', 'Gallery', 'Projects', 'Contact'];

const SOCIALS = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://x.com', label: 'X / Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function FooterSection() {
  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] w-full px-5 sm:px-8 md:px-10 py-16 sm:py-20"
      style={{ borderTop: '1px solid rgba(215, 226, 234, 0.15)' }}
    >
      <FadeIn delay={0} y={30} duration={0.7}>
        {/* Main grid row */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 md:justify-between">
          {/* Left — Brand */}
          <div className="flex flex-col gap-3">
            <span
              className="hero-heading font-black uppercase text-3xl sm:text-4xl"
            >
              Nishan
            </span>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide opacity-70 text-xs sm:text-sm"
            >
              Trader · Social Media Handler · Digital Marketer · Front-End Developer
            </p>
          </div>

          {/* Middle — Quick links */}
          <div className="flex flex-col gap-4">
            <p className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs opacity-50 mb-1">
              Quick Links
            </p>
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[#D7E2EA] text-sm uppercase tracking-wider hover:opacity-70 transition-opacity duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right — Contact & socials */}
          <div className="flex flex-col gap-5">
            <p className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs opacity-50 mb-1">
              Contact
            </p>
            <a
              href="mailto:nishanbro5934@gmail.com"
              className="text-[#D7E2EA] text-sm uppercase tracking-wider hover:opacity-70 transition-opacity duration-200"
            >
              nishanbro5934@gmail.com
            </a>
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#D7E2EA] hover:opacity-70 transition-opacity duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 mt-12"
          style={{ borderTop: '1px solid rgba(215, 226, 234, 0.1)' }}
        >
          <p className="text-[#D7E2EA] text-xs opacity-50">
            © 2026 Nishan. All rights reserved.
          </p>
          <p className="text-[#D7E2EA] text-xs opacity-50">
            Built with React &amp; Tailwind
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}

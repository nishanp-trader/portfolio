# Nishan — Portfolio

A dark-themed portfolio landing page built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Structure

- `src/sections/` — HeroSection, MarqueeSection, AboutSection, ServicesSection, WorkExperienceSection, ProjectsSection, GallerySection, FooterSection
- `src/pages/` — GalleryPage
- `src/components/` — FadeIn, Magnet, AnimatedText, ContactButton, LiveProjectButton
- `src/index.css` — global styles, Kanit font import, `.hero-heading` gradient text class

## Notes

- All imagery is pulled live from the `r2.motionsites.dev` asset URLs given in the brief — no local image files needed, but you do need an internet connection to see them.
- The marquee row transforms and the sticky-stacking project cards both read live scroll position (`window.scrollY` / Framer Motion's `useScroll`), so you need to actually scroll the page to see those effects — they won't show in a static screenshot.
- Pinned to React 18.3.1 rather than Vite's current React 19 default, to match the dependency versions called out in the brief.

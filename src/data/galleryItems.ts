export type GalleryItem = {
  id: string;
  type: 'photo' | 'video';
  src: string;         // thumbnail / image source
  videoUrl?: string;   // YouTube embed URL — add yours here
  title: string;
  category: string;
  accent: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  /* ── Real photos added by Nishan ── */
  {
    id: 'r1',
    type: 'photo',
    src: '/project-images/project images/1.jpg',
    title: 'Work Snapshot 1',
    category: 'Trading',
    accent: '#34d399',
  },
  {
    id: 'r2',
    type: 'photo',
    src: '/project-images/project images/2.jpg',
    title: 'Work Snapshot 2',
    category: 'Marketing',
    accent: '#a78bfa',
  },
  {
    id: 'r3',
    type: 'photo',
    src: '/project-images/project images/3.jpg',
    title: 'Work Snapshot 3',
    category: 'Social',
    accent: '#fbbf24',
  },
  {
    id: 'r4',
    type: 'photo',
    src: '/project-images/project images/4.jpg',
    title: 'Work Snapshot 4',
    category: 'Social',
    accent: '#fbbf24',
  },

  /* ── Project preview images ── */
  {
    id: 'g1',
    type: 'photo',
    src: '/project-images/forex_dashboard_main.jpg',
    title: 'Forex Analytics Dashboard',
    category: 'Trading',
    accent: '#34d399',
  },
  {
    id: 'g2',
    type: 'photo',
    src: '/project-images/forex_dashboard_secondary.jpg',
    title: 'Trading Journal App',
    category: 'Trading',
    accent: '#34d399',
  },
  {
    id: 'g3',
    type: 'photo',
    src: '/project-images/digital_marketing_main.jpg',
    title: 'Campaign Analytics',
    category: 'Marketing',
    accent: '#a78bfa',
  },
  {
    id: 'g4',
    type: 'photo',
    src: '/project-images/digital_marketing_secondary.jpg',
    title: 'Ad Creative A/B Test',
    category: 'Marketing',
    accent: '#a78bfa',
  },
  {
    id: 'g5',
    type: 'photo',
    src: '/project-images/brand_social_main.jpg',
    title: 'Social Content Planner',
    category: 'Social',
    accent: '#fbbf24',
  },
  {
    id: 'g6',
    type: 'photo',
    src: '/project-images/brand_social_secondary.jpg',
    title: 'Growth Analytics Report',
    category: 'Social',
    accent: '#fbbf24',
  },

  /* ── Video placeholders — paste your YouTube embed URLs ── */
  {
    id: 'v1',
    type: 'video',
    src: '/project-images/project images/1.jpg',
    videoUrl: '', // ← paste YouTube embed URL e.g. https://www.youtube.com/embed/xxxxx
    title: 'Trading Strategy Breakdown',
    category: 'Trading',
    accent: '#34d399',
  },
  {
    id: 'v2',
    type: 'video',
    src: '/project-images/project images/2.jpg',
    videoUrl: '', // ← paste YouTube embed URL
    title: 'Marketing Campaign Reel',
    category: 'Marketing',
    accent: '#a78bfa',
  },
];


// Central place for the bits of site metadata that show up in the nav, footer,
// home page, and <head> tags. Edit this file to update your name, links, etc.
// everywhere at once.

export const SITE = {
  name: 'Brandon M. Booth',
  title: 'Brandon M. Booth',
  description:
    'Assistant Professor of Computer Science at the University of Memphis. Research on machine learning, signal processing, algorithmic bias/fairness, and human behavior modeling.',
  url: 'https://www.brandonmbooth.net',
  email: 'brandon.booth@memphis.edu', // TODO: confirm your current institutional email
};

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'Publications', href: '/publications' },
  { label: 'CV', href: '/cv' },
];

// External links shown in the footer (and some on the home page).
// Update `lab` to your current lab site at Memphis - a public search didn't turn
// up a dedicated CUBES Lab website, so this is still a placeholder. The logo
// image is real (pulled from your CUBES Lab folder) and will show up once you
// set a real URL here.
export const EXTERNAL_LINKS = {
  lab: 'https://example.edu/your-lab', // TODO: replace with your CUBES Lab URL
  labLabel: 'CUBES Lab',
  labLogo: '/images/lab/cubes-lab-logo-horizontal.png',
  labLogoAlt: 'CUBES Lab logo',
  linkedin: 'https://www.linkedin.com/in/brandonmbooth5',
  youtube: 'https://www.youtube.com/channel/UCkl7EwKuoTlgZdi0snYCFFQ',
  // Found via web search and confirmed on your Memphis faculty page.
  googleScholar: 'https://scholar.google.com/citations?user=Qr-gySYAAAAJ&hl=en',
  github: '',
};

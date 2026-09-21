export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://slahab.lk',
  name: 'SLAHAB',
  legalName: 'Sri Lanka Association of Hairdressers and Beauticians',
  description:
    'Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition.',
  foundingYear: '1996',
  logo: '/images/slahab/slahab_crest.png',
  ogImage: '/images/slahab/slahab_share_logo.jpg',
  facebook: 'https://www.facebook.com/slahab.srilanka/',
  address: {
    locality: 'Colombo',
    country: 'LK',
  },
} as const

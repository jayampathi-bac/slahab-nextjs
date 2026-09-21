export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SLAHAB',
    legalName: 'Sri Lanka Association of Hairdressers and Beauticians',
    url: 'https://slahab.lk',
    logo: 'https://slahab.lk/images/slahab/slahab_crest.png',
    foundingDate: '1996',
    description:
      'The premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition since 1996.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Colombo',
      addressCountry: 'LK',
    },
    sameAs: ['https://www.facebook.com/SLAHAB'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

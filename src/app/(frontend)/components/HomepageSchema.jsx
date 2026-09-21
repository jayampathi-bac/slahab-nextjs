import { siteConfig } from '@/lib/siteConfig'

// 646 Galle Road, Colombo 3 — Kollupitiya area
const GEO = { lat: 6.8869, lng: 79.8569 }

export default function HomepageSchema() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    inLanguage: 'en-LK',
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}${siteConfig.logo}`,
    },
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    foundingDate: siteConfig.foundingYear,
    telephone: '+94770567359',
    email: 'slahab1996@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No 646, Galle Road',
      addressLocality: 'Colombo 3',
      addressRegion: 'Western Province',
      postalCode: '00300',
      addressCountry: 'LK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.lat,
      longitude: GEO.lng,
    },
    hasMap: `https://maps.google.com/maps?q=646+Galle+Road,+Colombo+3,+Sri+Lanka`,
    areaServed: {
      '@type': 'Country',
      name: 'Sri Lanka',
    },
    sameAs: [siteConfig.facebook],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'Organisation Mondiale Coiffure (OMC)',
        url: 'https://www.omc-comsworldcoiffure.com',
      },
      {
        '@type': 'Organization',
        name: 'Intercoiffure Mondial (ICD)',
        url: 'https://intercoiffure.com',
      },
    ],
    knowsAbout: [
      'Hairdressing',
      'Beauty',
      'Hair Styling',
      'Cosmetology',
      'OMC Hairworld',
      'Professional Hair Education',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}

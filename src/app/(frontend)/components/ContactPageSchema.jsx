import { siteConfig } from '@/lib/siteConfig'

export default function ContactPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+94770567359',
      email: 'slahab1996@gmail.com',
      contactType: 'customer support',
      areaServed: 'LK',
      availableLanguage: 'English',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

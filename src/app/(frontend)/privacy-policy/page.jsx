import Spacing from '@/app/ui/Spacing'

export const metadata = {
  title: 'Privacy Policy | SLAHAB',
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      {/* Header */}
      <div style={{ background: '#0a0a0a', padding: '120px 0 60px', borderBottom: '1px solid rgba(194,155,87,0.2)' }}>
        <div className="container">
          <p className="cs-primary_font" style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px' }}>Legal</p>
          <h1 className="cs-primary_font" style={{ color: '#fff', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, marginBottom: '16px' }}>Privacy Policy</h1>
          <p style={{ color: '#888', fontSize: '14px', fontWeight: 300 }}>Last updated: July 2026</p>
        </div>
      </div>

      {/* Content */}
      <Spacing lg="80" md="50" />
      <div className="container">
        <div style={{ maxWidth: '760px' }}>
          <PolicySection title="1. Introduction">
            <p>Sri Lanka Association of Hairdressers and Beauticians (<strong>SLAHAB</strong>), operating as the official OMC representative and ICD Sri Lanka chapter, is committed to protecting the privacy and personal data of all individuals who interact with our website at <strong>www.slahab.lk</strong>. This Privacy Policy explains what information we collect, how we use it, and the rights you have over your data.</p>
            <p>By using our website or registering for our events, you agree to the collection and use of information in accordance with this policy.</p>
          </PolicySection>

          <PolicySection title="2. Information We Collect">
            <p>We collect the following categories of personal information:</p>
            <ul>
              <li><strong>Identity & Contact Information:</strong> First name, last name, email address, phone number, country, and organisation name — provided when you register for an event or contact us.</li>
              <li><strong>Event Registration Details:</strong> Preferred room type, dietary requirements, and any messages submitted through registration forms.</li>
              <li><strong>Payment Information:</strong> Payment processing is handled entirely by <strong>PayHere</strong>, our licensed payment gateway partner. SLAHAB does not store, access, or process your card or banking details directly.</li>
              <li><strong>Communication Data:</strong> Email address provided for newsletter subscription.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and device information collected automatically when you visit our website.</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. How We Use Your Information">
            <p>We use your personal information for the following purposes:</p>
            <ul>
              <li>To process and confirm your event registrations and manage your attendance.</li>
              <li>To communicate with you regarding event details, schedules, and updates.</li>
              <li>To facilitate payment processing through our payment gateway provider (PayHere).</li>
              <li>To send newsletters and updates about SLAHAB workshops, seminars, and events (only if you have subscribed).</li>
              <li>To respond to your enquiries and provide customer support.</li>
              <li>To improve our website and services based on usage patterns.</li>
              <li>To comply with any applicable legal obligations.</li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Information Sharing">
            <p>SLAHAB does not sell, rent, or trade your personal information. We may share your data only in the following circumstances:</p>
            <ul>
              <li><strong>Payment Processors:</strong> Your payment information is shared with PayHere (a PCI-DSS compliant payment gateway) solely to process transactions.</li>
              <li><strong>Event Venue Partners:</strong> Where necessary for event logistics (e.g., hotel accommodation), relevant registration details may be shared with venue partners such as Cinnamon Grand Hotel, Colombo.</li>
              <li><strong>Legal Compliance:</strong> We may disclose information if required by Sri Lankan law or in response to valid legal requests.</li>
              <li><strong>Service Providers:</strong> We use trusted third-party tools for website hosting and analytics, who are contractually bound to handle data securely.</li>
            </ul>
          </PolicySection>

          <PolicySection title="5. Data Retention">
            <p>We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, including event administration and legal compliance. Event registration records are typically retained for a period of three (3) years. Newsletter subscription data is retained until you unsubscribe.</p>
          </PolicySection>

          <PolicySection title="6. Cookies">
            <p>Our website uses cookies to improve your browsing experience and analyse site traffic. Cookies are small text files stored on your device. You may disable cookies through your browser settings, though some features of the website may be affected as a result.</p>
          </PolicySection>

          <PolicySection title="7. Data Security">
            <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of internet transmission or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
          </PolicySection>

          <PolicySection title="8. Your Rights">
            <p>You have the following rights in relation to your personal data:</p>
            <ul>
              <li>The right to access the personal data we hold about you.</li>
              <li>The right to request correction of inaccurate data.</li>
              <li>The right to request deletion of your data, subject to legal retention requirements.</li>
              <li>The right to withdraw consent for newsletter communications at any time by unsubscribing.</li>
            </ul>
            <p>To exercise any of these rights, please contact us at <strong>slahab1996@gmail.com</strong>.</p>
          </PolicySection>

          <PolicySection title="9. Changes to This Policy">
            <p>SLAHAB reserves the right to update this Privacy Policy at any time. Changes will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy periodically.</p>
          </PolicySection>

          <PolicySection title="10. Contact Us">
            <p>For any questions or concerns regarding this Privacy Policy, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> slahab1996@gmail.com</li>
              <li><strong>Phone:</strong> +94 770 567 359</li>
              <li><strong>Address:</strong> No 646, Galle Road, Colombo 3, Sri Lanka</li>
            </ul>
          </PolicySection>
        </div>
      </div>
      <Spacing lg="120" md="70" />
    </div>
  )
}

function PolicySection({ title, children }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 className="cs-primary_font" style={{ fontSize: '20px', fontWeight: 400, color: '#111', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #eaeaea' }}>
        {title}
      </h2>
      <div style={{ fontSize: '15px', color: '#444', lineHeight: 1.9, fontWeight: 300 }}>
        {children}
      </div>
    </div>
  )
}

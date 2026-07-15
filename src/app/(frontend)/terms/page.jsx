import Spacing from '@/app/ui/Spacing'

export const metadata = {
  title: 'Terms & Conditions | SLAHAB',
}

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      {/* Header */}
      <div style={{ background: '#0a0a0a', padding: '120px 0 60px', borderBottom: '1px solid rgba(194,155,87,0.2)' }}>
        <div className="container">
          <p className="cs-primary_font" style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px' }}>Legal</p>
          <h1 className="cs-primary_font" style={{ color: '#fff', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, marginBottom: '16px' }}>Terms & Conditions</h1>
          <p style={{ color: '#888', fontSize: '14px', fontWeight: 300 }}>Last updated: July 2026</p>
        </div>
      </div>

      {/* Content */}
      <Spacing lg="80" md="50" />
      <div className="container">
        <div style={{ maxWidth: '760px' }}>
          <PolicySection title="1. Introduction">
            <p>Welcome to the Sri Lanka Association of Hairdressers and Beauticians (<strong>"SLAHAB"</strong>, <strong>"we"</strong>, <strong>"our"</strong>, or <strong>"us"</strong>). These Terms & Conditions govern your access to and use of our website at <strong>www.slahab.lk</strong>, including all event registrations, membership enquiries, and other services offered through this website.</p>
            <p>By accessing our website or registering for any SLAHAB event, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website or services.</p>
          </PolicySection>

          <PolicySection title="2. About SLAHAB">
            <p>The Sri Lanka Association of Hairdressers and Beauticians (SLAHAB) is a professional body established in 1996 and registered under the Companies Act of Sri Lanka. Over the years, SLAHAB has played a key role in advancing the hairdressing and beauty industry by organizing national and international competitions, workshops, conferences, and training programmes that promote professional excellence and skills development.</p>
            <p>SLAHAB actively collaborates with leading global organizations, including Intercoiffure Mondial (ICD) and Organisation Mondiale Coiffure (OMC), to bring international exposure and opportunities to industry professionals. Through its initiatives, the association continues to support innovation, education, and the growth of the beauty industry both locally and internationally.</p>
          </PolicySection>

          <PolicySection title="3. Use of the Website">
            <ul>
              <li>You must be at least 18 years of age to register for events or submit enquiries through our website.</li>
              <li>You are responsible for ensuring that all information you provide during registration is accurate, current, and complete.</li>
              <li>You agree not to use our website for any unlawful or unauthorized purpose, including, but not limited to, submitting fraudulent registrations or interfering with the security or functionality of the website.</li>
              <li>SLAHAB reserves the right to restrict or terminate access to the website for any user who violates these terms.</li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Event Registrations">
            <ul>
              <li>Submitting a registration form constitutes an offer to participate in the relevant SLAHAB event, subject to availability and acceptance.</li>
              <li>A registration is confirmed only upon receipt of full payment via our payment gateway (PayHere) and written confirmation from SLAHAB.</li>
              <li>SLAHAB reserves the right to refuse or cancel any registration at its discretion, including in cases of suspected fraudulent activity, eligibility concerns, or capacity constraints.</li>
              <li>Event schedules, speakers, and programme details are subject to change. SLAHAB will endeavour to communicate significant changes to registered delegates in advance.</li>
              <li>Cancellations and refunds are governed by our separate <strong>Refund Policy</strong>, available at www.slahab.lk/refund-policy.</li>
            </ul>
          </PolicySection>

          <PolicySection title="5. Payments">
            <ul>
              <li>All event registration fees are quoted in Euros (€) or Sri Lankan Rupees (LKR) as specified on the event page.</li>
              <li>Payments are processed securely through <strong>PayHere</strong>, a licensed payment gateway. SLAHAB does not store or access your payment card details.</li>
              <li>You are responsible for any bank charges, currency conversion fees, or transaction charges imposed by your bank or card provider.</li>
              <li>Prices listed on the website are subject to change without notice prior to registration confirmation.</li>
            </ul>
          </PolicySection>

          <PolicySection title="6. Code of Conduct at Events">
            <p>All delegates attending SLAHAB events are expected to:</p>
            <ul>
              <li>Conduct themselves professionally and respectfully toward fellow delegates, speakers, staff, and venue personnel.</li>
              <li>Comply with all venue rules and Sri Lankan laws and regulations.</li>
              <li>Not engage in any discriminatory, harassing, or disruptive behavior.</li>
            </ul>
            <p>SLAHAB reserves the right to remove any delegate from an event without refund if their conduct is deemed inappropriate or disruptive.</p>
          </PolicySection>

          <PolicySection title="7. Photography & Media">
            <p>SLAHAB events may be photographed or recorded for promotional purposes. By attending an event, you consent to being photographed or filmed and to the use of such images or footage by SLAHAB in publications, social media, and promotional materials. If you have objections, please notify us in writing before the event.</p>
          </PolicySection>

          <PolicySection title="8. Intellectual Property">
            <p>All content on this website — including text, images, logos, graphics, and event materials — is the intellectual property of SLAHAB or its licensed content providers. You may not reproduce, distribute, modify, or use any content for commercial purposes without prior written consent from SLAHAB.</p>
            <p>The SLAHAB name, logo, and associated branding are registered marks of the association and may not be used without written permission.</p>
          </PolicySection>

          <PolicySection title="9. Third-Party Links & Partners">
            <p>Our website may contain links to third-party websites such as PayHere, Jetwing Travels, or Cinnamon Hotels. These links are provided for convenience only. SLAHAB is not responsible for the content, policies, or practices of any third-party websites, and your use of such sites is at your own risk.</p>
          </PolicySection>

          <PolicySection title="10. Limitation of Liability">
            <ul>
              <li>SLAHAB shall not be liable for any indirect, incidental, or consequential loss or damage arising from your use of our website or participation in our events.</li>
              <li>SLAHAB makes no warranties regarding the uninterrupted availability or error-free operation of the website.</li>
              <li>Our total liability to you in connection with any claim shall not exceed the amount you paid for the specific registration or service in question.</li>
              <li>SLAHAB is not responsible for any personal belongings lost, stolen, or damaged at event venues.</li>
            </ul>
          </PolicySection>

          <PolicySection title="11. Force Majeure">
            <p>SLAHAB shall not be held liable for any failure or delay in performing its obligations under these Terms if such failure results from circumstances beyond our reasonable control, including natural disasters, government restrictions, pandemics, civil unrest, or acts of God.</p>
          </PolicySection>

          <PolicySection title="12. Governing Law">
            <p>These Terms & Conditions are governed by and construed in accordance with the laws of <strong>Sri Lanka</strong>. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.</p>
          </PolicySection>

          <PolicySection title="13. Amendments">
            <p>SLAHAB reserves the right to update or modify these Terms & Conditions at any time without prior notice. Continued use of the website following any changes constitutes your acceptance of the revised terms. The "Last Updated" date at the top of this page indicates when the most recent changes were made.</p>
          </PolicySection>

          <PolicySection title="14. Contact Us">
            <p>For any questions regarding these Terms & Conditions:</p>
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

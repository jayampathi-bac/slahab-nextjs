import Spacing from '@/app/ui/Spacing'

export const metadata = {
  title: 'Refund Policy | SLAHAB',
}

export default function RefundPolicyPage() {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      {/* Header */}
      <div style={{ background: '#0a0a0a', padding: '120px 0 60px', borderBottom: '1px solid rgba(194,155,87,0.2)' }}>
        <div className="container">
          <p className="cs-primary_font" style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px' }}>Legal</p>
          <h1 className="cs-primary_font" style={{ color: '#fff', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, marginBottom: '16px' }}>Refund Policy</h1>
          <p style={{ color: '#888', fontSize: '14px', fontWeight: 300 }}>Last updated: July 2026</p>
        </div>
      </div>

      {/* Content */}
      <Spacing lg="80" md="50" />
      <div className="container">
        <div style={{ maxWidth: '760px' }}>
          <PolicySection title="1. Overview">
            <p>This Refund Policy applies to all event registrations, conference fees, and accommodation packages booked through the Sri Lanka Association of Hairdressers and Beauticians (<strong>SLAHAB</strong>) website at <strong>www.slahab.lk</strong>. As SLAHAB is a professional association that facilitates event participation rather than the sale of physical goods, refund terms are governed by the nature of event-based services.</p>
            <p>Please read this policy carefully before completing your registration. By submitting a registration and completing payment, you agree to the terms set out below.</p>
          </PolicySection>

          <PolicySection title="2. Cancellation by Registrant">
            <p>We understand that plans may change. Our cancellation and refund terms are as follows:</p>
            <ul>
              <li><strong>More than 60 days before the event:</strong> Full refund of the registration fee, less a LKR 2,500 administrative processing charge.</li>
              <li><strong>30–60 days before the event:</strong> 50% refund of the registration fee.</li>
              <li><strong>Less than 30 days before the event:</strong> No refund will be issued. However, you may transfer your registration to another individual by notifying us in writing at least 7 days prior to the event.</li>
              <li><strong>No-show (failure to attend without prior notice):</strong> No refund will be provided.</li>
            </ul>
            <p>To request a cancellation, please contact us at <strong>slahab1996@gmail.com</strong> with your registration reference number and full name.</p>
          </PolicySection>

          <PolicySection title="3. Registration Transfers">
            <p>If you are unable to attend, you may transfer your registration to a colleague or another eligible delegate at no additional charge, provided:</p>
            <ul>
              <li>The request is made in writing at least 7 days before the event.</li>
              <li>The replacement delegate meets any eligibility requirements for the event.</li>
              <li>Full details of the replacement delegate (name, email, phone, organisation) are provided.</li>
            </ul>
            <p>Transfers are not permitted after the event start date.</p>
          </PolicySection>

          <PolicySection title="4. Cancellation by SLAHAB">
            <p>In the unlikely event that SLAHAB is required to cancel, postpone, or significantly alter an event due to circumstances beyond our control (including but not limited to force majeure, natural disaster, government restrictions, or insufficient registrations), the following will apply:</p>
            <ul>
              <li><strong>Event Cancellation:</strong> A full refund of registration fees paid will be issued within 14 business days.</li>
              <li><strong>Event Postponement:</strong> Your registration will be transferred to the rescheduled date at no additional cost. If you are unable to attend the new date, a full refund will be offered.</li>
              <li><strong>Significant Programme Changes:</strong> SLAHAB reserves the right to modify speakers, sessions, or event elements without obligation to issue refunds, provided the core event remains intact.</li>
            </ul>
            <p>SLAHAB will not be liable for any travel, accommodation, or other costs incurred by the registrant in connection with a cancelled or postponed event, beyond the registration fee itself.</p>
          </PolicySection>

          <PolicySection title="5. Accommodation Packages">
            <p>Where accommodation at Cinnamon Grand Hotel, Colombo is included as part of your registration package, cancellation of accommodation is subject to the hotel's own cancellation terms in addition to this policy. SLAHAB will communicate any hotel-specific terms at the time of booking confirmation.</p>
          </PolicySection>

          <PolicySection title="6. Refund Processing">
            <p>Approved refunds will be processed within <strong>14 business days</strong> of approval. Refunds will be returned to the original payment method used at registration (processed via PayHere). Processing times may vary depending on your bank or card provider.</p>
            <p>SLAHAB does not refund any payment gateway or transaction fees charged by PayHere.</p>
          </PolicySection>

          <PolicySection title="7. Non-Refundable Items">
            <p>The following are non-refundable under all circumstances:</p>
            <ul>
              <li>Administrative processing fees</li>
              <li>PayHere transaction fees</li>
              <li>Delegate gift packages once dispatched or collected</li>
            </ul>
          </PolicySection>

          <PolicySection title="8. Contact Us">
            <p>For all refund requests and enquiries, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> slahab1996@gmail.com</li>
              <li><strong>Phone:</strong> +94 770 567 359</li>
              <li><strong>Address:</strong> No 646, Galle Road, Colombo 3, Sri Lanka</li>
            </ul>
            <p>Please include your full name, registration reference, and reason for cancellation in all correspondence.</p>
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

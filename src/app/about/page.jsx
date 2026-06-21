'use client'
import Image from "next/image";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import FunFact from "@/app/ui/FunFact";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";

import pic1 from '../../../public/images/slahab/about/pic1.jpg'
import pic2 from '../../../public/images/slahab/about/pic2.jpg'
import pic3 from '../../../public/images/slahab/about/pic3.jpg'
import pic4 from '../../../public/images/slahab/about/pic4.jpg'
import pic5 from '../../../public/images/slahab/about/pic5.jpg'
import navbarLogo from '../../../public/images/slahab/slahab_navbar_logo.png'

const funfaceData = [
  { title: 'Global Recognition', factNumber: '30+' },
  { title: 'Awards Won', factNumber: '50+' },
  { title: 'Active Members', factNumber: '1000+' },
  { title: 'Years of Excellence', factNumber: '25+' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeading
        title="About SLAHAB"
        bgSrc="/images/about_hero_bg.jpeg"
        pageLinkText="About Us"
      />

      {/* Start About Section */}
      <Div className="cs-light_mode">
        <Spacing lg="150" md="80" />
        <Div className="container">
          <Div className="row align-items-center">
            <Div className="col-lg-6">
              <SectionHeading
                title="Elevating the Standards of Hair & Beauty in Sri Lanka"
                subtitle="Who We Are"
              >
                <Spacing lg="30" md="20" />
                <p className="cs-m0" style={{ color: '#4a4a4a', fontSize: '18px', lineHeight: '1.8', fontWeight: '500' }}>
                  Established in 1996 by a group of passionate hairdressers, the Sri Lanka Association of Hairdressers and Beauticians (SLAHAB) was founded to develop and elevate the hair and beauty industry in Sri Lanka through world-class education and competitions.
                </p>
                <Spacing lg="20" md="20" />
                <p className="cs-m0" style={{ color: '#4a4a4a', fontSize: '18px', lineHeight: '1.8', fontWeight: '500' }}>
                  Since our formation, SLAHAB has initiated regular educational workshops with local and international experts, providing mentorship and a platform for international pathways. We are also proud to be the official representatives for OMC (Organisation Mondiale Coiffure) in Sri Lanka.
                </p>
                <Spacing lg="30" md="30" />
                <Div className="cs-separator cs-accent_bg"></Div>
                <Spacing lg="25" md="40" />
              </SectionHeading>
            </Div>
            <Div className="col-lg-5 offset-lg-1" style={{ position: 'relative', marginTop: '20px' }}>
              <Image src={pic1} alt="SLAHAB History" className="w-100 cs-radius_15" style={{ height: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
              <Div style={{ position: 'absolute', bottom: '-25px', left: '-25px', backgroundColor: '#161616', padding: '25px', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', width: '220px', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src={navbarLogo} alt="SLAHAB Logo" className="w-100" style={{ objectFit: 'contain', height: 'auto' }} />
              </Div>
            </Div>
          </Div>
        </Div>
        <Spacing lg="100" md="50" />
      </Div>
      {/* End About Section */}

      {/* Start FunFact Section */}
      <Div className="container">
        <FunFact
          variant="cs-type1"
          title="Our Achievements"
          subtitle="A quick look at our global impact and the community we've built over the years."
          data={funfaceData}
        />
      </Div>
      {/* End FunFact Section */}

      {/* Start Presidents Section */}
      <Div className="cs-light_mode" style={{ backgroundColor: '#fcfcfc' }}>
        <Spacing lg="100" md="80" />
        <Div className="container">
          <SectionHeading title="Guiding the Industry" subtitle="Our Presidents" variant="text-center" />
          <Spacing lg="60" md="30" />
          <Div className="row justify-content-center">
            <Div className="col-lg-8">
              <div style={{ backgroundColor: '#fff', borderRadius: '15px', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', color: '#4a4a4a', fontSize: '18px', lineHeight: '2', fontWeight: '500' }}>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, textAlign: 'center' }}>
                  <li><strong>Founder President & Trustee:</strong> Nayana Karunaratne</li>
                  <li style={{ borderBottom: '1px solid #eee', margin: '15px 0' }}></li>
                  <li><strong>Past President & Trustee:</strong> Ramzi Rahaman</li>
                  <li><strong>Past President:</strong> Thilaque de Silva</li>
                  <li><strong>Past President:</strong> Chrisy Rosairo</li>
                  <li><strong>Past President:</strong> Shereen Fernando</li>
                  <li><strong>Past President:</strong> Prisca Perera</li>
                  <li><strong>Past President:</strong> Chethika Manamperi</li>
                  <li><strong>Past Joint Presidents:</strong> Eroma Mendis & Swinita Gunawickrama</li>
                  <li><strong>Past President:</strong> Mayuri Thilakawardana</li>
                  <li style={{ borderBottom: '1px solid #eee', margin: '15px 0' }}></li>
                  <li><strong style={{ color: '#eb3e32' }}>Current Joint Presidents:</strong> Theekshanee Kriyawasam & Kayalvili Jayapragash</li>
                </ul>
              </div>
            </Div>
          </Div>
        </Div>
        <Spacing lg="100" md="80" />
      </Div>
      {/* End Presidents Section */}

      {/* Start Historical Archives Section */}
      <Div className="cs-light_mode" style={{ backgroundColor: '#fcfcfc' }}>
        <Spacing lg="100" md="80" />
        <Div className="container">
          <SectionHeading
            title="Our Historical Archives"
            subtitle="Moments of Glory"
            variant="cs-style1 text-center"
          />
          <Spacing lg="70" md="45" />
          <Div className="row">
            <Div className="col-lg-4">
              <Image src={pic2} alt="Historical Archive" className="w-100 cs-radius_15" style={{ objectFit: 'cover', height: '350px' }} />
              <Spacing lg="25" md="25" />
            </Div>
            <Div className="col-lg-4">
              <Image src={pic3} alt="Historical Archive" className="w-100 cs-radius_15" style={{ objectFit: 'cover', height: '350px' }} />
              <Spacing lg="25" md="25" />
            </Div>
            <Div className="col-lg-4">
              <Image src={pic4} alt="Historical Archive" className="w-100 cs-radius_15" style={{ objectFit: 'cover', height: '350px' }} />
              <Spacing lg="25" md="25" />
            </Div>
          </Div>
        </Div>
        <Spacing lg="100" md="80" />
      </Div>
      {/* End Historical Archives Section */}

      {/* Start CTA Section */}
      <Div className="container">
        <Spacing lg="50" md="30" />
        <Cta
          title="Do you have any inquiries? <br />Reach out to SLAHAB."
          btnText="Contact Details"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
        <Spacing lg="100" md="50" />
      </Div>
      {/* End CTA Section */}
    </>
  );
}

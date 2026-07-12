'use client'
import Image from "next/image";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import TeamSlider from "@/app/ui/Slider/TeamSlider";

const icdIntroImg = '/images/slahab/icd/icd_intro.jpg';
const icdLogo = '/images/slahab/icd/icd_logo.png';

const icdTeamData = [
  {
    memberImage: '/images/slahab/team/mayuri_thilakawardana.jpg',
    memberName: 'Mayuri Thilakawardana',
    memberDesignation: 'ICD Sri Lanka President',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: '/images/slahab/team/nayana_karunaratne.jpg',
    memberName: 'Nayana Karunaratne',
    memberDesignation: 'Founder President & Trustee',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: '/images/slahab/team/ramzi_rahaman.jpg',
    memberName: 'Ramzi Rahaman',
    memberDesignation: 'Past President & Trustee',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: '/images/slahab/team/theekshanee_kariyawasam.jpg',
    memberName: 'Theekshanee Kariyawasam',
    memberDesignation: 'Current Joint President',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
];

export default function IcdPage() {
  return (
    <>
      <PageHeading
        title="ICD Sri Lanka"
        bgSrc="/images/portfolio_hero_bg.jpeg"
        pageLinkText="ICD"
      />
      
      {/* Start Details Section */}
      <Div className="cs-light_mode">
        <Spacing lg="150" md="80" />
        <Div className="container">
          <Div className="row align-items-center">
            <Div className="col-lg-6">
              <SectionHeading
                title="Intercoiffure Mondial"
                subtitle="The Elite Network"
              >
                <Spacing lg="30" md="20" />
                <p className="cs-m0" style={{ color: '#4a4a4a', fontSize: '18px', lineHeight: '1.8', fontWeight: '500' }}>
                  Intercoiffure Mondial (ICD) is the world's most prestigious hairdressing organization. As the ICD Sri Lanka section, we connect the finest elite stylists in the country with a global network of fashion, luxury, and unparalleled artistry.
                </p>
                <Spacing lg="20" md="20" />
                <p className="cs-m0" style={{ color: '#4a4a4a', fontSize: '18px', lineHeight: '1.8', fontWeight: '500' }}>
                  Membership is highly exclusive, reflecting the pinnacle of professional achievement. Led by our President, Mayuri Thilakawardana, ICD Sri Lanka continues to elevate our local industry to the highest international standards.
                </p>
                <Spacing lg="30" md="30" />
                <Div className="cs-separator cs-accent_bg"></Div>
                <Spacing lg="25" md="40" />
              </SectionHeading>
            </Div>
            <Div className="col-lg-5 offset-lg-1" style={{ position: 'relative', marginTop: '20px' }}>
              <Image src={icdIntroImg} alt="ICD Sri Lanka" width={700} height={500} className="w-100 cs-radius_15" style={{ height: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
              <Div style={{ position: 'absolute', bottom: '-25px', left: '-25px', backgroundColor: '#161616', padding: '25px', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', width: '220px', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src={icdLogo} alt="ICD Logo" width={180} height={80} className="w-100" style={{ objectFit: 'contain', height: 'auto' }} />
              </Div>
            </Div>
          </Div>
        </Div>
        <Spacing lg="100" md="50" />
      </Div>
      {/* End Details Section */}

      {/* Start ICD Team Section */}
      <Spacing lg="100" md="50" />
      <Div className="container">
        <SectionHeading
          title="The Elite Circle"
          subtitle="ICD Team Members"
          variant="cs-style1 text-center"
        />
        <Spacing lg="60" md="30" />
        <TeamSlider data={icdTeamData} />
      </Div>
      <Spacing lg="100" md="50" />
      {/* End ICD Team Section */}

      {/* Start Event World Congress Section */}
      <Div style={{ backgroundColor: '#fcfcfc' }}>
        <Spacing lg="100" md="50" />
        <Div className="container">
          <Cta
            title="Experience the glamour of the next <br />ICD World Congress!"
            btnText="Congress Details"
            btnLink="/contact"
            bgSrc="/images/cta_bg.jpeg"
          />
        </Div>
        <Spacing lg="100" md="50" />
      </Div>
      {/* End Event World Congress Section */}
    </>
  );
}

'use client'
import Image from "next/image";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import Portfolio from "@/app/ui/Portfolio";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import TeamSlider from "@/app/ui/Slider/TeamSlider";

const omcIntroImg = '/images/slahab/omc/omc_intro.jpg';

const omcPics = [
  {
    title: 'OMC Asia Cup',
    subtitle: 'Malaysia Winners',
    href: '#',
    src: '/images/slahab/omc/omc1.jpg',
  },
  {
    title: 'OMC Hairworld Paris',
    subtitle: 'World Championships',
    href: '#',
    src: '/images/slahab/omc/omc2.jpg',
  },
  {
    title: 'Nail Fantasy Bronze',
    subtitle: 'OMC Hairworld',
    href: '#',
    src: '/images/slahab/omc/omc3.jpg',
  },
];

const omcTeamData = [
  {
    memberImage: '/images/slahab/board_member_2.png',
    memberName: 'Lakshan Darshana',
    memberDesignation: 'OMC Sri Lanka Delegation',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: '/images/slahab/board_member_1.png',
    memberName: 'Niranjala Wijekoon',
    memberDesignation: 'OMC Sri Lanka Delegation',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: '/images/slahab/board_member_2.png',
    memberName: 'Nihal Ranathunga',
    memberDesignation: 'Bronze Medalist - OMC Hairworld',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: '/images/slahab/board_member_4.png',
    memberName: 'Kayalvili Jayapragash',
    memberDesignation: 'Current Joint President / OMC Representative',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
];

export default function OmcPage() {
  return (
    <>
      <PageHeading
        title="OMC Hairworld"
        bgSrc="/images/portfolio_hero_bg.jpeg"
        pageLinkText="OMC"
      />
      
      {/* Start Details Section */}
      <Div className="cs-light_mode">
        <Spacing lg="150" md="80" />
        <Div className="container">
          <Div className="row align-items-center">
            <Div className="col-lg-6">
              <SectionHeading
                title="Organisation Mondiale Coiffure"
                subtitle="The Global Standard"
              >
                <Spacing lg="30" md="20" />
                <p className="cs-m0" style={{ color: '#4a4a4a', fontSize: '18px', lineHeight: '1.8', fontWeight: '500' }}>
                  As the official representative of Organisation Mondiale Coiffure (OMC) in Sri Lanka, SLAHAB takes immense pride in aligning with the world's largest organization for hair and beauty professionals.
                </p>
                <Spacing lg="20" md="20" />
                <p className="cs-m0" style={{ color: '#4a4a4a', fontSize: '18px', lineHeight: '1.8', fontWeight: '500' }}>
                  OMC sets the ultimate global standards, and our affiliation ensures that Sri Lankan talent is nurtured to compete and succeed internationally on stages like the OMC Hairworld Championships.
                </p>
                <Spacing lg="30" md="30" />
                <Div className="cs-separator cs-accent_bg"></Div>
                <Spacing lg="25" md="40" />
              </SectionHeading>
            </Div>
            <Div className="col-lg-5 offset-lg-1">
              <Image src={omcIntroImg} alt="OMC Sri Lanka" width={700} height={500} className="w-100 cs-radius_15" style={{ objectFit: 'cover', height: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
            </Div>
          </Div>
        </Div>
        <Spacing lg="100" md="50" />
      </Div>
      {/* End Details Section */}

      {/* Start OMC Team Section */}
      <Spacing lg="100" md="50" />
      <Div className="container">
        <SectionHeading
          title="Our OMC Representatives"
          subtitle="OMC Team Members"
          variant="cs-style1 text-center"
        />
        <Spacing lg="60" md="30" />
        <TeamSlider data={omcTeamData} />
      </Div>
      <Spacing lg="100" md="50" />
      {/* End OMC Team Section */}

      {/* Start Pics Gallery Section */}
      <Div className="cs-light_mode" style={{ backgroundColor: '#fcfcfc' }}>
        <Spacing lg="100" md="50" />
        <Div className="container">
          <SectionHeading title="Global Footprint" subtitle="OMC Moments" variant="text-center" />
          <Spacing lg="60" md="30" />
          <Div className="row">
            {omcPics.map((item, index) => (
              <Div className="col-lg-4" key={index}>
                <Portfolio
                  title={item.title}
                  subtitle={item.subtitle}
                  href={item.href}
                  src={item.src}
                  variant="cs-style1 cs-type1"
                />
                <Spacing lg="25" md="25" />
              </Div>
            ))}
          </Div>
        </Div>
        <Spacing lg="100" md="50" />
      </Div>
      {/* End Pics Gallery Section */}

      {/* Start Hairworld 2026 Details Section */}
      <Spacing lg="100" md="50" />
      <Div className="container">
        <Cta
          title="Join the Sri Lankan Delegation for <br />OMC Hairworld 2026 in Paris!"
          btnText="Get the Details"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
      <Spacing lg="100" md="50" />
      {/* End Hairworld 2026 Details Section */}
    </>
  );
}

'use client'
import Image from "next/image";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import Portfolio from "@/app/ui/Portfolio";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";

const introImg = '/images/slahab/awards/award_intro.jpg'

const awardData = [
  {
    title: 'National Award Winner 2025',
    subtitle: 'Best Hairstylist',
    href: '#',
    src: '/images/slahab/awards/award1.jpg',
  },
  {
    title: 'Outstanding Beautician',
    subtitle: 'National Awards 2025',
    href: '#',
    src: '/images/slahab/awards/award2.jpg',
  },
  {
    title: 'Creative Artistry',
    subtitle: 'National Awards 2025',
    href: '#',
    src: '/images/slahab/awards/award3.jpg',
  },
  {
    title: 'Champion Stylist',
    subtitle: 'National Awards 2024',
    href: '#',
    src: '/images/slahab/awards/award4.jpg',
  },
];

export default function NationalAwardsPage() {
  return (
    <>
      <PageHeading
        title="National Awards"
        bgSrc="/images/portfolio_hero_bg.jpeg"
        pageLinkText="National Awards"
      />
      
      {/* Start Details Section */}
      <Div className="cs-light_mode">
        <Spacing lg="150" md="80" />
        <Div className="container">
          <Div className="row align-items-center">
            <Div className="col-lg-6">
              <SectionHeading
                title="Celebrating Excellence in Hair & Beauty"
                subtitle="SLAHAB National Awards"
              >
                <Spacing lg="30" md="20" />
                <p className="cs-m0" style={{ color: '#4a4a4a', fontSize: '18px', lineHeight: '1.8', fontWeight: '500' }}>
                  The SLAHAB National Awards is the most prestigious platform in Sri Lanka, honoring the exceptional talent, creativity, and dedication of hairdressers and beauticians.
                </p>
                <Spacing lg="20" md="20" />
                <p className="cs-m0" style={{ color: '#4a4a4a', fontSize: '18px', lineHeight: '1.8', fontWeight: '500' }}>
                  Every year, we gather to celebrate the industry's finest, discovering new talent and setting higher benchmarks for professional excellence across the country. Winning a National Award represents the pinnacle of achievement in the Sri Lankan hair and beauty sector.
                </p>
                <Spacing lg="30" md="30" />
                <Div className="cs-separator cs-accent_bg"></Div>
                <Spacing lg="25" md="40" />
              </SectionHeading>
            </Div>
            <Div className="col-lg-5 offset-lg-1">
              <Image src={introImg} alt="SLAHAB National Awards" width={700} height={500} className="w-100 cs-radius_15" style={{ objectFit: 'cover', height: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
            </Div>
          </Div>
        </Div>
        <Spacing lg="100" md="50" />
      </Div>
      {/* End Details Section */}

      {/* Start Gallery Section */}
      <Spacing lg="100" md="50" />
      <Div className="container">
        <SectionHeading title="Moments of Glory" subtitle="Awards Gallery" variant="text-center" />
        <Spacing lg="60" md="30" />
        <Div className="row">
          {awardData.map((item, index) => (
            <Div className="col-lg-6" key={index}>
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
      {/* End Gallery Section */}

      {/* Start CTA Section */}
      <Div style={{ backgroundColor: '#fcfcfc' }}>
        <Spacing lg="100" md="50" />
        <Div className="container">
          <Cta
            title="Want to participate in the next <br />SLAHAB National Awards?"
            btnText="Contact Us"
            btnLink="/contact"
            bgSrc="/images/cta_bg.jpeg"
          />
        </Div>
        <Spacing lg="100" md="50" />
      </Div>
      {/* End CTA Section */}
    </>
  );
}

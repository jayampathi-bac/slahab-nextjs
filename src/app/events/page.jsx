'use client'
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import PostSlider from "@/app/ui/Slider/PostSlider";
import Image from "next/image";
import Link from "next/link";

const upcomingEvents = [
  {
    title: 'SLAHAB Hair & Beauty Masterclass',
    date: '24th September 2026',
    location: 'BMICH, Colombo',
    image: '/images/slahab/Poster 1.jpg',
    price: 'LKR 5,000'
  },
  {
    title: 'OMC Asia Cup Preparatory Seminar',
    date: '10th October 2026',
    location: 'SLAHAB Headquarters',
    image: '/images/slahab/Poster.jpg',
    price: 'Free for Members'
  }
];

const eventHighlightsData = [
  {
    url: '/national-awards',
    src: '/images/slahab/blog_awards.jpg',
    alt: 'National Awards',
    date: '12 Feb 2024',
    title: 'SLAHAB National Hair & Beauty Awards Highlights',
  },
  {
    url: '/omc',
    src: '/images/slahab/blog_omc_paris.jpg',
    alt: 'OMC Paris',
    date: '08 Sep 2023',
    title: 'OMC Hairworld World Championships in Paris',
  },
  {
    url: '#',
    src: '/images/slahab/OMC Asia Cup Malaysia with winners.jpg',
    alt: 'OMC Asia Cup',
    date: '15 May 2023',
    title: 'Sri Lanka shines at OMC Asia Cup in Malaysia',
  },
  {
    url: '/icd',
    src: '/images/slahab/blog_icd_president.jpg',
    alt: 'ICD',
    date: '02 Nov 2023',
    title: 'Intercoiffure Mondial Elite Networking Event',
  },
  {
    url: '#',
    src: '/images/slahab/blog_education.jpg',
    alt: 'Education',
    date: '20 Jan 2024',
    title: 'Advanced Bridal Styling Workshop with International Experts',
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHeading
        title="Events & Programs"
        bgSrc="/images/portfolio_hero_bg.jpeg"
        pageLinkText="Events"
      />
      
      {/* Start Upcoming Events Section */}
      <Div className="cs-light_mode">
        <Spacing lg="120" md="80" />
        <Div className="container">
          <SectionHeading
            title="Join Our Upcoming Events"
            subtitle="Register & Participate"
            variant="cs-style1 text-center"
          />
          <Spacing lg="60" md="40" />
          <Div className="cs-events_list">
            {upcomingEvents.map((event, index) => (
              <Div className="row align-items-center" key={index} style={{ marginBottom: index !== upcomingEvents.length - 1 ? '100px' : '0' }}>
                <Div className={`col-lg-5 ${index % 2 !== 0 ? 'order-lg-2' : ''}`}>
                  <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}>
                    <img src={event.image} alt={event.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                </Div>
                <Div className={`col-lg-6 ${index % 2 !== 0 ? 'order-lg-1' : 'offset-lg-1'}`}>
                  <Spacing lg="0" md="40" />
                  <div style={{ padding: '20px 0' }}>
                    <div style={{ color: '#eb3e32', fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>
                      {event.date}
                    </div>
                    <h2 style={{ fontSize: '42px', fontWeight: 700, marginBottom: '20px', color: '#161616', lineHeight: 1.2 }}>
                      {event.title}
                    </h2>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 30px 0', color: '#4a4a4a', fontSize: '18px', lineHeight: 1.8 }}>
                      <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontWeight: 600, width: '120px' }}>Location:</span> {event.location}
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, width: '120px' }}>Ticket Fee:</span> {event.price}
                      </li>
                    </ul>
                    <Link href="/contact" className="cs-btn cs-style1">
                      <span>Register Now</span>
                    </Link>
                  </div>
                </Div>
              </Div>
            ))}
          </Div>
        </Div>
        <Spacing lg="90" md="50" />
      </Div>
      {/* End Upcoming Events Section */}

      {/* Start Wellness Program Section */}
      <Spacing lg="120" md="80" />
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-lg-6">
            <SectionHeading
              title="Health & Wellness Initiatives"
              subtitle="Wellness Program"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0" style={{ color: '#fff', fontSize: '18px', lineHeight: '1.8', fontWeight: '400' }}>
                SLAHAB strongly believes that a healthy professional is a successful professional. Our Wellness Programs are designed specifically for hairdressers and beauticians to help them manage occupational hazards, maintain physical health, and improve mental well-being in a fast-paced industry.
              </p>
              <Spacing lg="20" md="20" />
              <p className="cs-m0" style={{ color: '#fff', fontSize: '18px', lineHeight: '1.8', fontWeight: '400' }}>
                Through seminars, ergonomic training, and dedicated health retreats, we ensure that our members are fully supported in building long, thriving careers.
              </p>
              <Spacing lg="30" md="30" />
              <Div className="cs-separator cs-accent_bg"></Div>
            </SectionHeading>
            <Spacing lg="0" md="40" />
          </Div>
          <Div className="col-lg-5 offset-lg-1">
            <Image src="/images/slahab/Kaylvili in action.jpg" alt="Wellness Program" width={600} height={700} style={{ width: '100%', height: 'auto', borderRadius: '15px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
          </Div>
        </Div>
      </Div>
      <Spacing lg="120" md="80" />
      {/* End Wellness Program Section */}

      {/* Start Highlights Section */}
      <Div className="cs-light_mode" style={{ backgroundColor: '#fcfcfc' }}>
        <Spacing lg="120" md="80" />
        <Div className="container">
          <SectionHeading
            title="Highlights from Past Events"
            subtitle="Event Memories"
            variant="cs-style1 text-center"
          />
          <Spacing lg="60" md="30" />
          <PostSlider data={eventHighlightsData} />
        </Div>
        <Spacing lg="120" md="80" />
      </Div>
      {/* End Highlights Section */}
    </>
  );
}

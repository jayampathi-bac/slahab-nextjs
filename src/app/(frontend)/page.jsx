import { getPayload } from 'payload'
import config from '@payload-config'
import EventPopup from '@/app/ui/EventPopup'
import Cta from '@/app/ui/Cta'
import Div from '@/app/ui/Div'
import FunFact from '@/app/ui/FunFact'
import Hero from '@/app/ui/Hero'
import LogoList from '@/app/ui/LogoList'
import MovingText from '@/app/ui/MovingText'
import SectionHeading from '@/app/ui/SectionHeading'
import PortfolioSlider from '@/app/ui/Slider/PortfolioSlider'
import PostSlider from '@/app/ui/Slider/PostSlider'
import TeamSlider from '@/app/ui/Slider/TeamSlider'
import TestimonialSlider from '@/app/ui/Slider/TestimonialSlider'
import TimelineSlider from '@/app/ui/Slider/TimelineSlider'
import Spacing from '@/app/ui/Spacing'
import VideoModal from '@/app/ui/VideoModal'
import ServiceList from '@/app/ui/ServiceList'

export const dynamic = 'force-dynamic'

const heroSocialLinks = [
  { name: 'Facebook', links: 'https://www.facebook.com/' },
  { name: 'Instagram', links: 'https://www.instagram.com/' },
]

const funfactData = [
  { title: 'Year Founded', factNumber: '1996' },
  { title: 'Official Member', factNumber: 'OMC' },
  { title: 'Luxury Network', factNumber: 'ICD' },
  { title: 'Years of Excellence', factNumber: '30+' },
]

const slahabPillars = [
  {
    title: 'Professional Education',
    subtitle:
      'Regular workshops, masterclasses, and seminars with local and international styling experts to elevate professional standards.',
    imgUrl: '/images/slahab/card_education.jpg',
    href: '/events',
  },
  {
    title: 'National Awards',
    subtitle:
      'The premier national competition in Sri Lanka, celebrating hairdresser excellence and craftsmanship.',
    imgUrl: '/images/slahab/card_awards.jpg',
    href: '/national-awards',
  },
  {
    title: 'OMC Global Competitions',
    subtitle:
      'Official pathway for Sri Lankan stylists to compete at the prestigious OMC Hairworld and Asia Cup championships.',
    imgUrl: '/images/slahab/card_omc.jpg',
    href: '/omc',
  },
  {
    title: 'ICD Sri Lanka Chapter',
    subtitle:
      'Connecting Sri Lankan hair artists with Intercoiffure Mondial, the leading global association of high-fashion hair designers.',
    imgUrl: '/images/slahab/card_icd.jpg',
    href: '/icd',
  },
]

const portfolioData = [
  {
    title: 'SLAHAB Styling Showcase',
    subtitle: "Kayal's Hair Creations & Style",
    href: '#',
    src: '/images/slahab/port_kayal.jpg',
  },
  {
    title: 'OMC Asia Cup Winnings',
    subtitle: 'Moments of Pride - Malaysia',
    href: '/omc',
    src: '/images/slahab/port_omc_asia.jpg',
  },
  {
    title: 'Advanced Educational Workshops',
    subtitle: 'National Hair & Beauty Seminars',
    href: '/events',
    src: '/images/slahab/port_nihal.jpg',
  },
  {
    title: 'International Triumphs',
    subtitle: 'Sri Lanka Styling Team Wins',
    href: '/omc',
    src: '/images/slahab/port_winnings.jpg',
  },
]

const slahabTimeline = [
  [
    {
      year: '1996',
      name: 'Association Founded',
      position: 'Colombo, Sri Lanka',
      type: 'SLAHAB established by leading hairdressers to develop the local industry.',
    },
    {
      year: '2005',
      name: 'OMC Membership',
      position: 'Paris, France',
      type: 'Gained official membership of Organisation Mondiale Coiffure.',
    },
  ],
  [
    {
      year: '2010',
      name: 'ICD Sri Lanka Chapter',
      position: 'Intercoiffure Mondial',
      type: 'Launched the local chapter of Intercoiffure Mondial luxury stylists network.',
    },
    {
      year: '2021',
      name: 'OMC Hair World Bronze',
      position: 'Bronze Medal',
      type: 'Nihal Ranathunga wins bronze in Nail Fantasy representing Sri Lanka.',
    },
  ],
  [
    {
      year: '2024',
      name: 'Asia Cup Excellence',
      position: 'Kuala Lumpur, Malaysia',
      type: 'Sri Lanka team excels at OMC Asia Cup, bringing home multiple awards.',
    },
    {
      year: '2026',
      name: 'Preparing for Paris',
      position: 'OMC Hair World 2026',
      type: 'Preparing national representatives for the OMC Hair World in Paris.',
    },
  ],
]

const slahabTeam = [
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
    memberImage: '/images/slahab/team/mayuri_thilakawardana.jpg',
    memberName: 'Mayuri Thilakawardana',
    memberDesignation: 'Past President & ICD President',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: '/images/slahab/team/kaylvili_jayapragash.jpg',
    memberName: 'Kayalvili Jayapragash',
    memberDesignation: 'Current Joint President',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: '/images/slahab/team/theekshanee_kariyawasam.jpg',
    memberName: 'Theekshanee Kriyawasam',
    memberDesignation: 'Current Joint President',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: '/images/slahab/team/lakshan_darshana.jpg',
    memberName: 'Lakshan Darshana',
    memberDesignation: 'Board Member',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: '/images/slahab/team/nihal_ranathunge.jpg',
    memberName: 'Nihal Ranathunge',
    memberDesignation: 'Board Member',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: '/images/slahab/team/niranjala_thennakoon.jpg',
    memberName: 'Niranjala Thennakoon',
    memberDesignation: 'Board Member',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
]

const slahabTestimonials = [
  {
    testimonialThumb: '/images/testimonial_1.jpeg',
    testimonialText:
      'SLAHAB has transformed my career by providing access to world-class education and workshops. Being able to represent Sri Lanka at the OMC global stage was a dream come true.',
    avatarName: 'Dilhani Perera',
    avatarDesignation: 'Senior Hair Stylist & Member',
    ratings: '5',
  },
  {
    testimonialThumb: '/images/testimonial_2.jpeg',
    testimonialText:
      'As an active member of SLAHAB, I have connected with global hair care experts, refined my techniques, and brought international standards back to my salon in Colombo.',
    avatarName: 'Rohan Silva',
    avatarDesignation: 'Salon Owner & Educator',
    ratings: '5',
  },
  {
    testimonialThumb: '/images/testimonial_3.jpeg',
    testimonialText:
      'The educational seminars initiated by SLAHAB with international experts have elevated the skills of thousands of young hairdressers and beauticians across Sri Lanka.',
    avatarName: 'Sanduni Jayasekara',
    avatarDesignation: 'Bridal Stylist & Academy Graduate',
    ratings: '4.5',
  },
]

const slahabBlogs = [
  {
    url: '#',
    src: '/images/slahab/blog_omc_paris.jpg',
    alt: 'OMC Paris',
    date: '15 Jun 2026',
    title: 'Sri Lanka Stylists Prepare for the Prestigious OMC Hair World 2026 in Paris',
  },
  {
    url: '#',
    src: '/images/slahab/blog_awards.jpg',
    alt: 'SLAHAB Awards',
    date: '01 Jun 2026',
    title: 'SLAHAB National Awards 2026: Celebrating Creative Excellence in Colombo',
  },
  {
    url: '#',
    src: '/images/slahab/blog_icd_president.jpg',
    alt: 'ICD President Message',
    date: '20 May 2026',
    title: 'A Vision for Luxury Styling: Keynote Message from ICD President Mayuri Thilakawardana',
  },
  {
    url: '#',
    src: '/images/slahab/blog_education.jpg',
    alt: 'SLAHAB Education',
    date: '10 May 2026',
    title: 'Elevating Standards: Annual Professional Hair and Beauty Education Seminars',
  },
]


export default async function Home() {
  const payload = await getPayload({ config })
  const { docs: featuredEvents } = await payload.find({
    collection: 'events',
    where: {
      and: [
        { showOnHomepage: { equals: true } },
        { status: { equals: 'upcoming' } },
      ],
    },
    sort: 'date',
    limit: 3,
  })

  return (
    <>
      {/* Hero */}
      <Hero
        title="Elevating the Art of <br/>Hair & Beauty in Sri Lanka"
        subtitle="Established in 1996, SLAHAB is the premier national body representing hairdressers, beauticians, and stylists in Sri Lanka, fostering education, global standards, and international competition."
        btnText="Explore Our Story"
        btnLink="/about"
        scrollDownId="#service"
        socialLinksHeading="Follow Us"
        heroSocialLinks={heroSocialLinks}
        bgImageUrl="/images/hero_bg.jpeg"
      />

      {/* Floating event popup — slides in after 1.8s, dismissable */}
      <EventPopup events={featuredEvents} />

      {/* FunFact */}
      <div className="container">
        <FunFact
          variant="cs-type1"
          title="Our Legacy"
          subtitle="For over three decades, SLAHAB has been the pillar of support for hair and beauty professionals in Sri Lanka, offering education, mentorship, and international pathways."
          data={funfactData}
        />
      </div>

      {/* Service Section */}
      <Div className="cs-light_mode">
        <Spacing lg="70" md="35" />
        <Div id="service">
          <Div className="container">
            <SectionHeading
              title="Our Pillars of Excellence"
              subtitle="What We Do"
              btnText="See All Services"
              btnLink="/service"
              variant="cs-style1 text-center"
            />
            <Spacing lg="70" md="45" />
            <ServiceList data={slahabPillars} />
          </Div>
        </Div>
        <Spacing lg="150" md="50" />
      </Div>

      {/* Portfolio */}
      <Div>
        <Spacing lg="70" md="35" />
        <Div className="container">
          <SectionHeading
            title="Moments of Pride & Craftsmanship"
            subtitle="Our Gallery"
            variant="cs-style1 text-center"
          />
          <Spacing lg="90" md="45" />
        </Div>
        <PortfolioSlider data={portfolioData} />
      </Div>

      {/* Timeline */}
      <Spacing lg="150" md="80" />
      <Div className="cs-shape_wrap_2">
        <Div className="cs-shape_2">
          <Div />
        </Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Milestones of Growth & Success"
                subtitle="Our Timeline"
                variant="cs-style1"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <TimelineSlider data={slahabTimeline} />
            </Div>
          </Div>
        </Div>
      </Div>

      {/* Video */}
      <Spacing lg="130" md="70" />
      <Div className="container">
        <h2 className="cs-font_50 cs-m0 text-center cs-line_height_4">
          Agile, professional, and globally connected—elevating the standards of hair and beauty in
          Sri Lanka.
        </h2>
        <Spacing lg="70" md="70" />
        <VideoModal
          videoSrc="/images/slahab/icd_president_msg.mp4"
          bgUrl="/images/slahab/video_bg_cropped.jpg"
        />
      </Div>

      {/* Team */}
      <Div className="cs-light_mode">
        <Spacing lg="70" md="35" />
        <Div className="container">
          <SectionHeading title="Leadership & Trustees" subtitle="Our Board" variant="cs-style1" />
          <Spacing lg="85" md="45" />
          <TeamSlider data={slahabTeam} />
        </Div>
        <Spacing lg="150" md="80" />
      </Div>

      {/* Testimonials */}
      <TestimonialSlider data={slahabTestimonials} />

      {/* Blog */}
      <Div className="cs-light_mode">
        <Spacing lg="70" md="35" />
        <Div className="cs-shape_wrap_4">
          <Div className="cs-shape_4"></Div>
          <Div className="cs-shape_4"></Div>
          <Div className="container">
            <Div className="row">
              <Div className="col-xl-4">
                <SectionHeading
                  title="Latest Industry Publications"
                  subtitle="Our Blog"
                />
                <Spacing lg="20" md="10" />
                {/* Editorial brand statement — clean typographic feature for the light section */}
                <div style={{ maxWidth: '380px' }}>
                  <h3
                    className="cs-primary_font"
                    style={{
                      fontSize: '26px',
                      lineHeight: 1.5,
                      color: '#141414',
                      fontWeight: 400,
                      margin: '0 0 28px',
                    }}
                  >
                    Setting the national standard for{' '}
                    <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
                      hair &amp; beauty excellence
                    </span>{' '}
                    across Sri Lanka.
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '18px',
                    }}
                  >
                    <span style={{ width: '48px', height: '2px', background: 'var(--accent)' }} />
                    <span
                      style={{
                        color: 'var(--accent)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                      }}
                    >
                      Est. 1996
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '14px',
                      lineHeight: 1.8,
                      color: '#888',
                      fontWeight: 300,
                    }}
                  >
                    Official OMC Representative &middot; ICD Sri Lanka Chapter
                  </p>
                </div>
                <Spacing lg="40" md="30" />
              </Div>
              <Div className="col-xl-7 offset-xl-1">
                <Div className="cs-half_of_full_width">
                  <PostSlider data={slahabBlogs} />
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
        <Spacing lg="125" md="70" />
      </Div>

      {/* Moving Text */}
      <MovingText text="OFFICIAL MEMBER OF OMC WORLD • ICD SRI LANKA • HAIRDRESSING & BEAUTY EXCELLENCE • ESTABLISHED 1996" />
      <Spacing lg="105" md="70" />

      {/* Logo List */}
      <Div className="container">
        <LogoList />
      </Div>
      <Spacing lg="150" md="80" />

      {/* CTA */}
      <Div className="container">
        <Cta
          title="Join SLAHAB today and <br />elevate your professional journey"
          btnText="Apply for Membership"
          btnLink="/contact"
          bgSrc="/images/slahab/cta_bg_cropped.jpg"
        />
      </Div>
    </>
  )
}

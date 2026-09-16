import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Div from '@/app/ui/Div'
import PageHeading from '@/app/ui/PageHeading'
import SectionHeading from '@/app/ui/SectionHeading'
import Spacing from '@/app/ui/Spacing'
import PostSlider from '@/app/ui/Slider/PostSlider'
import Image from 'next/image'
import Icon from '@/app/ui/Icon'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Events & Programs | SLAHAB',
}

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
]

function formatDateRange(date, endDate) {
  if (!date) return ''
  const start = new Date(date)
  const opts = { day: 'numeric', month: 'long', year: 'numeric' }
  if (!endDate) return start.toLocaleDateString('en-GB', opts)
  const end = new Date(endDate)
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.getDate()} ${start.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`
  }
  return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-GB', opts)}`
}

export default async function EventsPage() {
  const payload = await getPayload({ config })

  const { docs: upcomingEvents } = await payload.find({
    collection: 'events',
    where: { status: { equals: 'upcoming' } },
    sort: 'date',
    limit: 20,
  })

  const { docs: pastEvents } = await payload.find({
    collection: 'events',
    where: { status: { equals: 'past' } },
    sort: '-date',
    limit: 20,
    depth: 1,
  })

  return (
    <>
      <style>{`
        .editorial-event-card {
          border-color: #eaeaea;
          box-shadow: none;
        }
        .editorial-event-card:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.04) !important;
        }
        .editorial-event-img {
          transform: scale(1);
        }
        .editorial-event-card:hover .editorial-event-img {
          transform: scale(1.05);
        }
        .editorial-btn {
          background-color: var(--accent);
          color: #000;
        }
        .editorial-btn:hover {
          background-color: #111 !important;
          color: #fff !important;
        }
        .editorial-page-header {
          padding: 120px 0 60px;
          background: #0a0a0a;
          text-align: center;
          border-bottom: 1px solid rgba(194, 155, 87, 0.2);
        }
      `}</style>

      {/* Sleek Editorial Page Header */}
      <div className="editorial-page-header">
        <div className="container">
          <h1 className="cs-primary_font" style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, marginBottom: '16px' }}>
            Events & Programs
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: '#888' }}>
            <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span style={{ color: 'var(--accent)' }}>Events</span>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <Div className="cs-light_mode" style={{ backgroundColor: '#fff' }}>
        <Spacing lg="80" md="50" />
        <Div className="container">
          <SectionHeading
            title="Upcoming Events"
            subtitle="Register & Participate"
            variant="cs-style1 text-center"
          />
          <Spacing lg="80" md="50" />

          {upcomingEvents.length === 0 ? (
            <p
              style={{
                textAlign: 'center',
                color: '#888',
                fontSize: '15px',
                fontWeight: 300,
                letterSpacing: '1px',
                paddingBottom: '40px',
              }}
            >
              No upcoming events at the moment. Check back soon.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '40px',
              }}
            >
              {upcomingEvents.map((event) => {
                const imageUrl =
                  event.featuredImage?.url ?? '/images/slahab/Poster 1.jpg'
                const dateStr = formatDateRange(event.date, event.endDate)

                return (
                  <div
                    key={event.id}
                    className="editorial-event-card"
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #eaeaea',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                    }}
                  >
                    {/* Card image */}
                    <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                      <img
                        src={imageUrl}
                        alt={event.title}
                        className="editorial-event-img"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.6s ease',
                        }}
                      />
                      {/* Suble dark gradient for tag readability */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)',
                          pointerEvents: 'none',
                        }}
                      />
                      
                      {event.tag && (
                        <span
                          className="cs-primary_font"
                          style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            backgroundColor: 'rgba(10,10,10,0.7)',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid var(--accent)',
                            color: 'var(--accent)',
                            fontSize: '9px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            padding: '6px 14px',
                          }}
                        >
                          {event.tag}
                        </span>
                      )}
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {dateStr && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                          <Icon icon="ph:calendar-blank-light" style={{ fontSize: '16px', color: 'var(--accent)' }} />
                          <p
                            style={{
                              color: '#888',
                              fontSize: '10px',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '2px',
                              margin: 0,
                            }}
                          >
                            {dateStr}
                          </p>
                        </div>
                      )}

                      <h3
                        className="cs-primary_font"
                        style={{
                          fontSize: '24px',
                          fontWeight: 400,
                          color: '#111',
                          lineHeight: 1.3,
                          marginBottom: '20px',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {event.title}
                      </h3>

                      {event.location && (
                        <p
                          style={{
                            color: '#666',
                            fontSize: '13px',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontWeight: 300,
                          }}
                        >
                          <Icon icon="ph:map-pin-light" style={{ fontSize: '16px', color: 'var(--accent)' }} />
                          {event.location}
                        </p>
                      )}

                      {event.excerpt && (
                        <p
                          style={{
                            color: '#555',
                            fontSize: '14px',
                            lineHeight: 1.8,
                            marginBottom: '32px',
                            flex: 1,
                            fontWeight: 300,
                          }}
                        >
                          {event.excerpt}
                        </p>
                      )}

                      <div style={{ marginTop: 'auto' }}>
                        <Link
                          href={`/events/${event.slug}`}
                          className="editorial-btn"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            padding: '14px 24px',
                            textDecoration: 'none',
                            transition: 'background-color 0.3s ease, color 0.3s ease',
                          }}
                        >
                          <span>View Details</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Div>
        <Spacing lg="80" md="50" />
      </Div>

      {/* Wellness Program Section */}
      <Div style={{ backgroundColor: '#0a0a0a' }}>
        <Spacing lg="80" md="50" />
        <Div className="container">
          <Div className="row align-items-center">
            <Div className="col-lg-6">
              <SectionHeading title="Health & Wellness Initiatives" subtitle="Wellness Program">
                <Spacing lg="40" md="30" />
                <p
                  className="cs-m0"
                  style={{ color: '#aaa', fontSize: '16px', lineHeight: '1.9', fontWeight: '300' }}
                >
                  SLAHAB strongly believes that a healthy professional is a successful professional.
                  Our Wellness Programs are designed specifically for hairdressers and beauticians to
                  help them manage occupational hazards, maintain physical health, and improve mental
                  well-being in a fast-paced industry.
                </p>
                <Spacing lg="20" md="20" />
                <p
                  className="cs-m0"
                  style={{ color: '#aaa', fontSize: '16px', lineHeight: '1.9', fontWeight: '300' }}
                >
                  Through seminars, ergonomic training, and dedicated health retreats, we ensure that
                  our members are fully supported in building long, thriving careers.
                </p>
                <Spacing lg="40" md="40" />
                <Div className="cs-separator cs-accent_bg"></Div>
              </SectionHeading>
              <Spacing lg="0" md="40" />
            </Div>
            <Div className="col-lg-5 offset-lg-1">
              <Image
                src="/images/slahab/Kaylvili in action.jpg"
                alt="Wellness Program"
                width={600}
                height={700}
                style={{
                  width: '100%',
                  height: 'auto',
                  border: '1px solid rgba(194,155,87,0.3)',
                }}
              />
            </Div>
          </Div>
        </Div>
        <Spacing lg="80" md="50" />
      </Div>

      {/* Past Event Highlights */}
      <Div className="cs-light_mode" style={{ backgroundColor: '#fcfcfc', borderTop: '1px solid #eaeaea' }}>
        <Spacing lg="80" md="50" />
        <Div className="container">
          <SectionHeading
            title="Highlights from Past Events"
            subtitle="Event Memories"
            variant="cs-style1 text-center"
          />
          <Spacing lg="80" md="50" />

          {pastEvents.length > 0 && (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '36px',
                  marginBottom: '64px',
                }}
              >
                {pastEvents.map((event) => {
                  const imageUrl = event.featuredImage?.url ?? '/images/slahab/blog_awards.jpg'
                  const dateStr = formatDateRange(event.date, event.endDate)
                  return (
                    <Link
                      key={event.id}
                      href={`/events/${event.slug}`}
                      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
                    >
                      <div
                        style={{
                          border: '1px solid #eaeaea',
                          backgroundColor: '#fff',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                          height: '100%',
                        }}
                        className="editorial-event-card"
                      >
                        <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                          <img
                            src={imageUrl}
                            alt={event.title}
                            className="editorial-event-img"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                          />
                          {event.tag && (
                            <span
                              className="cs-primary_font"
                              style={{
                                position: 'absolute',
                                bottom: '16px',
                                left: '16px',
                                backgroundColor: 'rgba(10,10,10,0.72)',
                                backdropFilter: 'blur(4px)',
                                border: '1px solid var(--accent)',
                                color: 'var(--accent)',
                                fontSize: '9px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                padding: '5px 12px',
                              }}
                            >
                              {event.tag}
                            </span>
                          )}
                        </div>
                        <div style={{ padding: '28px 28px 32px' }}>
                          {dateStr && (
                            <p style={{ color: '#999', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
                              {dateStr}
                            </p>
                          )}
                          <h3
                            className="cs-primary_font"
                            style={{ fontSize: '20px', fontWeight: 400, color: '#111', lineHeight: 1.3, marginBottom: '12px' }}
                          >
                            {event.title}
                          </h3>
                          {event.location && (
                            <p style={{ color: '#888', fontSize: '13px', fontWeight: 300, margin: 0 }}>
                              {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}

          <PostSlider data={eventHighlightsData} />
        </Div>
        <Spacing lg="80" md="50" />
      </Div>
    </>
  )
}

import { waLink } from '../siteData.js'

// French & Online Tutoring is listed first — it's Catherine's flagship
// offering and gets its own dedicated page with a full rate card, so the
// enquire link here points there instead of straight to WhatsApp.
const SERVICES = [
  {
    title: 'French & Online Tutoring',
    description:
      'DELF-aligned French lessons, live online or in small groups — beginner through advanced, for children and professionals alike, with flexible scheduling across time zones.',
    cta: 'Explore French tutoring →',
    href: '/french',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
      </>
    ),
  },
  {
    title: 'Guidance & Counselling',
    description:
      'One-on-one academic and life counselling for students and young adults — orientation, placement support, and a confidential space to think things through.',
    cta: 'Book a counselling session →',
    text: "Hi Catherine, I'd like to book a counselling session. Could you share more details?",
    icon: (
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    ),
  },
  {
    title: 'Textile & Fabric Curation',
    description:
      'Sourcing of quality Ankara, lace, and tailoring fabric for personal wear, uniforms, and special occasions — matched to your budget, event, and taste.',
    cta: 'Ask about fabric sourcing →',
    text: "Hi Catherine, I'd like to ask about fabric sourcing.",
    icon: (
      <>
        <path d="M20.5 6.5 12 2 3.5 6.5 12 11l8.5-4.5z" />
        <path d="M3.5 6.5v11L12 22l8.5-4.5v-11" />
        <path d="M12 11v11" />
      </>
    ),
  },
]

export default function Services() {
  return (
    <>
      <div className="adire-rule top" />
      <section id="services" className="panel">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">What I Offer</p>
            <h2>Services</h2>
            <p>Four ways to work together — in the classroom, on a call, or over a length of fabric.</p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <div className="service-card" key={service.title}>
                <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {service.icon}
                </svg>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {service.href ? (
                  <a className="enquire" href={service.href}>
                    {service.cta}
                  </a>
                ) : (
                  <a className="enquire" href={waLink(service.text)} target="_blank" rel="noopener">
                    {service.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

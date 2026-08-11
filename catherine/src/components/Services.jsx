import { waLink } from '../siteData.js'

const SERVICES = [
  {
    title: 'Teaching',
    description:
      'Classroom and small-group instruction across core subjects, with a steady, encouraging style built for students who learn best with patience and structure.',
    cta: "Enquire about teaching →",
    text: "Hi Catherine, I'm interested in your teaching services. Could you tell me more?",
    icon: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2z" />
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
    title: 'French Tutoring',
    description:
      'DELF-aligned French lessons for beginners through intermediate learners — grammar, conversation, and exam preparation, taught with real classroom experience.',
    cta: 'Start French lessons →',
    text: "Hi Catherine, I'm interested in starting French lessons with you.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
      </>
    ),
  },
  {
    title: 'Online Tutoring',
    description:
      'Live virtual sessions for students learning remotely — flexible scheduling across time zones, with the same one-on-one attention as an in-person lesson.',
    cta: 'Schedule an online session →',
    text: "Hi Catherine, I'd like to schedule an online tutoring session.",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="14" rx="1.5" />
        <path d="M8 21h8M12 18v3" />
      </>
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
            <p>Five ways to work together — in the classroom, on a call, or over a length of fabric.</p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <div className="service-card" key={service.title}>
                <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {service.icon}
                </svg>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a className="enquire" href={waLink(service.text)} target="_blank" rel="noopener">
                  {service.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

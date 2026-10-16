// Dates/roles taken from public/llms-full.txt and resume.pdf.
// TODO(Gideon): confirm Dayout end date (resume says "Present", llms-full says Sep 2026)
// and mark any concurrent/part-time roles before publishing.
const roles = [
  {
    company: 'Dayout',
    place: 'United States · remote',
    title: 'Backend Developer (Laravel → Go)',
    dates: 'Jun 2024 – Sep 2026',
    points: [
      'Rewrote core service endpoints (activities, notifications, emails, comments) from Laravel to Go on a 3-person backend team.',
      'Built a push notification service from scratch; led the Eloquent-vs-raw-SQL study that drove company-wide adoption of Eloquent.',
    ],
  },
  {
    company: 'KOC',
    place: 'Nigeria',
    title: 'Full Stack Developer',
    dates: 'Sep 2025 – May 2026',
    points: [
      'Rescued a stalled project and shipped it from a Figma design under a tight deadline.',
      'Integrated WooCommerce syncing and transactional email; built role-based permissions with Policies and Gates.',
    ],
  },
  {
    company: 'Africred',
    place: 'Nigeria',
    title: 'Backend Developer',
    dates: 'Feb 2025 – Sep 2025',
    caseStudy: '/work/africred-crm-integrations',
    points: [
      'Built webhook ingestion for Facebook Instant Forms into the production CRM, plus automated OAuth token refresh.',
      'Used additive changes on a live CRM database instead of a risky rewrite.',
    ],
  },
  {
    company: 'Televerse',
    place: 'Nigeria',
    title: 'Backend Developer (NestJS, GraphQL)',
    dates: 'Apr 2023 – Jun 2024',
    points: [
      'Built search APIs (NestJS, GraphQL, MongoDB, Redis, RabbitMQ) and a coin-gifting payment API for the ReachMe app.',
    ],
  },
  {
    company: 'Thinkshifts',
    place: 'United Kingdom · remote',
    title: 'Full Stack Developer',
    dates: 'Nov 2021 – Jun 2024',
    points: ['Built a real-estate web app on Laravel and Vue 3; contributed to the Carelly app.'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-paper">Experience</h2>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-gold uppercase tracking-widebit hover:text-goldsoft transition-colors"
          >
            full résumé ↓
          </a>
        </div>
        <ol className="space-y-6">
          {roles.map((r) => (
            <li
              key={r.company + r.dates}
              className="border border-paper/10 rounded-2xl p-5 sm:p-7 bg-ink/60"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h3 className="font-display text-xl sm:text-2xl text-paper">
                  {r.company} <span className="text-paper/50 text-base">· {r.place}</span>
                </h3>
                <span className="font-mono text-xs text-slate">{r.dates}</span>
              </div>
              <p className="font-mono text-xs uppercase tracking-widebit text-sage mb-3">{r.title}</p>
              <ul className="list-disc pl-5 space-y-1.5 text-paper/70 leading-relaxed">
                {r.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              {r.caseStudy && (
                <a href={r.caseStudy} className="inline-block mt-3 font-mono text-xs text-gold hover:text-goldsoft transition-colors">
                  read the case study →
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

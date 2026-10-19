import { ArrowRight } from 'lucide-react'
import { allProjects, FEATURED } from '../data/projects.js'
import ProjectImage from './ProjectImage.jsx'
import Reveal from './Reveal.jsx'

function WorkCard({ p, clamp }) {
  return (
    <article className="group min-w-0 h-full flex flex-col border border-paper/10 rounded-2xl overflow-hidden hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 bg-ink/60">
      <div className="relative aspect-[16/10] bg-inkdeep overflow-hidden border-b border-paper/10">
        <ProjectImage src={p.image} title={p.title} />
        <span className={`absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widebit border rounded-full px-2.5 py-1 backdrop-blur ${p.statusColor}`}>
          {p.status}
        </span>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl sm:text-2xl text-paper mb-3 break-words group-hover:text-gold transition-colors">{p.title}</h3>
        <p className={`text-paper/65 leading-relaxed mb-5 break-words ${clamp ? 'line-clamp-4' : ''}`}>{p.summary}</p>

        {p.metrics && (
          <div className="mb-5 rounded-lg border border-sage/20 bg-sage/[0.04] px-4 py-3 font-mono text-[11px] space-y-2">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-paper/45 mb-0.5 break-words">{m.label}</div>
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <span className="text-paper/70">
                    {m.from} <span className="text-paper/30">→</span> {m.to} <span className="text-paper/40">views</span>
                  </span>
                  <span className="text-sage font-medium whitespace-nowrap">{m.diff}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2 flex flex-col gap-3">
          <ul className="flex flex-wrap gap-2 font-mono text-[11px] text-sage">
            {p.stack.map((s) => (
              <li key={s} className="border border-sage/25 rounded-full px-2.5 py-1">{s}</li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {p.caseStudy && (
              <a href={p.caseStudy} className="font-mono text-[11px] text-sage hover:text-paper transition-colors">
                read the case study →
              </a>
            )}
            {p.href && (
              <a href={p.href} target="_blank" rel="noreferrer" className="font-mono text-[11px] text-gold hover:text-goldsoft transition-colors break-all">
                {p.linkLabel} ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function WorkAll() {
  const live = allProjects.filter((p) => p.status !== 'draft')
  const wip = allProjects.filter((p) => p.status === 'draft')
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {live.map((p) => (
          <WorkCard key={p.slug} p={p} />
        ))}
      </div>
      {wip.length > 0 && (
        <>
          <h2 className="mt-16 mb-6 font-display text-2xl text-paper">In progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {wip.map((p) => (
              <WorkCard key={p.slug} p={p} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default function Work() {
  const featured = FEATURED.map((s) => allProjects.find((p) => p.slug === s))
  return (
    <section id="work" className="px-6 md:px-10 py-16 md:py-24 bg-inkdeep">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-medium text-paper">Selected work</h2>
            <a href="/work" className="inline-flex items-center gap-2 font-mono text-xs text-gold uppercase tracking-widebit hover:text-goldsoft transition-colors">
              view all work <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90} className="h-full">
              <WorkCard p={p} clamp />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

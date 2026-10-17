import { useRef, useState } from 'react'
import { Calendar, Download, Eye, Mail } from 'lucide-react'
import data from '../data/experience.json'

// Source of truth: src/data/experience.json (also used by scripts/build-cvs.py to build the CV PDFs).
const TABS = ['backend', 'fullstack', 'teaching']
const cvUrl = (k) => `/cv/Gideon-Amowogbaje-CV-${k.charAt(0).toUpperCase() + k.slice(1)}.pdf`

const shown = (e) => (e.highlight ? e.highlight.map((i) => e.points[i]) : e.points.slice(0, 3))

export default function Experience() {
  const [tab, setTab] = useState('backend')
  const refs = useRef({})
  const f = data.filters[tab]

  const entries = data.entries
    .filter((e) => e.tags.includes(tab))
    .sort((a, b) => (tab === 'teaching' ? (a.kind === 'teaching' ? -1 : 1) - (b.kind === 'teaching' ? -1 : 1) : 0))
    .sort((a, b) => (a.kind === b.kind ? 0 : tab === 'teaching' ? (a.kind === 'teaching' ? -1 : 1) : a.kind === 'software' ? -1 : 1))

  const onKey = (e) => {
    const i = TABS.indexOf(tab)
    const next = e.key === 'ArrowRight' ? (i + 1) % 3 : e.key === 'ArrowLeft' ? (i + 2) % 3 : null
    if (next === null) return
    e.preventDefault()
    setTab(TABS[next])
    refs.current[TABS[next]]?.focus()
  }

  return (
    <section id="experience" className="px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-8">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-paper">Experience</h2>
          <a
            href="/cv/Gideon-Amowogbaje-CV-Complete.pdf"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-gold uppercase tracking-widebit hover:text-goldsoft transition-colors"
          >
            complete CV ↗
          </a>
        </div>

        <div role="tablist" aria-label="Experience filter" onKeyDown={onKey} className="flex flex-wrap gap-2 mb-6">
          {TABS.map((k) => (
            <button
              key={k}
              ref={(el) => (refs.current[k] = el)}
              role="tab"
              id={`tab-${k}`}
              aria-selected={tab === k}
              aria-controls="exp-panel"
              tabIndex={tab === k ? 0 : -1}
              onClick={() => setTab(k)}
              className={`font-mono text-xs uppercase tracking-widebit px-4 py-2 rounded-full border transition-colors ${
                tab === k ? 'bg-gold text-ink border-gold' : 'text-paper/70 border-paper/15 hover:border-paper/40 hover:text-paper'
              }`}
            >
              {data.filters[k].label}
            </button>
          ))}
        </div>

        <div id="exp-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
          <p className="text-paper/70 leading-relaxed max-w-3xl mb-6">{f.profile}</p>
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={cvUrl(tab)}
              target="_blank"
              rel="noreferrer"
              data-umami-event="cv-view"
              data-umami-event-filter={tab}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit text-paper/80 px-4 py-2.5 rounded-full border border-paper/20 hover:border-paper/50 hover:text-paper transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> view {f.label} CV
            </a>
            <a
              href={cvUrl(tab)}
              download
              data-umami-event="cv-download"
              data-umami-event-filter={tab}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit text-paper/80 px-4 py-2.5 rounded-full border border-paper/20 hover:border-paper/50 hover:text-paper transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> download
            </a>
          </div>

          <ol className="space-y-5">
            {entries.map((r) => (
              <li key={r.id} className="border border-paper/10 rounded-2xl p-5 sm:p-7 bg-ink/60">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="font-display text-xl sm:text-2xl text-paper">
                    {r.company} <span className="text-paper/50 text-base">· {r.place}</span>
                  </h3>
                  <span className="font-mono text-xs text-slate">{r.dates}</span>
                </div>
                <p className="font-mono text-xs uppercase tracking-widebit text-sage mb-3">
                  {r.title}
                  {r.engagement ? <span className="text-slate normal-case tracking-normal"> · {r.engagement}</span> : null}
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-paper/70 leading-relaxed">
                  {shown(r).map((pt) => (
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
          <p className="mt-4 font-mono text-xs text-slate">Highlights shown. The {f.label} CV has the full detail.</p>
        </div>

        <div className="mt-14 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="font-display text-2xl text-paper">Like what you see?</h3>
            <p className="mt-2 text-paper/70 leading-relaxed">
              Hiring, or have a project that needs this experience? Let's talk — 30 minutes is enough to know if it's a fit.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://calendly.com/amowogbajegideon/30min" data-umami-event="book-call"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit bg-gold text-ink px-5 py-3 rounded-full hover:bg-goldsoft transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" /> book a call
            </a>
            <a
              href="/#contact"
              data-umami-event="send-brief-click"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit text-paper/80 px-5 py-3 rounded-full border border-paper/20 hover:border-paper/50 hover:text-paper transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> send a brief
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

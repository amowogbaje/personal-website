import { useEffect } from 'react'
import { ArrowLeft, Calendar, Mail } from 'lucide-react'
import { getCaseStudy } from '../data/caseStudies.js'

export default function CaseStudy({ slug }) {
  const c = getCaseStudy(slug)

  useEffect(() => {
    if (!c) return
    document.title = `${c.title} | Gideon Amowogbaje`
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.description)
  }, [c])

  if (!c) return null

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/80 border-b border-paper/10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/#work" className="inline-flex items-center gap-2 font-mono text-xs text-slate hover:text-paper transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            back to site
          </a>
          <span className="font-mono text-sm text-goldsoft tracking-tight">~/gideon/work</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widebit text-sage mb-4">{c.kind}</p>
        <h1 className="font-display text-3xl md:text-5xl font-medium leading-tight">{c.title}</h1>

        <dl className="mt-8 grid sm:grid-cols-3 gap-4 font-mono text-xs border-y border-paper/10 py-5">
          <div><dt className="text-slate">role</dt><dd className="mt-1 text-paper/80">{c.role}</dd></div>
          <div><dt className="text-slate">when</dt><dd className="mt-1 text-paper/80">{c.dates}</dd></div>
          <div><dt className="text-slate">stack</dt><dd className="mt-1 text-paper/80">{c.stack.join(' · ')}</dd></div>
        </dl>

        {c.sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="font-display text-2xl text-paper">{s.h}</h2>
            {s.p?.map((t) => (
              <p key={t} className="mt-3 text-paper/75 leading-relaxed">{t}</p>
            ))}
            {s.ul && (
              <ul className="mt-3 list-disc pl-5 space-y-2 text-paper/75 leading-relaxed">
                {s.ul.map((t) => <li key={t}>{t}</li>)}
              </ul>
            )}
          </section>
        ))}

        {c.link && (
          <p className="mt-8">
            <a href={c.link.href} target="_blank" rel="noreferrer" className="font-mono text-xs text-gold uppercase tracking-widebit hover:text-goldsoft">
              {c.link.label} ↗
            </a>
          </p>
        )}

        <div className="mt-14 flex flex-wrap gap-3">
          <a href="https://calendly.com/amowogbajegideon/30min" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit bg-gold text-ink px-5 py-3 rounded-full hover:bg-goldsoft transition-colors">
            <Calendar className="w-3.5 h-3.5" /> book a 30-min call
          </a>
          <a href="/#contact"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit text-paper/70 px-5 py-3 rounded-full border border-paper/15 hover:border-paper/40 hover:text-paper transition-colors">
            <Mail className="w-3.5 h-3.5" /> send a project brief
          </a>
        </div>
      </main>
    </div>
  )
}

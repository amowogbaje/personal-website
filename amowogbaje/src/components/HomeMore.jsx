import { ArrowRight } from 'lucide-react'
import posts from '../data/writing.json'
import Reveal from './Reveal.jsx'

const employers = ['Dayout (US)', 'Africred', 'KOC', 'Televerse', 'Thinkshifts (UK)']

export default function HomeMore() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date))[0]
  return (
    <section className="px-6 md:px-10 py-16 md:py-20 bg-ink">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
        <Reveal className="h-full">
          <a href="/experience" className="group block h-full border border-paper/10 rounded-2xl p-6 bg-inkdeep/60 hover:border-gold/40 transition-colors">
            <p className="font-mono text-xs uppercase tracking-widebit text-sage">Experience</p>
            <h2 className="mt-3 font-display text-2xl text-paper group-hover:text-gold transition-colors">8+ years, remote teams in the US, UK and Nigeria</h2>
            <ul className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] text-paper/70">
              {employers.map((e) => (
                <li key={e} className="border border-paper/15 rounded-full px-2.5 py-1">{e}</li>
              ))}
            </ul>
            <p className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit text-gold">
              view all experience and CVs <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </a>
        </Reveal>
        <Reveal delay={90} className="h-full">
          <a href={`/writing/${latest.slug}`} className="group block h-full border border-paper/10 rounded-2xl p-6 bg-inkdeep/60 hover:border-gold/40 transition-colors">
            <p className="font-mono text-xs uppercase tracking-widebit text-sage">Latest writing</p>
            <h2 className="mt-3 font-display text-2xl text-paper group-hover:text-gold transition-colors">{latest.title}</h2>
            <p className="mt-3 text-sm text-paper/65 leading-relaxed line-clamp-3">{latest.description}</p>
            <p className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit text-gold">
              read it, or view all writing <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </a>
        </Reveal>
      </div>
      <p className="max-w-6xl mx-auto mt-6 font-mono text-xs text-slate">
        Want the person behind the work? <a href="/about" className="text-gold hover:text-goldsoft">About me →</a>
      </p>
    </section>
  )
}

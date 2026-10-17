import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Domains from './Domains.jsx'
import { ABOUT_DESC } from './aboutMeta.js'

const how = [
  'I like owning a problem end to end, from the data model to the deployment.',
  'I communicate in writing, clearly, and I work comfortably with distributed teams across time zones.',
  'I describe my experience specifically and honestly, with no inflated claims.',
  'I value sustainable work that fits around family life.',
]
const openTo = [
  'Remote full-time or part-time roles with companies, including international teams',
  'Contract and freelance work: APIs, integrations, payments, admin tools, AI-assisted workflows',
  'Taking over, repairing and finishing stalled or inherited software projects',
  'Technical consulting and code review',
]

export default function About() {
  useEffect(() => {
    document.title = 'About | Gideon Amowogbaje'
    document.querySelector('meta[name="description"]')?.setAttribute('content', ABOUT_DESC)
  }, [])

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/80 border-b border-paper/10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 font-mono text-xs text-slate hover:text-paper transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> back to site
          </a>
          <span className="font-mono text-sm text-goldsoft tracking-tight">~/gideon/about</span>
        </div>
      </header>

      <main>
        <div className="px-6 md:px-10">
        <section className="max-w-4xl mx-auto pt-16 md:pt-24 grid md:grid-cols-[1fr_240px] gap-10 items-start">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-medium">About</h1>
            <p className="mt-6 text-paper/75 leading-relaxed">
              I'm Gideon, a backend-leaning full-stack developer based in Ile-Ife, Nigeria, with 8+ years across Laravel, Go and NestJS. I have worked with remote teams in the US, UK and Nigeria. I connect products to the CRMs, payment gateways and AI services they depend on, and I rescue stalled backends.
            </p>
            <p className="mt-4 text-paper/75 leading-relaxed">
              I also build and run my own products (Storyverse, Qset, CraftProfessor), and I teach Mathematics, Computer Science and Data Processing in schools.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://calendly.com/amowogbajegideon/30min" target="_blank" rel="noreferrer" data-umami-event="book-call"
                className="font-mono text-xs uppercase tracking-widebit bg-gold text-ink px-5 py-3 rounded-full hover:bg-goldsoft transition-colors">
                book a 30-min call
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" data-umami-event="cv-open"
                className="font-mono text-xs uppercase tracking-widebit text-paper/70 px-5 py-3 rounded-full border border-paper/15 hover:border-paper/40 hover:text-paper transition-colors">
                download CV
              </a>
              <a href="/experience"
                className="font-mono text-xs uppercase tracking-widebit text-paper/70 px-5 py-3 rounded-full border border-paper/15 hover:border-paper/40 hover:text-paper transition-colors">
                see my experience
              </a>
            </div>
          </div>
          <div className="aspect-square rounded-3xl overflow-hidden border border-paper/15 bg-inkdeep">
            <picture>
              <source srcSet="/profile.webp" type="image/webp" />
              <img src="/profile-fallback.jpg" alt="Gideon Amowogbaje" width="480" height="480" decoding="async" className="w-full h-full object-cover" />
            </picture>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mt-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl">How I work</h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-paper/75 leading-relaxed">
              {how.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl">What I'm open to</h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-paper/75 leading-relaxed">
              {openTo.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </section>
        </div>

        <Domains />
      </main>
    </div>
  )
}

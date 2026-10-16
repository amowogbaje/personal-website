import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Domains from './Domains.jsx'

import { ABOUT_DESC } from './aboutMeta.js'

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
        <section className="max-w-4xl mx-auto px-6 md:px-10 pt-16 md:pt-24">
          <h1 className="font-display text-4xl md:text-5xl font-medium">About</h1>
          <p className="mt-6 text-paper/75 leading-relaxed max-w-2xl">
            I'm a backend-leaning full-stack developer with 8+ years across Laravel, Go and NestJS, working with remote teams in the US, UK and Nigeria. I connect products to the CRMs, payment gateways and AI services they depend on, and I rescue stalled backends. I also build and run my own products, and I used to teach, which is why I explain technical trade-offs clearly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://calendly.com/amowogbajegideon/30min" target="_blank" rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widebit bg-gold text-ink px-5 py-3 rounded-full hover:bg-goldsoft transition-colors">
              book a 30-min call
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widebit text-paper/70 px-5 py-3 rounded-full border border-paper/15 hover:border-paper/40 hover:text-paper transition-colors">
              download CV
            </a>
          </div>
        </section>
        <Domains />
      </main>
    </div>
  )
}

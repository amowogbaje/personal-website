import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { WorkAll } from './Work.jsx'
import { WORK_DESC } from './workMeta.js'

export default function WorkPage() {
  useEffect(() => {
    document.title = 'Work | Gideon Amowogbaje'
    document.querySelector('meta[name="description"]')?.setAttribute('content', WORK_DESC)
  }, [])
  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/80 border-b border-paper/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 font-mono text-xs text-slate hover:text-paper transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> back to site
          </a>
          <span className="font-mono text-sm text-goldsoft tracking-tight">~/gideon/work</span>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl font-medium">Work</h1>
        <p className="mt-4 mb-12 text-paper/70 max-w-2xl leading-relaxed">
          Products I've built and run, plus work in progress. Case studies are linked where they exist.
        </p>
        <WorkAll />
        <div className="mt-16 pt-10 border-t border-paper/10 flex flex-wrap items-center gap-3">
          <a href="/resume.pdf" data-umami-event="cv-open" target="_blank" rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widebit border border-gold/40 text-gold rounded-full px-5 py-2.5 hover:bg-gold/10 transition-colors">
            Download CV ↓
          </a>
          <a href="/experience" className="font-mono text-xs uppercase tracking-widebit border border-paper/20 text-paper/80 rounded-full px-5 py-2.5 hover:border-paper/50 transition-colors">
            See my experience
          </a>
          <a href="https://www.linkedin.com/in/amowogbaje" target="_blank" rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widebit border border-paper/20 text-paper/80 rounded-full px-5 py-2.5 hover:border-paper/50 transition-colors">
            LinkedIn ↗
          </a>
        </div>
      </main>
    </div>
  )
}

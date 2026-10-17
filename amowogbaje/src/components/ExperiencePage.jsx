import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Experience from './Experience.jsx'

import { EXPERIENCE_DESC } from './experienceMeta.js'

export default function ExperiencePage() {
  useEffect(() => {
    document.title = 'Experience | Gideon Amowogbaje'
    document.querySelector('meta[name="description"]')?.setAttribute('content', EXPERIENCE_DESC)
  }, [])
  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/80 border-b border-paper/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 font-mono text-xs text-slate hover:text-paper transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> back to site
          </a>
          <span className="font-mono text-sm text-goldsoft tracking-tight">~/gideon/experience</span>
        </div>
      </header>
      <main><Experience /></main>
    </div>
  )
}

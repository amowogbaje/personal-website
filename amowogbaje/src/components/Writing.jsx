import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import ImageSlot from './ImageSlot.jsx'
import posts from '../data/writing.json'

export const WRITING_DESC =
  'Articles by Gideon Amowogbaje on AI workflows and backend engineering, drawn from production work.'

const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Writing() {
  useEffect(() => {
    document.title = 'Writing | Gideon Amowogbaje'
    document.querySelector('meta[name="description"]')?.setAttribute('content', WRITING_DESC)
  }, [])
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/80 border-b border-paper/10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 font-mono text-xs text-slate hover:text-paper transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> back to site
          </a>
          <span className="font-mono text-sm text-goldsoft tracking-tight">~/gideon/writing</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl font-medium">Writing</h1>
        <p className="mt-4 text-paper/70 leading-relaxed">On AI workflows and backend engineering, drawn from production work.</p>
        <ul className="mt-10 space-y-6">
          {sorted.map((p) => (
            <li key={p.slug} className="border border-paper/10 rounded-2xl overflow-hidden bg-ink/60">
              <ImageSlot src={`/images/writing/${p.slug}.webp`} alt="" className="w-full aspect-[16/7] object-cover" />
              <div className="p-6">
              <p className="font-mono text-xs text-slate">
                {fmt(p.date)} · {p.tags.join(' · ')}
              </p>
              <h2 className="mt-2 font-display text-2xl">
                <a href={`/writing/${p.slug}`} className="hover:text-goldsoft transition-colors">{p.title}</a>
              </h2>
              <p className="mt-2 text-paper/70 leading-relaxed">{p.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

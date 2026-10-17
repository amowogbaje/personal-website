import { useEffect } from 'react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { marked } from 'marked'
import posts from '../data/writing.json'

const files = import.meta.glob('../content/writing/*.md', { query: '?raw', import: 'default', eager: true })
export const getPost = (slug) => posts.find((p) => p.slug === slug)
const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Article({ slug }) {
  const post = getPost(slug)
  const md = files[`../content/writing/${slug}.md`] || ''
  const html = marked.parse(md, { gfm: true })
  const minutes = Math.max(1, Math.round(md.split(/\s+/).length / 220))

  useEffect(() => {
    if (!post) return
    document.title = `${post.title} | Gideon Amowogbaje`
    document.querySelector('meta[name="description"]')?.setAttribute('content', post.description)
  }, [post])

  if (!post) return null
  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/80 border-b border-paper/10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/writing" className="inline-flex items-center gap-2 font-mono text-xs text-slate hover:text-paper transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> all writing
          </a>
          <span className="font-mono text-sm text-goldsoft tracking-tight">~/gideon/writing</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="font-mono text-xs text-slate">
          {fmt(post.date)} · {minutes} min read · {post.tags.join(' · ')}
        </p>
        <h1 className="mt-3 font-display text-3xl md:text-5xl font-medium leading-tight">{post.title}</h1>
        {post.related && (
          <p className="mt-4">
            <a href={post.related.href} className="font-mono text-xs text-gold uppercase tracking-widebit hover:text-goldsoft">
              see the real project: {post.related.label} →
            </a>
          </p>
        )}
        <article className="article mt-10" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-14 rounded-2xl border border-gold/30 bg-gold/5 p-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-paper/80 max-w-md leading-relaxed">Building something with AI workflows or a Laravel backend? Let's talk.</p>
          <a href="https://calendly.com/amowogbajegideon/30min" target="_blank" rel="noreferrer" data-umami-event="book-call"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit bg-gold text-ink px-5 py-3 rounded-full hover:bg-goldsoft transition-colors">
            <Calendar className="w-3.5 h-3.5" /> book a 30-min call
          </a>
        </div>
      </main>
    </div>
  )
}

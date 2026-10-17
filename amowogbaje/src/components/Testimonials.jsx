import { testimonials } from '../data/testimonials.js'

export default function Testimonials() {
  if (!testimonials.length) return null
  return (
    <section id="testimonials" className="px-6 md:px-10 py-16 md:py-24 bg-inkdeep">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-medium text-paper mb-8">What people say</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="border border-paper/10 rounded-2xl p-6 bg-ink/60">
              <blockquote className="font-display text-xl sm:text-2xl text-paper leading-snug">“{t.quote}”</blockquote>
              <figcaption className="mt-4 font-mono text-xs uppercase tracking-widebit text-sage">
                {t.name}
                {t.role ? <span className="text-slate"> · {t.role}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

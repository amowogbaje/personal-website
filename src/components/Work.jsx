const projects = [
  {
    status: 'shipped',
    statusColor: 'bg-sage/15 text-sage border-sage/30',
    title: 'Project name here',
    stack: ['Laravel', 'Livewire', 'MySQL'],
    summary:
      'One or two sentences on the problem this solved and the part you owned — replace with a real case study when ready.',
    pr: '#01',
  },
  {
    status: 'in review',
    statusColor: 'bg-goldsoft/15 text-goldsoft border-goldsoft/30',
    title: 'Project name here',
    stack: ['NestJS', 'PostgreSQL', 'Redis'],
    summary:
      'Describe the system design decision you are proudest of on this one. Swap this card for a real screenshot + link.',
    pr: '#02',
  },
  {
    status: 'shipped',
    statusColor: 'bg-sage/15 text-sage border-sage/30',
    title: 'Project name here',
    stack: ['Next.js', 'Vue', 'Tailwind'],
    summary:
      'A short note on scale, users, or constraints. This is a placeholder slot — drop in your strongest work first.',
    pr: '#03',
  },
  {
    status: 'draft',
    statusColor: 'bg-paper/10 text-paper/50 border-paper/20',
    title: 'Project name here',
    stack: ['NestJS', 'Docker', 'CI/CD'],
    summary:
      'Reserve this slot for something still in progress, or remove it if four feels like too many.',
    pr: '#04',
  },
]

export default function Work() {
  return (
    <section id="work" className="px-6 md:px-10 py-28 md:py-36 bg-inkdeep">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-paper">
            Work
          </h2>
          <p className="font-mono text-xs text-slate uppercase tracking-widebit">
            4 pull requests · open to review
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <article
              key={p.pr}
              className="group border border-paper/10 rounded-2xl p-7 hover:border-gold/40 transition-colors bg-ink/60"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-slate">{p.pr}</span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-widebit border rounded-full px-2.5 py-1 ${p.statusColor}`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="font-display text-2xl text-paper mb-3 group-hover:text-gold transition-colors">
                {p.title}
              </h3>

              <p className="text-paper/65 leading-relaxed mb-5">{p.summary}</p>

              <ul className="flex flex-wrap gap-2 font-mono text-[11px] text-sage">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="border border-sage/25 rounded-full px-2.5 py-1"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-10 font-mono text-xs text-slate">
          // replace these four cards with real projects, screenshots, and links whenever you're ready
        </p>
      </div>
    </section>
  )
}

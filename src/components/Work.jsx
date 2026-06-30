const projects = [
  {
    "status": "shipped",
    "statusColor": "bg-sage/15 text-sage border-sage/30",
    "title": "Qset",
    "href": "https://qset.amowogbaje.com",
    "linkLabel": "qset.amowogbaje.com",
    "stack": ["Laravel", "Reactjs", "MySQL", "TailwindCSS"],
    "summary": "A platform for teachers to generate exams in minutes. Users can search a question bank, select questions, add them to new or existing exam sets, review and reorder, then export to Word (docx)",
    "pr": "#01"
  },
  {
    "status": "shipped",
    "statusColor": "bg-sage/15 text-sage border-sage/30",
    "title": "Tax",
    "href": "https://tax.amowogbaje.com",
    "linkLabel": "tax.amowogbaje.com",
    "stack": ["Laravel", "Reactjs", "MySQL", "TailwindCSS"],
    "summary": "Live personal income tax calculator for Nigeria (NGN). Users input annual income, rent, and optional deductions (pension, health, life insurance) to estimate tax liability.",
    "pr": "#02"
  },
  {
    "status": "draft",
    "statusColor": "bg-paper/10 text-paper/50 border-paper/20",
    "title": "AI Video Generator",
    "href": "https://github.com/amowogbaje/aivideogenerator",
    "linkLabel": "github.com/amowogbaje/aivideogenerator",
    "stack": ["FastApi", "AI/ML"],
    "summary": "In-progress AI video generation tool built with FastAPI and ML. Actively developed with recent commits on story text and prompt features.",
    "pr": "#03"
  }
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
            3 pull requests · open to review
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

              <div className="flex flex-wrap items-center justify-between gap-4">
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

                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] text-gold hover:text-goldsoft transition-colors whitespace-nowrap"
                  >
                    {p.linkLabel} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

<div className="mt-14 pt-10 border-t border-paper/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-xs text-slate uppercase tracking-widebit">
            Want the full picture?
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widebit border border-gold/40 text-gold rounded-full px-5 py-2.5 hover:bg-gold/10 hover:border-gold transition-colors"
            >
              Download résumé ↓
            </a>
            <a
              href="https://www.linkedin.com/in/amowogbaje"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widebit border border-paper/20 text-paper/80 rounded-full px-5 py-2.5 hover:border-sage/40 hover:text-sage transition-colors"
            >
              LinkedIn profile ↗
            </a>
          </div>
        </div>
        
      </div>
    </section>
  )
}

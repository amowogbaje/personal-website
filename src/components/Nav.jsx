const links = [
  { href: '#work', label: 'work' },
  { href: '#domains', label: 'domains' },
  { href: '#contact', label: 'contact' },
]

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/70 border-b border-paper/10">
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm text-goldsoft tracking-tight hover:text-gold transition-colors"
        >
          ~/gideon
        </a>
        <ul className="hidden sm:flex items-center gap-8 font-mono text-xs uppercase tracking-widebit text-slate">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-paper transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="font-mono text-xs uppercase tracking-widebit border border-gold/40 text-gold px-3 py-1.5 rounded-full hover:bg-gold hover:text-ink transition-colors"
        >
          say hi
        </a>
      </nav>
    </header>
  )
}

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 bg-ink border-t border-paper/10">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate">
        <div className="flex items-center gap-3">
          <img
            src="/logo-mark-light.svg"
            alt="amowogbaje logo"
            width="28"
            height="28"
            loading="lazy"
            className="h-7 w-7 object-contain opacity-70"
          />
          <span>© {new Date().getFullYear()} Gideon Amowogbaje</span>
        </div>
        <a href="/support" className="hover:text-gold transition-colors">
          support the apps on this server
        </a>
        <span>built with React, Tailwind, and a little faith</span>
      </div>
    </footer>
  )
}

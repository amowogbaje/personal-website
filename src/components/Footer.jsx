export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 bg-ink border-t border-paper/10">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate">
        <span>© {new Date().getFullYear()} Gideon Amowogbaje</span>
        <span>built with React, Tailwind, and a little faith</span>
      </div>
    </footer>
  )
}

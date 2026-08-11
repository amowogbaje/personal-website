import { useEffect } from 'react'
import {
  Plug, Sparkles, LayoutDashboard, ShoppingCart, Layers, Wrench,
  ArrowLeft, Bug, GitBranch, Database, ShieldCheck, Boxes, Server, FlaskConical, ClipboardCheck,
  Mail, Calendar,
} from 'lucide-react'

const featured = [
  {
    icon: Plug,
    title: 'API & CRM Integrations',
    summary: 'I connect your app to the tools it already runs on — CRMs, WooCommerce, Facebook Lead Ads, payment gateways — with reliable webhooks and clean data sync.',
    proof: 'Built the CRM/webhook integration layer at Africred, including automated Facebook access-token refresh.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Automation',
    summary: 'I wire AI into real products: automated content pipelines, AI-assisted search, and LLM-powered workflows that plug into your existing stack.',
    proof: 'Built the AI publishing pipeline behind CraftProfessor — Vertex AI generating and syncing content automatically.',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Panels & Internal Tools',
    summary: 'Filament and Nova dashboards that give your team full control over data — CRUD, reporting, permissions — without touching the database.',
    proof: 'Shipped Filament admin panels and Laravel Nova dashboards for internal and ministry operations.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce & WooCommerce',
    summary: 'WooCommerce sync, custom storefronts, and Laravel-powered e-commerce backends that handle real transactions reliably.',
    proof: 'Integrated WooCommerce syncing into a live production app at KOC.',
  },
  {
    icon: Layers,
    title: 'SaaS & Full-Stack Builds',
    summary: 'End-to-end web apps — Laravel, FastAPI, or Go on the backend, React, Vue, or Next.js up front — taken from Figma to production.',
    proof: 'Shipped Qset, Storyverse, and the Tax Calculator: live, full-stack, end to end.',
  },
  {
    icon: Wrench,
    title: 'Legacy Rescue & Troubleshooting',
    summary: 'Inherited a stalled, broken, or half-finished app? I step in, diagnose fast, and get it shipped.',
    proof: 'Took over a stalled project at KOC and shipped a board-ready product from a bare Figma file, under deadline.',
  },
]

const more = [
  { icon: Bug, title: 'Laravel/PHP Bug Fixing & Production Troubleshooting' },
  { icon: GitBranch, title: 'WordPress → Laravel Migration' },
  { icon: Database, title: 'Database Design & Query Optimization' },
  { icon: ShieldCheck, title: 'Role-Based Auth & Permission Systems' },
  { icon: Boxes, title: 'Docker, CI/CD & Deployment Setup' },
  { icon: Server, title: 'Server Management (Nginx, DigitalOcean, VPS)' },
  { icon: FlaskConical, title: 'Automated Testing Setup (PHPUnit / Pest)' },
  { icon: ClipboardCheck, title: 'Technical Consulting & Code Review' },
]

export default function Services() {
  useEffect(() => {
    document.title = 'Services — Laravel, API, E-Commerce & AI Integrations | Gideon Amowogbaje'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute(
      'content',
      'API integrations, CRM automation, WooCommerce, AI-powered automation, admin panels, and full-stack Laravel/FastAPI/Go builds — hire Gideon Amowogbaje for remote contract work.'
    )
  }, [])

  return (
    <div className="min-h-screen bg-ink">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/80 border-b border-paper/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-slate hover:text-paper transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            back to site
          </a>
          <span className="font-mono text-sm text-goldsoft tracking-tight">
            ~/gideon/services
          </span>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-widebit border border-gold/40 text-gold px-3 py-1.5 rounded-full hover:bg-gold hover:text-ink transition-colors"
          >
            say hi
          </a>
        </div>
      </header>

      <main className="grain px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widebit text-rust mb-4">
            $ cat services.md
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-medium text-paper leading-[1.05] mb-6 max-w-3xl">
            Tell me what you need built —{' '}
            <span className="text-gold">not what tech stack it needs.</span>
          </h1>
          <p className="text-paper/75 text-lg leading-relaxed max-w-2xl mb-16">
            I've spent 8+ years shipping Laravel, FastAPI, and Go systems for
            real businesses — CRMs, e-commerce, admin tools, AI pipelines. Below
            is the full list of what I take on, grouped by how I can help.
          </p>

          {/* Featured 6 */}
          <div className="mb-20">
            <h2 className="font-display text-2xl md:text-3xl text-paper mb-8">
              Core services
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((s) => (
                <article
                  key={s.title}
                  className="border border-paper/10 rounded-2xl p-7 bg-inkdeep/60 hover:border-gold/40 transition-colors"
                >
                  <div className="p-3 rounded-xl bg-paper/5 text-gold w-fit mb-5">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl text-paper mb-3">{s.title}</h3>
                  <p className="text-paper/65 leading-relaxed mb-4">{s.summary}</p>
                  <p className="font-mono text-xs text-sage border-l-2 border-sage/30 pl-3">
                    {s.proof}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* More services */}
          <div className="mb-20">
            <h2 className="font-display text-2xl md:text-3xl text-paper mb-3">
              More ways to work together
            </h2>
            <p className="text-paper/60 leading-relaxed mb-8 max-w-2xl">
              Smaller, clearly scoped jobs — good fits if you already know
              exactly what's broken or what's missing.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {more.map((s) => (
                <div
                  key={s.title}
                  className="flex items-center gap-4 p-5 rounded-xl border border-paper/10 bg-ink/70 hover:border-gold/30 transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-paper/5 text-sage shrink-0">
                    <s.icon className="w-4.5 h-4.5" />
                  </div>
                  <p className="text-paper/85 text-sm font-medium leading-snug">{s.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div id="contact" className="rounded-2xl border border-gold/30 bg-gold/5 p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl md:text-3xl text-paper mb-3">
              Not sure which of these fits?
            </h2>
            <p className="text-paper/70 max-w-xl mx-auto leading-relaxed mb-8">
              Describe the problem, not the solution — I'll tell you honestly
              whether I'm the right fit and how I'd approach it.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:amowogbajegideon@gmail.com"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit bg-gold text-inkdeep font-medium rounded-full px-6 py-3 hover:bg-goldsoft transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email me
              </a>
              <a
                href="https://calendly.com/amowogbajegideon/30min"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit border border-paper/20 text-paper/80 rounded-full px-6 py-3 hover:border-gold/40 hover:text-gold transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book a call
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

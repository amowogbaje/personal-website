import { Plug, Sparkles, LayoutDashboard, ShoppingCart, Layers, Wrench, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Plug,
    title: 'API & CRM Integrations',
    summary: 'I connect your app to the tools it already runs on — CRMs, WooCommerce, Facebook Lead Ads, payment gateways — with reliable webhooks and clean data sync.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Automation',
    summary: 'I wire AI into real products: automated content pipelines, AI-assisted search, and LLM-powered workflows that plug into your existing stack.',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Panels & Internal Tools',
    summary: 'Filament and Nova dashboards that give your team full control over data — CRUD, reporting, permissions — without touching the database.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce & WooCommerce',
    summary: 'WooCommerce sync, custom storefronts, and Laravel-powered e-commerce backends that handle real transactions reliably.',
  },
  {
    icon: Layers,
    title: 'SaaS & Full-Stack Builds',
    summary: 'End-to-end web apps — Laravel, FastAPI, or Go on the backend, React, Vue, or Next.js up front — taken from Figma to production.',
  },
  {
    icon: Wrench,
    title: 'Legacy Rescue & Troubleshooting',
    summary: 'Inherited a stalled, broken, or half-finished app? I step in, diagnose fast, and get it shipped.',
  },
]

export default function ServicesTeaser() {
  return (
    <section id="services" className="px-6 md:px-10 py-28 md:py-36 bg-ink">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-4">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-paper">
            Services
          </h2>
          <p className="font-mono text-xs text-slate uppercase tracking-widebit">
            6 ways to put me to work
          </p>
        </div>
        <p className="text-paper/65 max-w-xl leading-relaxed mb-14">
          Tell me the outcome you need — not the tech stack — and I'll figure out how to get you there.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <a
              key={s.title}
              href="/services"
              className="group border border-paper/10 rounded-2xl p-7 hover:border-gold/40 transition-colors bg-inkdeep/60 flex flex-col"
            >
              <div className="p-3 rounded-xl bg-paper/5 text-gold w-fit mb-5 group-hover:bg-gold/10 transition-colors">
                <s.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl text-paper mb-3 group-hover:text-gold transition-colors">
                {s.title}
              </h3>
              <p className="text-paper/60 text-sm leading-relaxed">{s.summary}</p>
            </a>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-paper/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-xs text-slate uppercase tracking-widebit">
            10+ services, all outcome-based
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/services"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widebit bg-gold text-inkdeep font-medium rounded-full px-5 py-2.5 hover:bg-goldsoft transition-colors"
            >
              See all services <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#contact"
              className="font-mono text-xs uppercase tracking-widebit border border-paper/20 text-paper/80 rounded-full px-5 py-2.5 hover:border-gold/40 hover:text-gold transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

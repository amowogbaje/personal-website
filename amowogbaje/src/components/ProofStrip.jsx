const proofs = [
  { stat: '115K+', text: 'monthly Pinterest views on one account, from an AI content pipeline I built', href: '/work/craftprofessor-story-engine', tag: 'CraftProfessor' },
  { stat: '3 gateways', text: 'Stripe, Paystack and Flutterwave in one product, with per-country pricing', href: '/work/storyverse-payments', tag: 'Storyverse' },
  { stat: 'Laravel → Go', text: 'core backend services rewritten in a live US team', href: '/work/dayout-laravel-to-go-migration', tag: 'Dayout' },
  { stat: 'Live CRM', text: 'Facebook leads flowing into production, with tokens refreshed automatically', href: '/work/africred-crm-integrations', tag: 'Africred' },
]

export default function ProofStrip() {
  return (
    <section aria-label="Selected results" className="px-6 md:px-10 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {proofs.map((p) => (
          <a key={p.tag} href={p.href}
            className="group block border border-paper/10 rounded-2xl p-5 bg-ink/60 hover:border-gold/50 transition-colors">
            <p className="font-display text-2xl text-gold">{p.stat}</p>
            <p className="mt-2 text-sm text-paper/70 leading-relaxed">{p.text}</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widebit text-sage group-hover:text-paper transition-colors">
              {p.tag} · case study →
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}

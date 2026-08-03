import { Mail, Phone, Handshake, ArrowLeft, Heart } from 'lucide-react'

// --- Update the goal if the bill changes. Raised is computed automatically. ---
const GOAL = 87.76
// ------------------------------------------------------

// --- Add a line here each time someone contributes. Newest first. ---
// name: what to show (use "Anonymous" if they'd rather not be named)
// amount: leave null to hide the amount and just show a message (won't count toward total)
// note: optional short message from them
const SUPPORTERS = [
  { name: 'Tochukwu C ', amount: 6.95, note: 'Rooting for Qset 🚀' },
  // { name: 'Tunde A.', amount: 10, note: null },
]
// ------------------------------------------------------

const RAISED = SUPPORTERS.reduce((sum, s) => sum + (s.amount ?? 0), 0)
const progressPct = Math.min(100, Math.round((RAISED / GOAL) * 100))

export default function FundMe() {
  return (
    <div className="min-h-screen bg-ink">
      {/* Minimal top bar — this page stands alone, no anchor nav to fight with */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/80 border-b border-paper/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-slate hover:text-paper transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            back to site
          </a>
          <span className="font-mono text-sm text-goldsoft tracking-tight">
            ~/gideon/fundme
          </span>
        </div>
      </header>

      <main className="grain px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widebit text-rust mb-4">
            $ ./keep-it-running.sh
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-medium text-paper leading-[1.05] mb-6">
            Help me keep the lights on —{' '}
            <span className="text-gold">hosting is due, funds aren't.</span>
          </h1>
          <p className="text-paper/75 text-lg leading-relaxed max-w-2xl mb-12">
            My hosting (cPanel) renewal is coming due and I don't have it
            covered right now. I'm a backend developer building projects I
            genuinely believe in — a few are already live, more are in
            progress — and I'd rather ask honestly for help than let any of
            it lapse. If you can spare something, it goes straight to keeping
            the servers on. If you'd rather structure it as an interest-free
            loan, I'm completely open to that — reach out and we can work out
            a repayment plan that's fair for both of us.
          </p>

          {/* Progress */}
          <div className="rounded-2xl border border-paper/10 bg-inkdeep/60 p-6 md:p-8 mb-12">
            <div className="flex items-baseline justify-between mb-3 font-mono text-sm">
              <span className="text-paper">
                ${RAISED.toFixed(2)}{' '}
                <span className="text-slate">raised of</span> ${GOAL.toFixed(2)}
              </span>
              <span className="text-slate">{progressPct}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-paper/10 overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="mt-4 text-xs font-mono text-slate">
              goal reflects the actual renewal cost below — raised total is
              computed from the supporters list, no need to update by hand
            </p>
          </div>

          {/* Supporters feed */}
          <div className="mb-14">
            <h2 className="font-display text-2xl text-paper mb-5">
              {SUPPORTERS.length > 0
                ? `${SUPPORTERS.length} ${SUPPORTERS.length === 1 ? 'person has' : 'people have'} chipped in`
                : 'Be the first to chip in'}
            </h2>

            {SUPPORTERS.length > 0 ? (
              <ul className="space-y-3">
                {SUPPORTERS.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl border border-paper/10 bg-ink/70"
                  >
                    <Heart className="w-4 h-4 text-rust mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-mono text-sm text-paper/90">
                        {s.name}
                        {s.amount != null && (
                          <span className="text-gold"> · ${s.amount}</span>
                        )}
                      </p>
                      {s.note && (
                        <p className="text-paper/60 text-sm leading-relaxed mt-1">
                          "{s.note}"
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-paper/50 font-mono text-sm p-4 rounded-xl border border-dashed border-paper/15">
                No one yet — this list updates by hand as support comes in.
                Your name (or "Anonymous") could be first.
              </p>
            )}
          </div>

          {/* Proof / receipt */}
          <div className="mb-14">
            <h2 className="font-display text-2xl text-paper mb-4">
              The actual bill
            </h2>
            <p className="text-paper/65 leading-relaxed mb-5 max-w-2xl">
              No vague ask — here's the real cart total from my hosting
              account, so you can see exactly what this covers.
            </p>
            <div className="rounded-2xl border border-paper/10 overflow-hidden bg-inkdeep/40">
              {/* Drop the cart screenshot in /public/cart-screenshot.png and this will render it */}
              <img
                src="/cart-screenshot.png"
                alt="Namecheap cart showing renewal total of $87.76"
                className="w-full h-auto block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling.style.display = 'flex'
                }}
              />
              <div className="hidden flex-col items-center justify-center gap-2 py-16 text-slate">
                <span className="font-mono text-[11px] uppercase tracking-widebit">
                  public/cart-screenshot.png
                </span>
                <span className="font-mono text-[10px] text-slate/70">
                  drop the receipt image here
                </span>
              </div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="mb-14">
            <h2 className="font-display text-2xl text-paper mb-5">
              Chip in
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://flutterwave.com/pay/e1xca0l9okpl"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center font-mono text-xs uppercase tracking-widebit bg-gold text-inkdeep font-medium px-6 py-4 rounded-xl hover:bg-goldsoft transition-colors"
              >
                Chip In · USD
              </a>
              <a
                href="https://flutterwave.com/pay/uogxz2iymv69"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center font-mono text-xs uppercase tracking-widebit border border-gold/40 text-gold px-6 py-4 rounded-xl hover:bg-gold/10 transition-colors"
              >
                Chip In · NGN
              </a>
            </div>
          </div>

          {/* Bank transfer */}
          <div className="mb-14">
            <h2 className="font-display text-2xl text-paper mb-2">
              Prefer a direct bank transfer?
            </h2>
            <p className="text-paper/65 leading-relaxed mb-5 max-w-2xl">
              This is my account for receiving funds — details below are only
              enough to send money in, not to take any out.
            </p>
            <div className="rounded-2xl border border-paper/10 bg-ink/70 p-6 grid sm:grid-cols-2 gap-x-8 gap-y-4 font-mono text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-widebit text-paper/40 mb-1">
                  Account holder
                </p>
                <p className="text-paper/90">Gideon Ifedayo Amowogbaje</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widebit text-paper/40 mb-1">
                  Account number
                </p>
                <p className="text-paper/90">210681022415</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widebit text-paper/40 mb-1">
                  Bank
                </p>
                <p className="text-paper/90">Lead Bank</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widebit text-paper/40 mb-1">
                  Bank address
                </p>
                <p className="text-paper/90">1801 Main St., Kansas City, MO 64108</p>
              </div>
            </div>
          </div>

          {/* Other ways to help */}
          <div className="mb-14">
            <h2 className="font-display text-2xl text-paper mb-5">
              Not able to send money? There's more than one way to help
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-paper/10 bg-ink/70">
                <div className="flex items-center gap-3 mb-2 text-sage">
                  <Handshake className="w-5 h-5" />
                  <p className="font-mono text-xs uppercase tracking-widebit">
                    Trade for a service
                  </p>
                </div>
                <p className="text-paper/65 text-sm leading-relaxed">
                  Need backend work, a Laravel/NestJS build, or a small
                  project shipped? I'll gladly trade work for help — reach
                  out and let's talk scope.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-paper/10 bg-ink/70">
                <div className="flex items-center gap-3 mb-2 text-sage">
                  <Handshake className="w-5 h-5" />
                  <p className="font-mono text-xs uppercase tracking-widebit">
                    Share this page
                  </p>
                </div>
                <p className="text-paper/65 text-sm leading-relaxed">
                  If you can't give, passing this along to someone who might
                  is just as valuable.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-16">
            <h2 className="font-display text-2xl text-paper mb-5">
              Talk to me directly
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+2347026305945"
                className="flex items-center gap-3 p-4 rounded-xl border border-paper/10 bg-ink/70 hover:border-gold/50 transition-colors flex-1"
              >
                <Phone className="w-5 h-5 text-gold" />
                <span className="text-paper/90 font-mono text-sm">
                  +234 702 630 5945
                </span>
              </a>
              <a
                href="https://wa.me/+2347026305945"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-paper/10 bg-ink/70 hover:border-gold/50 transition-colors flex-1"
              >
                <svg className="w-5 h-5 fill-current text-gold" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.755.002-2.61-1.01-5.063-2.85-6.905C16.587 2.1 14.134.92 11.53.918c-5.437 0-9.863 4.371-9.865 9.756-.001 1.773.49 3.5 1.42 5.04l-1.011 3.693 3.797-.983zm11.215-6.04c-.305-.153-1.805-.89-2.083-.992-.278-.102-.48-.153-.68.153-.2.305-.774.992-.95 1.193-.175.203-.35.229-.655.077-.305-.153-1.29-.475-2.456-1.517-.908-.81-1.52-1.812-1.698-2.118-.178-.306-.019-.471.134-.622.137-.137.305-.356.458-.534.153-.177.203-.305.305-.51.102-.203.05-.381-.025-.533-.076-.153-.68-1.642-.932-2.248-.246-.59-.497-.51-.68-.52-.176-.01-.377-.01-.578-.01-.201 0-.528.076-.804.381-.276.305-1.056 1.033-1.056 2.518s1.08 2.982 1.23 3.186c.153.204 2.127 3.249 5.153 4.556.72.311 1.282.497 1.72.637.724.23 1.382.197 1.902.12.58-.087 1.805-.738 2.057-1.453.253-.715.253-1.326.177-1.453-.076-.127-.278-.203-.583-.356z" />
                </svg>
                <span className="text-paper/90 font-mono text-sm">
                  WhatsApp chat
                </span>
              </a>
              <a
                href="mailto:amowogbajegideon@gmail.com"
                className="flex items-center gap-3 p-4 rounded-xl border border-paper/10 bg-ink/70 hover:border-gold/50 transition-colors flex-1"
              >
                <Mail className="w-5 h-5 text-gold" />
                <span className="text-paper/90 font-mono text-sm break-all">
                  Email
                </span>
              </a>
            </div>
          </div>

          <p className="font-mono text-xs text-slate border-t border-paper/10 pt-8">
            Once the goal is reached, this page comes down and I'll be
            reaching out personally to thank everyone who helped. Thank you
            for even reading this far.
          </p>
        </div>
      </main>
    </div>
  )
}

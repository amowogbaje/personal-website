import { Mail, Phone, Handshake, ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'

export default function Support() {
  useEffect(() => {
    document.title = 'Support — Gideon Amowogbaje'
  }, [])

  return (
    <div className="min-h-screen bg-ink">
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
            ~/gideon/support
          </span>
        </div>
      </header>

      <main className="grain px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widebit text-sage mb-4">
            $ ./say-thanks.sh
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-medium text-paper leading-[1.05] mb-6">
            If any of my projects have been useful to you,{' '}
            <span className="text-gold">this is where you say so.</span>
          </h1>
          <p className="text-paper/75 text-lg leading-relaxed max-w-2xl mb-14">
            I build and host Storyverse, Qset, the Nigeria Tax Calculator, and
            CraftProfessor because I enjoy building them. None of this page is
            an ask — but if one of these apps has ever been useful to you and
            you feel like sending something small my way, it's genuinely
            appreciated and never expected.
          </p>

          {/* Ways to give */}
          <div className="mb-14">
            <h2 className="font-display text-2xl text-paper mb-5">
              A small gesture
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://flutterwave.com/pay/e1xca0l9okpl"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center font-mono text-xs uppercase tracking-widebit bg-gold text-inkdeep font-medium px-6 py-4 rounded-xl hover:bg-goldsoft transition-colors"
              >
                Send a Tip · USD
              </a>
              <a
                href="https://flutterwave.com/pay/uogxz2iymv69"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center font-mono text-xs uppercase tracking-widebit border border-gold/40 text-gold px-6 py-4 rounded-xl hover:bg-gold/10 transition-colors"
              >
                Send a Tip · NGN
              </a>
            </div>
          </div>

          {/* Bank transfer, kept low-key */}
          <div className="mb-14">
            <h2 className="font-display text-2xl text-paper mb-2">
              Prefer a direct transfer?
            </h2>
            <p className="text-paper/65 leading-relaxed mb-5 max-w-2xl">
              Totally fine — here's the account, no pressure either way.
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

          {/* Non-monetary ways */}
          <div className="mb-14">
            <h2 className="font-display text-2xl text-paper mb-5">
              Money isn't the only way
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-paper/10 bg-ink/70">
                <div className="flex items-center gap-3 mb-2 text-sage">
                  <Handshake className="w-5 h-5" />
                  <p className="font-mono text-xs uppercase tracking-widebit">
                    Tell a friend
                  </p>
                </div>
                <p className="text-paper/65 text-sm leading-relaxed">
                  If Storyverse or Qset would be useful to someone you know,
                  passing it along means just as much.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-paper/10 bg-ink/70">
                <div className="flex items-center gap-3 mb-2 text-sage">
                  <Handshake className="w-5 h-5" />
                  <p className="font-mono text-xs uppercase tracking-widebit">
                    Just say hi
                  </p>
                </div>
                <p className="text-paper/65 text-sm leading-relaxed">
                  Hearing that something I built was useful to you is its own
                  kind of thanks. Feel free to just reach out.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-16">
            <h2 className="font-display text-2xl text-paper mb-5">
              Say hi
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
            Thank you either way — for building with me, using something I
            made, or just stopping by.
          </p>
        </div>
      </main>
    </div>
  )
}

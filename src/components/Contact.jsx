const socials = [
  { label: 'whatsapp', href: 'https://wa.me/+2347026305945' },
  { label: 'telegram', href: 'https://t.me/amowogbaje' },
  { label: 'github', href: 'https://github.com/amowogbaje' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/amowogbaje' },
  { label: 'twitter', href: 'https://twitter.com/amowogbaje' },
  { label: 'instagram', href: 'https://www.instagram.com/amowogbaje/' },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="grain px-6 md:px-10 py-28 md:py-36 bg-inkdeep"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-medium text-paper mb-4">
          Contact
        </h2>
        <p className="text-paper/65 max-w-xl leading-relaxed mb-12">
          Open to backend roles, freelance builds, and conversations about
          any of the branches above.
        </p>

        <div className="rounded-2xl border border-paper/10 bg-ink/70 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-paper/10">
            <span className="w-2.5 h-2.5 rounded-full bg-rust/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-goldsoft/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-sage/70" />
            <span className="ml-3 font-mono text-xs text-slate">
              contact.sh
            </span>
          </div>

          <div className="p-6 md:p-8 font-mono text-sm space-y-4">
            <p>
              <span className="text-sage">$</span>{' '}
              <span className="text-paper/80">echo $EMAIL</span>
              <br />
              <a
                href="mailto:amowogbajegideon@gmail.com"
                className="text-gold hover:text-goldsoft transition-colors"
              >
                amowogbajegideon@gmail.com
              </a>
            </p>
            <p>
              <span className="text-sage">$</span>{' '}
              <span className="text-paper/80">echo $PHONE</span>
              <br />
              <a
                href="tel:+2347026305945"
                className="text-gold hover:text-goldsoft transition-colors"
              >
                +234 702 630 5945
              </a>
            </p>
            <p>
              <span className="text-sage">$</span>{' '}
              <span className="text-paper/80">calendly --book</span>
              <br />
              <a
                href="https://calendly.com/amowogbajegideon"
                className="text-gold hover:text-goldsoft transition-colors"
              >
                calendly.com/amowogbajegideon
              </a>
            </p>
            <p>
              <span className="text-sage">$</span>{' '}
              <span className="text-paper/80">ls ./socials</span>
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 pl-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-paper/70 hover:text-gold transition-colors"
                  >
                    ./{s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

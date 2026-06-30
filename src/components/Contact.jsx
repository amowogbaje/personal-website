import { Mail, Phone, Calendar } from 'lucide-react'

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
          Open to backend roles, freelance builds, and conversations about any project. Let's build something together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct Communication Channels */}
          <div className="space-y-4">
            <a 
              href="mailto:amowogbajegideon@gmail.com"
              className="flex items-center gap-4 p-5 rounded-2xl border border-paper/10 bg-ink/70 hover:border-gold/50 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-paper/5 text-gold group-hover:bg-gold/10 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-paper/40">Email Me</p>
                <p className="text-paper/90 font-medium break-all">amowogbajegideon@gmail.com</p>
              </div>
            </a>

            <a 
              href="tel:+2347026305945"
              className="flex items-center gap-4 p-5 rounded-2xl border border-paper/10 bg-ink/70 hover:border-gold/50 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-paper/5 text-gold group-hover:bg-gold/10 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-paper/40">Call Directly</p>
                <p className="text-paper/90 font-medium">+234 702 630 5945</p>
              </div>
            </a>

            <a 
              href="https://wa.me/+2347026305945"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center gap-4 p-5 rounded-2xl border border-paper/10 bg-ink/70 hover:border-gold/50 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-paper/5 text-gold group-hover:bg-gold/10 transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.755.002-2.61-1.01-5.063-2.85-6.905C16.587 2.1 14.134.92 11.53.918c-5.437 0-9.863 4.371-9.865 9.756-.001 1.773.49 3.5 1.42 5.04l-1.011 3.693 3.797-.983zm11.215-6.04c-.305-.153-1.805-.89-2.083-.992-.278-.102-.48-.153-.68.153-.2.305-.774.992-.95 1.193-.175.203-.35.229-.655.077-.305-.153-1.29-.475-2.456-1.517-.908-.81-1.52-1.812-1.698-2.118-.178-.306-.019-.471.134-.622.137-.137.305-.356.458-.534.153-.177.203-.305.305-.51.102-.203.05-.381-.025-.533-.076-.153-.68-1.642-.932-2.248-.246-.59-.497-.51-.68-.52-.176-.01-.377-.01-.578-.01-.201 0-.528.076-.804.381-.276.305-1.056 1.033-1.056 2.518s1.08 2.982 1.23 3.186c.153.204 2.127 3.249 5.153 4.556.72.311 1.282.497 1.72.637.724.23 1.382.197 1.902.12.58-.087 1.805-.738 2.057-1.453.253-.715.253-1.326.177-1.453-.076-.127-.278-.203-.583-.356z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-paper/40">WhatsApp Chat</p>
                <p className="text-paper/90 font-medium">Message Instantly</p>
              </div>
            </a>
          </div>

          {/* Booking & Social Network Links */}
          <div className="flex flex-col justify-between p-6 rounded-2xl border border-paper/10 bg-ink/70">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-paper/40 mb-3">Schedule a Meeting</p>
              <a 
                href="https://calendly.com/amowogbajegideon"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold text-inkdeep font-medium hover:bg-goldsoft transition-colors w-full sm:w-auto justify-center"
              >
                <Calendar className="w-4 h-4" />
                Book via Calendly
              </a>
            </div>

            <div className="mt-8 md:mt-0">
              <p className="text-xs font-medium uppercase tracking-wider text-paper/40 mb-4">Connect Elsewhere</p>
              <div className="flex items-center gap-4">
                {/* Telegram */}
                <a 
                  href="https://t.me/amowogbaje"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                  className="p-3 rounded-xl bg-paper/5 text-paper/70 hover:text-gold hover:bg-paper/10 transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.944 0C5.344 0 0 5.344 0 12s5.344 12 11.944 12c6.6 0 12-5.344 12-12s-5.4-12-12-12zm5.562 8.161l-1.875 8.835c-.141.623-.51.773-1.033.477l-2.852-2.102-1.377 1.324c-.152.152-.28.28-.574.28l.205-2.911 5.301-4.787c.23-.205-.05-.319-.357-.115l-6.556 4.125-2.822-.883c-.614-.193-.626-.614.128-.91l11.02-4.248c.51-.188.957.119.718 1.214z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com/amowogbaje"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-xl bg-paper/5 text-paper/70 hover:text-gold hover:bg-paper/10 transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.345.72-4.05-1.62-4.05-1.62-54-1.38-.66-1.38-.66-2.3 1.305-.915 1.305 2.37 1.37 2.37 1.27 2.16 3.33 1.54 4.14 1.17.13-.915.495-1.54.9-1.9-2.67-.3-5.475-1.335-5.475-5.94 0-1.305.465-2.385 1.23-3.225-.135-.3-.54-1.53.105-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.39 3-.405 1.02.015 2.04.135 3 .405 2.28-1.545 3.285-1.23 3.285-1.23.645 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.62-2.81 5.625-5.49 5.925.43.375.82 1.11 8.2 2.22v3.285c0 .315.225.69.83.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/amowogbaje"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-xl bg-paper/5 text-paper/70 hover:text-gold hover:bg-paper/10 transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                {/* <a 
                  href="https://twitter.com/amowogbaje"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-paper/5 text-paper/70 hover:text-gold hover:bg-paper/10 transition-all"
                  title="Twitter"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a> */}

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/amowogbaje/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="p-3 rounded-xl bg-paper/5 text-paper/70 hover:text-gold hover:bg-paper/10 transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
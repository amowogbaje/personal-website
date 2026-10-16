import { useState } from 'react'

const field =
  'w-full bg-inkdeep border border-paper/15 rounded-lg px-4 py-3 text-paper placeholder:text-paper/40 focus:border-gold outline-none'

export default function BriefForm() {
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [v, setV] = useState({ name: '', email: '', need: '', timeline: '', budget: '', link: '', website: '' })
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch('/api/brief.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-2xl border border-sage/40 p-6 text-paper/80" role="status">
        Thanks, your brief is in. I usually reply within a day.
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-paper/10 p-5 sm:p-7 space-y-4 bg-ink/60">
      <h3 className="font-display text-2xl text-paper">Send a project brief</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm text-paper/70">Name
          <input required className={field + ' mt-1'} value={v.name} onChange={set('name')} autoComplete="name" />
        </label>
        <label className="block text-sm text-paper/70">Email
          <input required type="email" className={field + ' mt-1'} value={v.email} onChange={set('email')} autoComplete="email" />
        </label>
      </div>
      <label className="block text-sm text-paper/70">What do you need built, fixed or integrated?
        <textarea required rows={4} className={field + ' mt-1'} value={v.need} onChange={set('need')} />
      </label>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm text-paper/70">Timeline
          <select className={field + ' mt-1'} value={v.timeline} onChange={set('timeline')}>
            <option value="">Not sure yet</option>
            <option>Urgent (under 2 weeks)</option>
            <option>1–2 months</option>
            <option>3+ months / ongoing</option>
          </select>
        </label>
        <label className="block text-sm text-paper/70">Budget (USD)
          <select className={field + ' mt-1'} value={v.budget} onChange={set('budget')}>
            <option value="">Not sure yet</option>
            <option>Under $500</option>
            <option>$500–$2,000</option>
            <option>$2,000–$5,000</option>
            <option>$5,000+</option>
            <option>Hiring full-time / long-term</option>
          </select>
        </label>
      </div>
      <label className="block text-sm text-paper/70">Link (existing site, repo or job post), optional
        <input className={field + ' mt-1'} value={v.link} onChange={set('link')} />
      </label>
      {/* honeypot: real visitors never see or fill this */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={v.website} onChange={set('website')} />
      <button disabled={state === 'sending'} type="submit"
        className="font-mono text-xs uppercase tracking-widebit bg-gold text-ink px-5 py-3 rounded-full hover:bg-goldsoft transition-colors disabled:opacity-60">
        {state === 'sending' ? 'sending…' : 'send brief'}
      </button>
      {state === 'error' && (
        <p className="text-sm text-rust" role="alert">
          That didn't go through. Please email me directly or book a call instead.
        </p>
      )}
    </form>
  )
}

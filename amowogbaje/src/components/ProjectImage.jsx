import { useState } from 'react'

// Project screenshot with a designed fallback (monogram on a soft gradient) until the file is added.
export default function ProjectImage({ src, title }) {
  const [failed, setFailed] = useState(false)
  if (src && !failed) {
    return (
      <img
        src={src}
        alt={`${title} screenshot`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
    )
  }
  const initials = title.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div aria-hidden="true" className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/15 via-inkdeep to-sage/15 overflow-hidden">
      <div className="absolute inset-0 dotgrid opacity-50" />
      <span className="relative font-display text-6xl text-paper/25">{initials}</span>
    </div>
  )
}

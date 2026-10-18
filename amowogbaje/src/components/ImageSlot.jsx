import { useState } from 'react'

// Renders an image only if the file exists; renders nothing otherwise (no broken-image icons).
export default function ImageSlot({ src, alt, className = '' }) {
  const [ok, setOk] = useState(true)
  if (!ok || !src) return null
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setOk(false)} className={className} />
}

// Umami Cloud analytics. Paste your Website ID (Umami → Websites → your site → Settings) below.
// Left empty, nothing loads, so local builds and previews send no data.
const UMAMI_WEBSITE_ID = ''

export function loadAnalytics() {
  if (!UMAMI_WEBSITE_ID || typeof document === 'undefined') return
  const s = document.createElement('script')
  s.defer = true
  s.src = 'https://cloud.umami.is/script.js'
  s.setAttribute('data-website-id', UMAMI_WEBSITE_ID)
  s.setAttribute('data-domains', 'amowogbaje.com,www.amowogbaje.com') // ignore localhost/preview traffic
  s.setAttribute('data-do-not-track', 'true')
  document.head.appendChild(s)
}

// Custom events are declared in markup with data-umami-event="name" (book-call, cv-open, ...).
// For code paths, use: track('brief-sent')
export const track = (name, data) => {
  try { window.umami?.track(name, data) } catch { /* ignore */ }
}

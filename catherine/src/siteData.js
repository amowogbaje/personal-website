export const WHATSAPP_NUMBER = '2348111468652'
export const EMAIL = 'ogwochinyere9@gmail.com'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/chinyere-amowogbaje-62030b225/'

export function waLink(text) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

// Nav links reflect the services-first reading order of the page.
export const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

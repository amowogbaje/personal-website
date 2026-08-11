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

// Rate card data for the /french page. Nigeria-based students pay monthly
// in Naira (the rates Catherine already advertises). Everyone paying in a
// foreign currency is billed hourly instead — flat monthly packages don't
// translate well across timezones/currencies, and hourly is the easier
// ask for a first-time international student. $10/hr is the advertised
// floor rate; GBP/EUR figures are set directly (not a live FX feed) and
// kept in the same rough proportion as the NGN monthly tiers.
export const FRENCH_RATES = {
  NGN: {
    label: 'Naira',
    symbol: '₦',
    unit: '/ month',
    note: 'Monthly package · Nigeria-based students',
    tiers: [
      { name: 'Beginner', price: '30,000', desc: 'Perfect for new learners. Build a strong foundation in French.' },
      { name: 'Intermediate', price: '50,000', desc: 'Strengthen your skills and communicate with more confidence.' },
      { name: 'Advanced', price: '80,000', desc: 'Refine your fluency and master French at an advanced level.' },
    ],
  },
  USD: {
    label: 'US Dollar',
    symbol: '$',
    unit: '/ hour',
    note: 'Hourly rate · billed per session',
    tiers: [
      { name: 'Beginner', price: '10', desc: 'Perfect for new learners. Build a strong foundation in French.' },
      { name: 'Intermediate', price: '17', desc: 'Strengthen your skills and communicate with more confidence.' },
      { name: 'Advanced', price: '27', desc: 'Refine your fluency and master French at an advanced level.' },
    ],
  },
  GBP: {
    label: 'British Pound',
    symbol: '£',
    unit: '/ hour',
    note: 'Hourly rate · billed per session',
    tiers: [
      { name: 'Beginner', price: '8', desc: 'Perfect for new learners. Build a strong foundation in French.' },
      { name: 'Intermediate', price: '14', desc: 'Strengthen your skills and communicate with more confidence.' },
      { name: 'Advanced', price: '22', desc: 'Refine your fluency and master French at an advanced level.' },
    ],
  },
  EUR: {
    label: 'Euro',
    symbol: '€',
    unit: '/ hour',
    note: 'Hourly rate · billed per session',
    tiers: [
      { name: 'Beginner', price: '9', desc: 'Perfect for new learners. Build a strong foundation in French.' },
      { name: 'Intermediate', price: '16', desc: 'Strengthen your skills and communicate with more confidence.' },
      { name: 'Advanced', price: '25', desc: 'Refine your fluency and master French at an advanced level.' },
    ],
  },
}

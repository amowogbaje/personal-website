import { useState } from 'react'
import { FRENCH_RATES } from '../siteData.js'

const CURRENCIES = ['NGN', 'USD', 'GBP', 'EUR']

export default function RateSwitcher() {
  const [currency, setCurrency] = useState('NGN')
  const rates = FRENCH_RATES[currency]

  return (
    <div>
      <div className="currency-toggle" role="tablist" aria-label="Choose currency">
        {CURRENCIES.map((code) => (
          <button
            key={code}
            type="button"
            role="tab"
            aria-selected={currency === code}
            className={`currency-btn${currency === code ? ' active' : ''}`}
            onClick={() => setCurrency(code)}
          >
            {FRENCH_RATES[code].symbol} {code}
          </button>
        ))}
      </div>

      <p className="rate-note">{rates.note}</p>

      <div className="rate-grid">
        {rates.tiers.map((tier) => (
          <div className="rate-card" key={tier.name}>
            <span className="rate-tier">{tier.name}</span>
            <div className="rate-price">
              <span className="rate-symbol">{rates.symbol}</span>
              {tier.price}
              <span className="rate-unit">{rates.unit}</span>
            </div>
            <p className="rate-desc">{tier.desc}</p>
          </div>
        ))}
      </div>

      {currency !== 'NGN' && (
        <p className="rate-fx-note">
          International rates are shown as a guide and billed per completed
          session — exact scheduling is confirmed on WhatsApp.
        </p>
      )}
    </div>
  )
}

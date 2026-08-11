import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Support from './components/Support.jsx'
import Services from './components/Services.jsx'
import FundMe from './components/FundMe.jsx'
import './index.css'

// Simple path-based routing — no router dependency needed for a few pages.
// If this grows further, swap this for react-router-dom.
// NOTE: /fundme is intentionally not linked anywhere in the UI (nav, footer,
// contact) — it's kept as a standalone page reachable only by direct URL.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const Page =
  path === '/support' ? Support :
  path === '/services' ? Services :
  path === '/fundme' ? FundMe :
  App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)

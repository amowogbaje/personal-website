import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Support from './components/Support.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import { getCaseStudy } from './data/caseStudies.js'
import ExperiencePage from './components/ExperiencePage.jsx'
import Writing from './components/Writing.jsx'
import Article, { getPost } from './components/Article.jsx'
import FundMe from './components/FundMe.jsx'
import { loadAnalytics } from './analytics.js'
import ChatWidget from './components/ChatWidget.jsx'
import './index.css'

// Simple path-based routing — no router dependency needed for a few pages.
// If this grows further, swap this for react-router-dom.
// NOTE: /fundme is intentionally not linked anywhere in the UI (nav, footer,
// contact) — it's kept as a standalone page reachable only by direct URL.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const slug = path.startsWith('/work/') ? path.slice(6) : path.startsWith('/writing/') ? path.slice(9) : null
const Page =
  path === '/support' ? Support :
  path === '/services' ? Services :
  path === '/about' ? About :
  path === '/fundme' ? FundMe :
  path === '/experience' ? ExperiencePage :
  path === '/writing' ? Writing :
  path.startsWith('/writing/') && slug && getPost(slug) ? Article :
  path.startsWith('/work/') && slug && getCaseStudy(slug) ? CaseStudy :
  App

loadAnalytics()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page slug={slug} />
    {(Page === App || Page === Services || Page === About || Page === CaseStudy || Page === Writing || Page === ExperiencePage || Page === Article) && <ChatWidget />}
  </React.StrictMode>,
)

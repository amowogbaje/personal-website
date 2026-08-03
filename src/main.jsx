import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Support from './components/Support.jsx'
import './index.css'

// Simple path-based routing — no router dependency needed for two pages.
// If this grows past a couple of routes, swap this for react-router-dom.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const Page = path === '/support' ? Support : App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)

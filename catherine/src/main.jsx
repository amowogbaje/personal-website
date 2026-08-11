import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import French from './components/French.jsx'
import './index.css'

// Simple path-based routing — no router dependency needed for a couple of
// pages. public/.htaccess rewrites unknown paths back to /index.html so
// this still works when someone lands directly on /french.
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const Page = path === '/french' ? French : App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)

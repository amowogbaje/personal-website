// Post-build step: writes dist/services.html with its own title, description,
// canonical URL and readable fallback content, so crawlers that don't run
// JavaScript still get a real /services page. public/.htaccess serves it.
import { readFileSync, writeFileSync } from 'node:fs'

const SITE = 'https://www.amowogbaje.com'
const page = {
  file: 'dist/services.html',
  url: `${SITE}/services`,
  title: 'Services — Laravel, API, E-Commerce & AI Integrations | Gideon Amowogbaje',
  description:
    'API integrations, CRM automation, WooCommerce, AI-powered automation, admin panels, and full-stack Laravel/FastAPI/Go builds — hire Gideon Amowogbaje for remote contract work.',
  body: `<main class="max-w-3xl mx-auto px-6 py-24">
      <h1 class="font-display text-4xl font-medium">Services — Gideon Amowogbaje, Fullstack Developer</h1>
      <p class="mt-4 text-paper/80">Tell me what you need built, not what tech stack it needs. 8+ years shipping Laravel, FastAPI and Go systems for real businesses: CRMs, e-commerce, admin tools and AI pipelines.</p>
      <h2 class="mt-10 font-display text-2xl">Core services</h2>
      <ul class="mt-3 space-y-2 text-paper/80 list-disc pl-5">
        <li>API &amp; CRM Integrations — CRMs, WooCommerce, Facebook Lead Ads and payment gateways with reliable webhooks and clean data sync.</li>
        <li>AI-Powered Automation — automated content pipelines, AI-assisted search and LLM-powered workflows.</li>
        <li>Admin Panels &amp; Internal Tools — Filament and Nova dashboards with CRUD, reporting and permissions.</li>
        <li>E-Commerce &amp; WooCommerce — WooCommerce sync, custom storefronts and Laravel e-commerce backends.</li>
        <li>SaaS &amp; Full-Stack Builds — Laravel, FastAPI or Go backends with React, Vue or Next.js frontends, from Figma to production.</li>
        <li>Legacy Rescue &amp; Troubleshooting — stalled, broken or half-finished apps diagnosed and shipped.</li>
      </ul>
      <h2 class="mt-10 font-display text-2xl">More ways to work together</h2>
      <ul class="mt-3 space-y-2 text-paper/80 list-disc pl-5">
        <li>Laravel/PHP bug fixing and production troubleshooting</li>
        <li>WordPress to Laravel migration</li>
        <li>Database design and query optimization</li>
        <li>Role-based auth and permission systems</li>
        <li>Docker, CI/CD and deployment setup</li>
        <li>Server management (Nginx, DigitalOcean, VPS)</li>
        <li>Automated testing setup (PHPUnit / Pest)</li>
        <li>Technical consulting and code review</li>
      </ul>
      <p class="mt-10 text-paper/80">Contact: <a href="mailto:amowogbajegideon@gmail.com">amowogbajegideon@gmail.com</a> · <a href="https://calendly.com/amowogbajegideon/30min">Book a call</a> · <a href="/">Back to portfolio</a></p>
    </main>`,
}

let html = readFileSync('dist/index.html', 'utf8')

function swap(re, replacement, label) {
  if (!re.test(html)) throw new Error(`prerender: could not find ${label} in dist/index.html`)
  html = html.replace(re, () => replacement)
}

swap(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`, '<title>')
swap(/<meta name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${page.description}" />`, 'meta description')
swap(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${page.url}" />`, 'canonical')
swap(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${page.url}" />`, 'og:url')
swap(/<meta property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${page.title}" />`, 'og:title')
swap(/<meta property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${page.description}" />`, 'og:description')
swap(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${page.title}" />`, 'twitter:title')
swap(/<meta name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${page.description}" />`, 'twitter:description')
swap(/<div id="root">[\s\S]*?<\/div>\s*<noscript>/, `<div id="root">\n    ${page.body}\n  </div>\n  <noscript>`, '#root fallback')

// vite uses base './', which breaks asset URLs when served from a different path depth
html = html.replace(/(src|href)="\.\/assets\//g, '$1="/assets/')

writeFileSync(page.file, html)
console.log(`prerender: wrote ${page.file}`)

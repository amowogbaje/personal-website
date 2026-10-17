// Post-build step: writes a pre-rendered HTML file per page (own title, description, canonical,
// readable fallback content) so crawlers that don't run JavaScript still get real pages.
// public/.htaccess serves dist/<path>.html for these routes.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { caseStudies } from '../src/data/caseStudies.js'
import { ABOUT_DESC } from '../src/components/aboutMeta.js'
import { EXPERIENCE_DESC } from '../src/components/experienceMeta.js'
const exp = JSON.parse(readFileSync('src/data/experience.json', 'utf8'))
import { marked } from 'marked'

const posts = JSON.parse(readFileSync('src/data/writing.json', 'utf8'))
const WRITING_DESC = 'Articles by Gideon Amowogbaje on AI workflows and backend engineering, drawn from production work.'

const SITE = 'https://www.amowogbaje.com'
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const CONTACT = `<p class="mt-10 text-paper/80">Contact: <a href="mailto:hello@amowogbaje.com">hello@amowogbaje.com</a> · <a href="https://calendly.com/amowogbajegideon/30min">Book a call</a> · <a href="/">Back to portfolio</a></p>`
const wrap = (inner) => `<main class="max-w-3xl mx-auto px-6 py-24">\n      ${inner}\n    </main>`

const pages = [
  {
    path: 'services',
    title: 'Services — Laravel, API, E-Commerce & AI Integrations | Gideon Amowogbaje',
    description:
      'API integrations, CRM automation, WooCommerce, AI-powered automation, admin panels, and full-stack Laravel/FastAPI/Go builds — hire Gideon Amowogbaje for remote contract work.',
    body: wrap(`<h1 class="font-display text-4xl font-medium">Services — Gideon Amowogbaje, Laravel &amp; API-Integration Engineer</h1>
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
      ${CONTACT}`),
  },
  {
    path: 'about',
    title: 'About | Gideon Amowogbaje',
    description: ABOUT_DESC,
    body: wrap(`<h1 class="font-display text-4xl font-medium">About Gideon Amowogbaje</h1>
      <p class="mt-4 text-paper/80">Backend-leaning full-stack developer with 8+ years across Laravel, Go and NestJS, working with remote teams in the US, UK and Nigeria. I connect products to the CRMs, payment gateways and AI services they depend on, and I rescue stalled backends. I also build and run my own products, and I teach Mathematics, Computer Science and Data Processing in schools.</p>
      ${CONTACT}`),
  },
  {
    path: 'experience',
    title: 'Experience | Gideon Amowogbaje',
    description: EXPERIENCE_DESC,
    body: wrap(`<h1 class="font-display text-4xl font-medium">Experience — Gideon Amowogbaje</h1>
      <p class="mt-4 text-paper/80">CVs: <a href="/cv/Gideon-Amowogbaje-CV-Backend.pdf">Backend</a> · <a href="/cv/Gideon-Amowogbaje-CV-Fullstack.pdf">Full-stack</a> · <a href="/cv/Gideon-Amowogbaje-CV-Teaching.pdf">Teaching</a> · <a href="/cv/Gideon-Amowogbaje-CV-Complete.pdf">Complete</a></p>
      <ul class="mt-6 space-y-3 text-paper/80">${exp.entries
        .map((e) => `<li><strong>${esc(e.title)}${e.engagement ? ` (${esc(e.engagement)})` : ''}</strong> — ${esc(e.company)}, ${esc(e.place)} · ${esc(e.dates)}<br/>${esc(e.points[0])}</li>`)
        .join('')}</ul>
      ${CONTACT}`),
  },
  {
    path: 'writing',
    title: 'Writing | Gideon Amowogbaje',
    description: WRITING_DESC,
    body: wrap(`<h1 class="font-display text-4xl font-medium">Writing</h1>
      <ul class="mt-6 space-y-4">${posts
        .map((p) => `<li><a href="/writing/${p.slug}">${esc(p.title)}</a><p class="text-paper/70">${esc(p.description)}</p></li>`)
        .join('')}</ul>
      ${CONTACT}`),
  },
  ...posts.map((p) => ({
    path: `writing/${p.slug}`,
    title: `${p.title} | Gideon Amowogbaje`,
    description: p.description,
    ld: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      author: { '@type': 'Person', name: 'Gideon Amowogbaje', url: SITE },
      mainEntityOfPage: `${SITE}/writing/${p.slug}`,
    },
    body: wrap(`<h1 class="font-display text-4xl font-medium">${esc(p.title)}</h1>
      <article>${marked.parse(readFileSync(`src/content/writing/${p.slug}.md`, 'utf8'), { gfm: true })}</article>
      ${CONTACT}`),
  })),
  ...caseStudies.map((c) => ({
    path: `work/${c.slug}`,
    title: `${c.title} | Gideon Amowogbaje`,
    description: c.description,
    body: wrap(`<h1 class="font-display text-4xl font-medium">${esc(c.title)}</h1>
      <p class="mt-3 text-paper/70">${esc(c.kind)} · ${esc(c.role)} · ${esc(c.dates)} · ${esc(c.stack.join(', '))}</p>
      ${c.stat ? `<p class="mt-6 text-paper/80"><strong>${esc(c.stat.value)}</strong> ${esc(c.stat.label)}</p>` : ''}
      ${c.sections
        .map(
          (s) =>
            `<h2 class="mt-8 font-display text-2xl">${esc(s.h)}</h2>` +
            (s.p || []).map((t) => `<p class="mt-3 text-paper/80">${esc(t)}</p>`).join('') +
            (s.ul ? `<ul class="mt-3 space-y-2 text-paper/80 list-disc pl-5">${s.ul.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''),
        )
        .join('\n      ')}
      ${CONTACT}`),
  })),
]

const base = readFileSync('dist/index.html', 'utf8')

for (const page of pages) {
  let html = base
  const url = `${SITE}/${page.path}`
  const swap = (re, replacement, label) => {
    if (!re.test(html)) throw new Error(`prerender: could not find ${label} in dist/index.html`)
    html = html.replace(re, () => replacement)
  }
  swap(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`, '<title>')
  swap(/<meta name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(page.description)}" />`, 'meta description')
  swap(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`, 'canonical')
  swap(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`, 'og:url')
  swap(/<meta property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${esc(page.title)}" />`, 'og:title')
  swap(/<meta property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(page.description)}" />`, 'og:description')
  swap(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${esc(page.title)}" />`, 'twitter:title')
  swap(/<meta name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${esc(page.description)}" />`, 'twitter:description')
  swap(/<div id="root">[\s\S]*?<\/div>\s*<noscript>/, `<div id="root">\n    ${page.body}\n  </div>\n  <noscript>`, '#root fallback')
  if (page.ld) html = html.replace('</head>', () => `<script type="application/ld+json">${JSON.stringify(page.ld)}</script>\n  </head>`)
  // vite uses base './', which breaks asset URLs when served from a different path depth
  html = html.replace(/(src|href)="\.\/assets\//g, '$1="/assets/')
  const file = `dist/${page.path}.html`
  mkdirSync(file.slice(0, file.lastIndexOf('/')), { recursive: true })
  writeFileSync(file, html)
  console.log(`prerender: wrote ${file}`)
}

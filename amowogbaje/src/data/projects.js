// All projects (source of truth for the homepage highlights, /work and the pre-rendered /work page).
export const projects = [
  {
    "status": "shipped",
    "statusColor": "bg-sage/15 text-sage border-sage/30",
    "title": "Qset",
    "href": "https://qset.amowogbaje.com",
    "linkLabel": "qset.amowogbaje.com",
    "caseStudy": "/work/qset-exam-platform",
    "stack": ["Laravel", "Reactjs", "MySQL", "TailwindCSS"],
    "summary": "A platform for teachers to generate exams in minutes. Users can search a question bank, select questions, add them to new or existing exam sets, review and reorder, then export to Word (docx)",
    "pr": "#01"
  },
  {
    "status": "shipped",
    "statusColor": "bg-sage/15 text-sage border-sage/30",
    "title": "Tax",
    "href": "https://tax.amowogbaje.com",
    "linkLabel": "tax.amowogbaje.com",
    "stack": ["Laravel", "Reactjs", "MySQL", "TailwindCSS"],
    "summary": "Live personal income tax calculator for Nigeria (NGN). Users input annual income, rent, and optional deductions (pension, health, life insurance) to estimate tax liability.",
    "pr": "#02"
  },
  {
    "status": "experimenting",
    "statusColor": "bg-amber-500/10 text-amber-400 border-amber-500/30",
    "title": "Jobs",
    "href": "https://jobs.amowogbaje.com",
    "linkLabel": "jobs.amowogbaje.com",
    "stack": ["Laravel", "Reactjs", "MySQL", "TailwindCSS"],
    "summary": "A job board and application tracker — browse curated listings, save roles you're watching, and keep every application's status in one place instead of scattered tabs.",
    "pr": "#03"
  },
  {
    "status": "in-production",
    "statusColor": "bg-violet-500/10 text-violet-400 border-violet-500/30",
    "title": "CraftProfessor Story Engine",
    "href": "https://craftprofessor.amowogbaje.com/",
    "linkLabel": "Craft Professor",
    "caseStudy": "/work/craftprofessor-story-engine",
    "stack": ["Laravel", "Generative AI", "Pinterest API"],
    "summary": "The core engine behind CraftProfessor. An automated publishing pipeline built in Laravel that orchestrates generative AI — text-to-text, text-to-image, and text/image-to-video — to produce and sync narrative content to Pinterest.",
    "metrics": [
      { "label": "Pinterest · Account 1 · monthly views, ~60 days", "from": "100", "to": "115K+", "diff": "+114,900" },
      { "label": "Pinterest · Account 2 · monthly views", "from": "500", "to": "44K+", "diff": "+43,500" }
    ],
    "pr": "#04"
  },
  {
   "status": "in-production",
    "statusColor": "bg-violet-500/10 text-violet-400 border-violet-500/30",
    "title": "Storyverse",
    "href": "https://storyverse.amowogbaje.com",
    "linkLabel": "storyverse.amowogbaje.com",
    "caseStudy": "/work/storyverse-payments",
    "stack": ["Laravel", "Reactjs", "PostgreSQL/MySQL", "TailwindCSS"],
    "summary": "A serialized-fiction reading platform with a full author studio — episode-based access tiers, AI-assisted search, a badge/reward system, and multi-gateway subscriptions (Stripe, Paystack, Flutterwave) with per-country pricing.",
    "pr": "#05"
  },
  {
    "status": "draft",
    "statusColor": "bg-paper/10 text-paper/50 border-paper/20",
    "title": "AI Video Generator",
    "href": "https://github.com/amowogbaje/aivideogenerator",
    "linkLabel": "github.com/amowogbaje/aivideogenerator",
    "stack": ["FastApi", "AI/ML"],
    "summary": "In-progress AI video generation tool built with FastAPI and ML. Actively developed with recent commits on story text and prompt features.",
    "pr": "#06"
  },
  {
    "status": "draft",
    "statusColor": "bg-paper/10 text-paper/50 border-paper/20",
    "title": "HelpBoard",
    "href": "https://github.com/amowogbaje/HelpBoardFullstackAmowogbaje",
    "linkLabel": "github.com/amowogbaje/HelpBoardFullstackAmowogbaje",
    "stack": ["Express.js", "React + Vite"],
    "summary": "Full-stack support board built with Express.js and React + Vite, designed to help users raise, track, and manage support requests through a centralized platform.",
    "pr": "#07"
  }
]

export const SLUG = {
  Qset: 'qset',
  Tax: 'tax',
  Jobs: 'jobs',
  'CraftProfessor Story Engine': 'craftprofessor',
  Storyverse: 'storyverse',
  'AI Video Generator': 'ai-video-generator',
  HelpBoard: 'helpboard',
}
// Homepage shows only these, in this order. Everything else lives on /work.
export const FEATURED = ['storyverse', 'craftprofessor', 'jobs']
export const allProjects = projects.map((p) => ({ ...p, slug: SLUG[p.title], image: `/images/projects/${SLUG[p.title]}.webp` }))

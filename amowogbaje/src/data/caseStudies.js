// Facts below come from public/llms-full.txt and resume.pdf only.
// Add measurable results (active users, leads synced, revenue processed) to a "Result" block when you have
// real numbers. Pages stay honest without them. Role/dates/bullets mirror src/data/experience.json.
export const caseStudies = [
  {
    slug: 'koc-project-rescue',
    title: 'Rescuing a stalled project: from Figma design to production-ready product',
    description:
      'Case study: Gideon Amowogbaje at KOC — took a stalled project from a Figma design to a working, production-ready product on a tight deadline, with WooCommerce syncing, transactional email and role-based permissions.',
    kind: 'Contract work · KOC',
    role: 'Full Stack Developer (contract)',
    dates: 'Sep 2025 – May 2026',
    stack: ['Laravel', 'WooCommerce', 'Editor.js', 'Figma-to-code'],
    sections: [
      {
        h: 'Context',
        p: ['The project had stalled. I was brought in to get it finished, working from a Figma design.'],
      },
      {
        h: 'What I built',
        ul: [
          'Turned the Figma design into a working, production-ready product from scratch, under a tight deadline, then iterated to final delivery.',
          'WooCommerce syncing and transactional email.',
          'Role-based permissions with Laravel Policies and Gates.',
          'A Notion-style, block-based blogging interface with Editor.js, improving content flexibility and the admin publishing workflow.',
        ],
      },
      {
        h: 'Result',
        p: ['A stalled project became a working, production-ready product, delivered to a tight deadline and refined through to final delivery.'],
      },
      {
        h: 'If you have a similar problem',
        p: ['A half-finished or stuck build, a design that never made it to production, or an inherited codebase that needs finishing: I take those on and ship them.'],
      },
    ],
  },
  {
    slug: 'africred-crm-integrations',
    title: 'Feeding Facebook leads into a live CRM — without rewriting it',
    description:
      'Case study: how Gideon Amowogbaje built webhook ingestion and automated OAuth token refresh to sync Facebook Instant Form leads into a production Laravel CRM at Africred.',
    kind: 'Employer work · Africred',
    role: 'Backend Developer (full-time), one of 3 developers',
    dates: 'Feb 2025 – Sep 2025',
    stack: ['Laravel', 'Webhooks', 'OAuth', 'Facebook Instant Forms', 'WhatsApp API'],
    sections: [
      {
        h: 'Context',
        p: [
          'Africred already ran a company CRM in production. Sales needed prospective-client data from Facebook Instant Forms to land in it for follow-up.',
        ],
      },
      {
        h: 'Challenge',
        p: [
          'The CRM database was live and was not designed around integrations. A rewrite would have put a working system at risk.',
        ],
      },
      {
        h: 'What I built',
        ul: [
          'Webhook ingestion for Facebook Instant Forms, syncing prospect data into the production CRM.',
          'A scheduled Laravel command that tracks Facebook access tokens and refreshes them automatically, so the integration does not silently expire.',
          'Additive changes to the existing production schema instead of a risky rewrite.',
          'Contributions to the CRM structure, onboarding of the service team, and set-up of an official WhatsApp helpline; I also led the research study that selected the WhatsApp messaging provider.',
        ],
      },
      {
        h: 'Result',
        p: [
          'Prospective-client data from Facebook Instant Forms reached the production CRM for sales follow-up, with token refresh handled automatically.',
        ],
      },
      {
        h: 'If you have a similar problem',
        p: [
          'Lead forms, payment webhooks, third-party OAuth, or a live database you cannot afford to break: this is the kind of work I do.',
        ],
      },
    ],
  },
  {
    slug: 'dayout-laravel-to-go-migration',
    title: 'Moving core backend services from Laravel to Go, and standardising on Eloquent',
    description:
      'Case study: Gideon Amowogbaje at Dayout (US) — rewrote core service endpoints from Laravel to Go, built a push notification service, and led the Eloquent-vs-raw-SQL study behind a company-wide decision.',
    kind: 'Employer work · Dayout (United States)',
    role: 'Backend Developer (part-time), team of 3 backend developers',
    dates: 'Jun 2024 – Sep 2026',
    stack: ['Laravel', 'Go', 'Eloquent', 'OpenAPI'],
    sections: [
      {
        h: 'Context',
        p: ['Dayout was migrating its backend from Laravel to Go. I joined a team of three backend developers working remotely.'],
      },
      {
        h: 'What I built',
        ul: [
          'Rewrote core service endpoints (activities, notifications, emails and comments) from Laravel to Go as part of the migration.',
          'Built a Push Notification Service from scratch, including three related endpoints.',
          'Contributed to the OpenAPI documentation used by developers and users.',
        ],
      },
      {
        h: 'The decision I helped drive',
        p: [
          'I led a research study comparing Laravel Eloquent against raw SQL. The result was company-wide adoption of Eloquent. I then built all the resulting database migrations from scratch and helped refactor the codebase around Dependency Injection and Laravel Models.',
        ],
      },
      {
        h: 'Result',
        p: ['Core services running in Go, a push notification service in place, and a documented, company-wide decision on data access.'],
      },
      {
        h: 'If you have a similar problem',
        p: ['A framework migration, a data-access decision that needs evidence, or a service that has to be rebuilt without breaking its consumers: I have done it in a live team.'],
      },
    ],
  },
  {
    slug: 'craftprofessor-story-engine',
    cover: '/images/projects/craftprofessor.webp',
    title: 'CraftProfessor: an AI story-to-Pinterest pipeline that grew an account to 115K+ monthly views',
    description:
      'Case study: CraftProfessor Story Engine by Gideon Amowogbaje — a Laravel 13 pipeline that turns a story into AI-generated images and video, then publishes to Pinterest. One account grew from about 100 to 115K+ monthly views in roughly 60 days.',
    kind: 'Own product',
    role: 'Builder and owner',
    dates: 'In production',
    stack: ['Laravel 13', 'Gemini', 'Vertex AI', 'Hugging Face', 'TogetherAI', 'Pinterest API'],
    stat: {
      value: '115K+',
      label: 'monthly Pinterest views on one account, up from about 100 in roughly 60 days, with no manual posting (self-reported, October 2026)',
    },
    sections: [
      {
        h: 'Context',
        p: ['CraftProfessor is an AI-assisted content pipeline for writers and bookstores. A story goes in; publishable social content comes out.'],
      },
      {
        h: 'What I built',
        ul: [
          'A pipeline that takes a story and generates image and video options across several AI providers (Gemini, Vertex AI, Hugging Face and TogetherAI).',
          'A review step: I review and approve the options before anything is published.',
          'Automated publishing to Pinterest, with LinkedIn and Facebook also supported.',
        ],
      },
      {
        h: 'Result',
        p: ['One Pinterest account grew from about 100 to 115K+ monthly views in roughly 60 days, with no manual posting. This is a self-reported figure for one account.'],
      },
      {
        h: 'If you have a similar problem',
        p: ['Content that needs to be generated, reviewed and published across platforms, or any workflow where several AI providers and a third-party API have to work together reliably.'],
      },
    ],
    link: { href: 'https://craftprofessor.amowogbaje.com/', label: 'visit CraftProfessor' },
  },
  {
    slug: 'qset-exam-platform',
    cover: '/images/projects/qset.webp',
    title: 'Qset: an exam-generation platform for teachers',
    description:
      'Case study: Qset, a solo-built exam-generation platform for teachers with a searchable question bank, an exam-set builder, Word export and AI-assisted question generation. Laravel, React, MySQL, Redis.',
    kind: 'Own product',
    role: 'Founder, solo',
    dates: 'Sep 2025 – Present',
    stack: ['Laravel', 'React', 'MySQL', 'Redis', 'Docker'],
    sections: [
      {
        h: 'Context',
        p: ['Qset helps teachers build exams without starting from a blank page. I built it alone, and I also teach, so I know the problem first-hand.'],
      },
      {
        h: 'What I built',
        ul: [
          'A searchable question bank and an exam-set builder.',
          'Word (docx) export of finished exams.',
          'AI-assisted question generation using Laravel\'s AI package.',
          'A design that also allows a marketplace for exam-question resources.',
          'An upgrade from Laravel 11 to 13 and containerisation with Docker.',
        ],
      },
      {
        h: 'Result',
        p: ['A live product I designed, built, upgraded and operate on my own.'],
      },
      {
        h: 'If you have a similar problem',
        p: ['A niche tool for a specific profession, from data model to export format to AI assistance: I can take it from idea to a working product.'],
      },
    ],
    link: { href: 'https://qset.amowogbaje.com', label: 'visit Qset' },
  },
  {
    slug: 'storyverse-payments',
    cover: '/images/projects/storyverse.webp',
    title: 'Storyverse: a serialized-fiction platform with multi-gateway payments',
    description:
      'Case study: Storyverse, a live serialized-fiction platform built by Gideon Amowogbaje with Laravel and React, supporting Stripe, Paystack and Flutterwave with per-country pricing.',
    kind: 'Own product',
    role: 'Builder and owner',
    dates: 'Live in production',
    stack: ['Laravel', 'React', 'Tailwind', 'Stripe', 'Paystack', 'Flutterwave'],
    sections: [
      {
        h: 'Context',
        p: [
          'Storyverse is a serialized-fiction platform I build and run myself. Readers can browse as guests, create accounts, and keep reading where they left off.',
        ],
      },
      {
        h: 'What I built',
        ul: [
          'Subscriptions across three payment gateways (Stripe, Paystack and Flutterwave) with per-country pricing.',
          'Episode-based access tiers, an author studio, and engagement analytics.',
          'AI-assisted story search and a badge and reward system.',
        ],
      },
      {
        h: 'Result',
        p: ['A live, end-to-end product I designed, built, deployed and operate: the same range of work I can take on for a client.'],
      },
      {
        h: 'If you have a similar problem',
        p: [
          'Selling across several countries, supporting more than one payment gateway, or shipping a full product from design to production: I can help.',
        ],
      },
    ],
    link: { href: 'https://storyverse.amowogbaje.com', label: 'visit the live app' },
  },
]

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug)

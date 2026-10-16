// Facts below come from public/llms-full.txt and resume.pdf only.
// TODO(Gideon): add one measurable result to each "Result" block (e.g. leads synced per week,
// uptime, active users, revenue processed) — only real numbers. Pages stay honest without them.
export const caseStudies = [
  {
    slug: 'africred-crm-integrations',
    title: 'Feeding Facebook leads into a live CRM — without rewriting it',
    description:
      'Case study: how Gideon Amowogbaje built webhook ingestion and automated OAuth token refresh to sync Facebook Instant Form leads into a production Laravel CRM at Africred.',
    kind: 'Employer work · Africred',
    role: 'Backend Developer, one of 3 developers',
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
    slug: 'storyverse-payments',
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

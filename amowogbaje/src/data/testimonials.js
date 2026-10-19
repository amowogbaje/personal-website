// Add more as they come in. Ask each person for 2-3 sentences naming the project and the outcome,
// and add their role/company only with their permission.
//
// Fields:
//   quote   string, or an array of strings (one per paragraph)
//   name, role, company
//   avatar  optional photo path (hidden until the file exists)
//   links   optional public profiles. Each is { url } or { url, label }. The label is detected from
//           the URL (LinkedIn, X, Instagram, Facebook, GitHub, YouTube, TikTok, Threads), else "Profile".
export const testimonials = [
  {
    quote: [
      'I worked with Gideon at Dayout, where he was on the backend, and I was on the mobile app.',
      'He built the notification system and the real-time layer behind it. That included the Pusher service that powers live updates for things like comment queues and likes. It was a complex setup with a lot of moving parts. He also owned the auth and emailing services end-to-end.',
      'What I valued most was how he thought about features. Before we wrote any code, he would ask the questions I had missed: what happens when a user is offline, what happens when two events arrive out of order, what happens when this scales. Several times those questions caught problems that would have cost us days later. He doesn’t just build what the ticket says. He thinks through how the feature will behave once real users are on it.',
      'He pays attention to details and he communicates clearly. I’d gladly work with him again, and I’d recommend him to any team that needs a backend developer who owns the problem from design to delivery.',
    ],
    name: 'Victor Loveday',
    role: 'Senior Software Engineer',
    company: 'Dayout Technologies',
    avatar: '/images/testimonials/victor-loveday.webp',
    links: [{ url: 'https://www.linkedin.com/in/victorloveday' }],
  },
]

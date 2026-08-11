/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14171F',
        inkdeep: '#0B0D12',
        paper: '#F2EBDD',
        cream: '#FAF8F4',
        gold: '#C9A227',
        goldsoft: '#E0C467',
        slate: '#5B6472',
        sage: '#6B8F71',
        sagedeep: '#4F6E55',
        rust: '#A85B3F',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightish: '-0.02em',
        widebit: '0.18em',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lumi: {
          black: '#050507',
          card: '#101018',
          panel: '#0b1020',
          panelStrong: '#130a1f',
          line: 'rgba(255, 255, 255, 0.10)',
          lineActive: 'rgba(155, 92, 255, 0.45)',
          text: '#f7f2ff',
          secondary: 'rgba(247, 242, 255, 0.72)',
          muted: 'rgba(247, 242, 255, 0.48)',
          blue: '#4cc9f0',
          cyan: '#5fffe0',
          violet: '#9b5cff',
          magenta: '#ff4fd8',
          rose: '#ff6b9e',
        },
      },
      fontFamily: {
        display: [
          'Aptos Display',
          'Segoe UI Variable Display',
          'Aptos',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        display: '-0.035em',
      },
      borderRadius: {
        lumi: '1.75rem',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(0, 0, 0, 0.35)',
        glow: '0 0 44px rgba(76, 201, 240, 0.18)',
        violet: '0 0 52px rgba(155, 92, 255, 0.22)',
      },
    },
  },
  plugins: [],
};


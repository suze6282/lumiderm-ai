/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lumi: {
          bgPrimary: '#05050a',
          bgSecondary: '#070812',
          bgTertiary: '#0b0c16',
          surface: 'rgba(255, 255, 255, 0.035)',
          surfaceStrong: 'rgba(255, 255, 255, 0.055)',
          surfaceElevated: 'rgba(15, 16, 30, 0.82)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(181, 156, 255, 0.22)',
          borderActive: 'rgba(132, 212, 255, 0.34)',
          textPrimary: '#ffffff',
          textSecondary: '#d8d9e6',
          textMuted: '#8e91a6',
          accentPrimary: '#9b8cff',
          accentPrimarySoft: '#b59cff',
          accentSecondary: '#6db8ff',
          accentSecondarySoft: '#84d4ff',
          black: '#05050a',
          card: '#0f101e',
          panel: '#0b0c16',
          panelStrong: '#100d1d',
          line: 'rgba(255, 255, 255, 0.08)',
          lineActive: 'rgba(181, 156, 255, 0.22)',
          text: '#ffffff',
          secondary: 'rgba(216, 217, 230, 0.78)',
          muted: 'rgba(142, 145, 166, 0.72)',
          blue: '#6db8ff',
          cyan: '#84d4ff',
          violet: '#9b8cff',
          magenta: '#b59cff',
          rose: '#cfa6c1',
        },
      },
      fontFamily: {
        display: [
          'Segoe UI Variable Display',
          'PingFang SC',
          'Microsoft YaHei',
          'Aptos',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        display: '-0.03em',
      },
      borderRadius: {
        lumi: 'var(--lumi-radius-xl)',
      },
      boxShadow: {
        soft: 'var(--lumi-shadow-card)',
        glow: '0 0 44px rgba(109, 184, 255, 0.14)',
        violet: '0 0 52px rgba(155, 140, 255, 0.18)',
      },
    },
  },
  plugins: [],
};


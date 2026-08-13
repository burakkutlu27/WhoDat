/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif'],
        display: ['var(--font-jakarta)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        game: {
          bg: {
            dark: '#0B0F17',
            light: '#F8FAFC',
          },
          card: {
            dark: '#151D2A',
            light: '#FFFFFF',
          },
          border: {
            dark: '#26334D',
            light: '#E2E8F0',
          },
          primary: {
            DEFAULT: '#6366F1',
            hover: '#4F46E5',
          },
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        shake: 'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
}

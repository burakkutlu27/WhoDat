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
        sans: ['var(--font-nunito)', 'Nunito', 'sans-serif'],
        display: ['var(--font-caveat)', 'Caveat', 'cursive'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        paper: {
          bg: 'var(--paper-bg)',
          card: 'var(--paper-card)',
          border: 'var(--paper-border)',
          'border-strong': 'var(--paper-border-strong)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          faded: 'var(--ink-faded)',
          'extra-faded': 'var(--ink-extra-faded)',
        },
        pencil: {
          red: 'var(--pencil-red)',
          'red-hover': 'var(--pencil-red-hover)',
          green: 'var(--pencil-green)',
          'green-hover': 'var(--pencil-green-hover)',
          blue: 'var(--pencil-blue)',
          yellow: 'var(--pencil-yellow)',
          orange: 'var(--pencil-orange)',
          purple: 'var(--pencil-purple)',
        },
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        scribble: {
          '0%': { 'stroke-dashoffset': '100' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.8) rotate(-4deg)', opacity: '0' },
          '60%': { transform: 'scale(1.05) rotate(1deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        paperDrop: {
          '0%': { transform: 'translateY(-20px) rotate(-3deg)', opacity: '0' },
          '60%': { transform: 'translateY(4px) rotate(1deg)', opacity: '1' },
          '100%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
        },
        stickyPeel: {
          '0%': { transform: 'rotateX(90deg) translateY(-10px)', opacity: '0', transformOrigin: 'top center' },
          '50%': { transform: 'rotateX(-5deg) translateY(3px)', opacity: '1' },
          '100%': { transform: 'rotateX(0deg) translateY(0)', opacity: '1' },
        },
        stampPress: {
          '0%': { transform: 'scale(1.6) rotate(-8deg)', opacity: '0' },
          '50%': { transform: 'scale(0.92) rotate(2deg)', opacity: '1' },
          '70%': { transform: 'scale(1.04) rotate(-0.5deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        cardDeal: {
          '0%': { transform: 'translateX(40px) rotate(8deg) scale(0.9)', opacity: '0' },
          '60%': { transform: 'translateX(-4px) rotate(-1deg) scale(1.02)', opacity: '1' },
          '100%': { transform: 'translateX(0) rotate(0deg) scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { borderColor: 'var(--pencil-yellow)', boxShadow: '0 0 0 0 rgba(232, 168, 56, 0)' },
          '50%': { borderColor: 'var(--pencil-yellow)', boxShadow: '0 0 12px 2px rgba(232, 168, 56, 0.15)' },
        },
        envelopeOpen: {
          '0%': { transform: 'scale(0.8) rotateY(90deg)', opacity: '0' },
          '50%': { transform: 'scale(1.05) rotateY(-5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotateY(0deg)', opacity: '1' },
        },
        trophyBounce: {
          '0%': { transform: 'scale(0) rotate(-20deg)' },
          '50%': { transform: 'scale(1.2) rotate(5deg)' },
          '70%': { transform: 'scale(0.95) rotate(-2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        drawCheck: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        drawX: {
          '0%': { strokeDashoffset: '20' },
          '100%': { strokeDashoffset: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        nudge: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 2.5s ease-in-out infinite',
        shake: 'shake 0.4s ease-in-out',
        'pop-in': 'popIn 0.4s ease-out',
        'paper-drop': 'paperDrop 0.5s ease-out',
        'sticky-peel': 'stickyPeel 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'stamp-press': 'stampPress 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        float: 'float 6s ease-in-out infinite',
        'card-deal': 'cardDeal 0.4s ease-out both',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'envelope-open': 'envelopeOpen 0.5s ease-out both',
        'trophy-bounce': 'trophyBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'draw-check': 'drawCheck 0.4s ease-out 0.2s both',
        'draw-x': 'drawX 0.3s ease-out both',
        'slide-up': 'slideUp 0.3s ease-out both',
        nudge: 'nudge 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}

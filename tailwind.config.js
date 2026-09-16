/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['monospace'],
      },
      colors: {
        engineering: {
          base:      'var(--color-base)',
          surface:   'var(--color-surface)',
          surface2:  'var(--color-surface2)',
          border:    'var(--color-border)',
          accent:    '#69a7ff',
          text:      'var(--color-text)',
          textMuted: 'var(--color-text-muted)',
        },
      },
      animation: {
        'grid-move':   'grid-move 4s linear infinite',
        'draw-line':   'draw-line 3s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':     'fade-in 1s forwards',
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse-slow 4s ease-in-out infinite',
        'scan':        'scan 3s linear infinite',
        'ping':        'ping 1s cubic-bezier(0,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
}

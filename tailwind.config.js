/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        accent: '#7C3AED',
        glow: '#A855F7',
        dark: '#0A0A0F',
        surface: '#111118',
        border: 'rgba(139,92,246,0.2)',
        text: '#F1F0FF',
        muted: '#8B8AA8',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #A855F7 100%)',
        'gradient-text': 'linear-gradient(90deg, #4F46E5 0%, #A855F7 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(168,85,247,0.35)',
        'glow-sm': '0 0 20px rgba(168,85,247,0.25)',
      },
      animation: {
        'pulse-ring': 'pulse-ring 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'bounce-slow': 'bounce-slow 2s infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '70%': { transform: 'scale(1.8)', opacity: '0' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}

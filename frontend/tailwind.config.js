/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { 50: '#f0f4ff', 100: '#dbe4ff', 200: '#bac8ff', 300: '#91a7ff', 400: '#748ffc', 500: '#5c7cfa', 600: '#4c6ef5', 700: '#4263eb', 800: '#3b5bdb', 900: '#364fc7' },
        surface: { light: '#ffffff', dark: '#1a1b2e' },
        glass: { light: 'rgba(255,255,255,0.7)', dark: 'rgba(26,27,46,0.7)' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      boxShadow: { glass: '0 8px 32px rgba(0,0,0,0.08)', premium: '0 20px 60px rgba(0,0,0,0.12)' },
      backdropBlur: { glass: '16px' },
      animation: { 'fade-in': 'fadeIn 0.5s ease-out', 'slide-up': 'slideUp 0.4s ease-out', 'float': 'float 3s ease-in-out infinite' },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
};

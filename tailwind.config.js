/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        tan: {
          50: '#faf6f1',
          100: '#f2e9dc',
          200: '#e5d4bc',
          300: '#d5b894',
          400: '#c49a70',
          500: '#b17f55',
          600: '#a06849',
          700: '#85523f',
          800: '#6d4437',
          900: '#5a3a30',
        },
        wine: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f8cfd6',
          300: '#f3a8b5',
          400: '#eb7689',
          500: '#de4865',
          600: '#c82b4c',
          700: '#a8203d',
          800: '#8b1d37',
          900: '#751c33',
        },
        navy: {
          50: '#f0f5fc',
          100: '#e0eaf7',
          200: '#bbd4f1',
          300: '#7fa8e3',
          400: '#4b82d5',
          500: '#2a5fb8',
          600: '#1f4a9c',
          700: '#1b3d7f',
          800: '#1a346a',
          900: '#1a2e59',
        },
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.5s ease-out forwards',
        'float': 'float 20s ease-in-out infinite',
        'float-delayed': 'float 20s ease-in-out infinite reverse',
      },
      keyframes: {
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -10px) rotate(1deg)' },
          '50%': { transform: 'translate(-5px, 15px) rotate(-1deg)' },
          '75%': { transform: 'translate(-15px, -5px) rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
};
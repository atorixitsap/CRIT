/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'blob': 'blob 8s infinite ease-in-out',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
            borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%'
          },
          '50%': {
            transform: 'translate(30px, -20px) scale(1.1)',
            borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%'
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
            borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%'
          },
        }
      },
      animationDelay: {
        '2000': '2s',
        '4000': '4s',
      },
    }
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.animation-delay-2000': {
          'animation-delay': '2s',
        },
        '.animation-delay-4000': {
          'animation-delay': '4s',
        },
      }
      addUtilities(newUtilities)
    }
  ]
}
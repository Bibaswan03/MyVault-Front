/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'typing': {
          '0%': { opacity: 0 },
          '100%': { opacity: 10 },
        },
      },
      animation: {
        'typing': 'typing 0.5s steps(1, end) forwards',
      },
    },
  },
  plugins: [],
}

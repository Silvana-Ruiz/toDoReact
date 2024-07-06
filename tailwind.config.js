/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend : {
      colors: {
        'darkgrey': '#30343F',
        'lightgrey': '#FAFAFF',
        'purple': '#E4D9FF',
        'navy': '#273469',
        'darknavy': '#1E2749',
        'violet': '#6f73d3',

      },
    }
  },
  plugins: [],
}


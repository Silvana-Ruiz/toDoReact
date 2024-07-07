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
        'custompurple': '#E4D9FF',
        'navy': '#273469',
        'darknavy': '#1E2749',
        'customviolet': '#626499',
        'darkcustomviolet': '#626499',
        'lightercustomviolet': '#a8abed',
        'lightercustomred': '#eda8af',
        'activebutton': '#54556e',

      },
    }
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/daisyui/**/*.js",
    "./src/pages/css/**/*.css"
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}


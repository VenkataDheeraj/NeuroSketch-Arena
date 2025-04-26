/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#1e3a8a', // Deep blue
      secondary: '#f1f5f9', // light slate
    }
  }
},
  plugins: [],
};
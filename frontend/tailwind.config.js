/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // 'primary' : "#5f6FFF"
        'primary' :"#73EC8B", //73EC8B //5CB338
      },
      gridTemplateColumns:{
        'auto' : 'repeat(auto-fill,minmax(200px,1fr))'
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        // logofont:["Fascinate Inline", "system-ui"],
        headingFont:["Oswald", "sans-serif"],
        usernameDate:["Share Tech Mono", "monospace"],
        paraFont:["Work Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}

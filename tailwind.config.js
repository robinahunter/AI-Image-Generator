/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Correctly targets all JavaScript and TypeScript files in your src directory.
    "./public/**/*.html", // Targets HTML files in your public directory.
  ],
  theme: {
    extend: {}, // Allows you to customize the default Tailwind theme or add your own values.
  },
  plugins: [], // Include any Tailwind CSS plugins you might want to use here.
}

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e53935', // rojo fuerte
        accent: '#fb8c00',  // naranja
        dark: '#121212',    // fondo negro/gris oscuro
      },
    },
  },
  plugins: [],
};

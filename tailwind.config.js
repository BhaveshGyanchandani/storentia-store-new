/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111114',
        paper: '#faf9f7',
        accent: '#2f6f4f',
      },
    },
  },
  plugins: [],
};

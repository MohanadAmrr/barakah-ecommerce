/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4dabf5",
          DEFAULT: "#2196f3",
          dark: "#1769aa",
        },
        secondary: {
          light: "#f73378",
          DEFAULT: "#f50057",
          dark: "#ab003c",
        },
        neutral: {
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
        success: {
          light: "#81c784",
          DEFAULT: "#4caf50",
          dark: "#388e3c",
        },
        warning: {
          light: "#ffb74d",
          DEFAULT: "#ff9800",
          dark: "#f57c00",
        },
        error: {
          light: "#e57373",
          DEFAULT: "#f44336",
          dark: "#d32f2f",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#000112",
        },
        "main-purple": "#635FC7",
        "main-purple-hover": "#A8A4FF",
        black: "#000112",
        "very-dark-gray": "#20212C",
        "dark-gray": "#2B2C37",
        "lines-dark": "#3E3F4E",
        "medium-gray": "#828FA3",
        "lines-light": "#E4EBFA",
        "light-gray": "#F4F7FD",
        red: "#EA5555",
        "red-hover": "#FF9898",
        dark: {
          purple: "#635FC7",
          gray: "#2B2C37",
          red: "#EA5555",
          secondary: "#20212C",
        },
        light: {
          purple: "A8A4FF",
          dark: "#20212C",
          gray: "#3E3F4E",
          "gray-secondary": "#E4EBFA",
          secondary: "#F4F7FD",
          red: "#FF9898",
        },
        "gray-secondary": "#828FA3",
      },
      screens: {
        xxs: "370px",
        xs: "450px",
        ms: "600px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

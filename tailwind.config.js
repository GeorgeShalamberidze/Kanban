/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#635FC7",
        "light-purple": "A8A4FF",
        dark: "#000112",
        "light-dark": "#20212C",
        "dark-gray": "#2B2C37",
        "light-gray": "#3E3F4E",
        gray: "#828FA3",
        "gray-light": "#E4EBFA",
        "light-white": "#F4F7FD",
        white: "#FFFFFF",
        "dark-red": "#EA5555",
        "light-red": "#FF9898",
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
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#645cff",
        buttonHover: "#103778",
        background: "#a5fcfc33",
      },
      fontFamily: ["Poppins", "sans - serif"],
      fontWeight: {
        title1: "700",
        title2: "500",
        body: "400",
      },
    },
  },
  plugins: [],
};

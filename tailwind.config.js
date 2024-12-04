/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        h1: "30px",
        h2: "24px",
        h3: "20px",
        h4: "16px",
        h5: "12px",
        h6: "8px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#1a352b",
          secondary: "#ED969F",
          accent: "#deff00",
          neutral: "#ffffff",
          "base-100": "#eeece9",
        },
      },
      "sunset",
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};

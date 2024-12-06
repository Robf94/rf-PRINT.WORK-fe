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
        darkTheme: {
          primary: "#2c2f36", // Dark charcoal, almost black, for strong emphasis
          secondary: "#a176ad", // Soft purple adds sophistication
          accent: "#ffc857", // Gentle amber for attention-grabbing elements
          neutral: "#232323", // Very dark grey background
          "base-100": "#383838", // Lighter grey for panels/cards
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};

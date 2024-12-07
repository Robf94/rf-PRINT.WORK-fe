import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

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
          primary: "#2c2f36",
          secondary: "#a176ad",
          accent: "#ffc857",
          neutral: "#232323",
          "base-100": "#383838",
        },
      },
    ],
  },
  plugins: [typography, daisyui],
};

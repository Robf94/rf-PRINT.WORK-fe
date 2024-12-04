/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        h1: "36px",
        h2: "30px",
        h3: "24px",
        h4: "20px",
        h5: "16px",
        h6: "12px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};

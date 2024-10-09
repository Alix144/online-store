/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0055B6",
        secondary: "#FFD74B",
        silver: "#EFEFEF",
        lightGray: "#C5C5C5",
        darkGray: "#212121",
        danger: "#FF6863",
        success: "#7AFF6D"
      },
    },
  },
  plugins: [],
};

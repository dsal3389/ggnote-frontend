/** @type {import('tailwindcss').Config} */

function cssVar(varName) {
  return ({ opacityValue }) => {
    return `rgba(var(${varName}), ${opacityValue || 1})`;
  };
}

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: cssVar("--color-bg-primary"),
        accent: cssVar("--color-bg-accent"),
      },
      borderColor: {
        DEFAULT: cssVar("--color-border"),
      },
      textColor: {
        normal: cssVar("--color-text"),
      },
    },
  },
  plugins: [],
};

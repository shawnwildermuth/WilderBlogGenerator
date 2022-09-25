module.exports = {
  content: [
    "./input/**/*.{html,njk}", 
    "./client/**/*.vue",
    "./src/**/*.js"
  ],
  safelist: [
    { pattern: /embed-/ },
    { pattern: /grid-/, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
    { pattern: /gap-/ }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cabin", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        serif: ["'Source Serif 4'", "Times New Roman", "serif"],
        mono: [ "'Source Code Pro'", "monospaced"]
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover"],
    },
  },
  plugins: [],
};

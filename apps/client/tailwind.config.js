// apps/client/tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // client app itself
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}", // include UI components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

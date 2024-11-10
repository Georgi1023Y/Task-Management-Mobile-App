/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // DARK MODE
        darkBackground: "#121212",
        darkDiv: "#1C1C1C",
        darkText: "#B0B0B0",
        darkInput: "#333333",
        buttonDark: "#2E2E2E",
        // LIGHT MODE
        lightBackground: "#FFFFFF",
        lightDiv: "#F0F0F0",
        lightText: "#5A5A5A",
        lightInputText: "#191818",
        otherLightText: '#D9D9D9',
        lightInput: "#F7F7F7",
        otherGrayColor: "#F3F3F3",
        // OTHER COLORS
        myGrayText: "#2A2A2A",
        greenText: "#00A86B",
        redText: "#FF4D4D",
        blueButton: "#3A6EA5",
        chartsColor: "#14141C"
      }
    },
  },
  plugins: [],
}
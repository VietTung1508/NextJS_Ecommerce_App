/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        70: "70%",
      },

      height: {
        94: "94%",
        704: "40rem",
      },

      inset: {
        minus12: "-12px",
        minus55: "-55px",
      },

      margin: {
        minus20: "-20px",
        minus52: "-52px",
      },

      keyframes: {
        drop: {
          "0%": { opacity: "0", transform: "translateY(-100px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },

        show: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },

        rotate: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },

      animation: {
        drop: "drop 0.7s ease",
        show: "show 0.8s ease",
      },

      flex: {
        7: "7",
      },

      colors: {
        "auth-btn": "#f9b17a",
        "auth-bg": "#161E31",
        "auth-bg2": "#2d3250",
        "auth-inp": "#424769",
        "auth-text": "#676f9d",
        "nav-bg": "#F2F1EE",
        "home-main-color": "#ED1F26",
        "stock-color": "#498374",
        "footer-color": "#333333",
        "admin-sidebar": "#2E284C",
      },
    },
  },
  plugins: [],
};

module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        "login-bg":
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./assets/login_bg.jpg')",
        // general: "linear-gradient(#f2f3f4, #f2f3f4)",
        general: "linear-gradient(#edf2f9, #edf2f9)",

      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};

module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        "login-bg":
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('./assets/login_bg.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "b05c6600e2af5c1cb9aa1f3d6e7a9778"),
    },
  },
  url: env("SERVER_URL", "https://backend-cartnyou.herokuapp.com"),
});

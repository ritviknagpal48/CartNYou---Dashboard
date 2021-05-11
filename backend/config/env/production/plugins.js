module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: env("SMTP_HOST", "smtp.gmail.com"),
      port: env.int("SMTP_PORT", 465),
      auth: {
        type: "OAuth2",
        accessToken: env("SMTP_ACCESS_TOKEN"),
        refreshToken: env("SMTP_REFRESH_TOKEN"),
        expires: env.int("SMTP_EXPIRES", 3599),
        user: env("SMTP_USER_EMAIL"),
        clientId: env("SMTP_CLIENT_ID"),
        clientSecret: env("SMTP_CLIENT_SECRET"),
        accessUrl: env(
          "SMTP_TOEKN_ENDPOINT",
          "https://oauth2.googleapis.com/token"
        ),
      },
      // ... any custom nodemailer options
      secure: true,
      service: "gmail",
      from: `"CartNYou Support" <${env("SMTP_USER_EMAIL")}>`,
      tls: {
        rejectUnauthorized: false,
      },
    },
    settings: {
      defaultFrom: env("SMTP_USER_EMAIL"),
      defaultReplyTo: env("SMTP_USER_EMAIL"),
    },
  },
});

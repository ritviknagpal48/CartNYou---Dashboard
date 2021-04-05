module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {

        uri: env('DATABASE_URI'),

        // host: env('DATABASE_HOST', 'cartnyou.sqlov.mongodb.net/'),
        // srv: env.bool('DATABASE_SRV', true),
        // port: env.int('DATABASE_PORT', 27017),
        // database: env('DATABASE_NAME', 'developers'),
        // username: env('DATABASE_USERNAME', 'admin'),
        // password: env('DATABASE_PASSWORD', '123cartnyou'),
      },
      options: {
        // authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        // ssl: env.bool('DATABASE_SSL', true),
        ssl: true,
      },
    },
  },
});

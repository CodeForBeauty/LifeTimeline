export default () => ({
  app: {
    port: process.env.APP_PORT,
    secretKey: process.env.SECRET_KEY,
  },
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
});

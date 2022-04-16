const KEY = "YOUR_secret_key";
const DB_NAME = "/test";

const config = {
  port: process.env.PORT || 3005,
  jwtSecret: process.env.JWT_SECRET || KEY,
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      DB_NAME,
};

export default config;

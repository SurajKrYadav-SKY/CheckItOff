const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3001,
  DB_URL: process.env.DB_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  SALT: process.env.SALT,
  ORIGIN1: process.env.ORIGIN1,
  ORIGIN2: process.env.ORIGIN2,
};

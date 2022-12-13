const dotenv = require("dotenv").config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
  JWT_SEC: process.env.JWT_SEC,
};

module.exports = config;

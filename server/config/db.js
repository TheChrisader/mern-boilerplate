const mongoose = require("mongoose");
const config = require("./config");

const { MONGO_URL } = config;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB is connected");
  } catch (err) {
    console.log("Database connection failed");
  }
};

module.exports = connectDB;

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  // BUilding connection url
  const DB_URL = process.env.MONGO_URL.replace(
    "<PASSWORD>",
    process.env.MONGO_PASSWORD
  );
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log(`Connected to mongo db database ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;

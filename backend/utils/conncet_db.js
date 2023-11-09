const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connection established");
  } catch (error) {
    console.log("Error");
  }
};

module.exports = connectDB;

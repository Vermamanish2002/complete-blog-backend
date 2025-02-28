const mongoose = require("mongoose");

require("dotenv").config();
console.log("MongoDB URI:", process.env.MONGO_URI);  // Debugging line


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;

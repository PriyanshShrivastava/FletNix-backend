const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter a email address to sign up"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  age: {
    type: Number,
    required: [true, "Please enter your age"],
  },
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "The name of the user is required."],
  },
  lastName: {
    type: String,
    required: [true, "The last name of the user is required."],
  },
  email: {
    type: String,
    required: [true, "The email of the user is required."],
  },
  password: {
    type: String,
    required: [true, "The pasword of the user is required."],
  },
  cpassword: {
    type: String,
    required: [true, "The confirm pasword of the user is required."],
  },
  bloodType: {
    type: String,
    enum: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"],
    required: [true, "Blood type is required."],
  },
  avialble: {
    type: String,
    enum: ["YES", "NO"],
    required: [true, "Describe aviablity required"],
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  State: {
    type: String,
    required: false,
  },
  City: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: false,
  },
  updated_at: {
    type: Date,
    required: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);

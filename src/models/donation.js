const mongoose = require("mongoose");
// var ObjectId = mongoose.Schema.Types.ObjectId;

const donations = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, "patient name is required"],
  },
  hospitalName: {
    type: String,
    required: [true, "Hospital name is required."],
  },

  description: {
    type: String,
    required: [true, "Description for donation is required."],
  },
  bloodType: {
    type: String,
    enum: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"],
    required: [true, "Blood type is required."],
  },
  phone: {
    type: Number,
    required: false,
  },
  State: {
    type: String,
    required: [true, "State Name is Required"],
  },
  City: {
    type: String,
    required: [true, "City Name is Required"],
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: false,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model("Donation", donations);

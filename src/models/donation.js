const mongoose = require("mongoose");
// var ObjectId = mongoose.Schema.Types.ObjectId;

const donations = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, "Patient name for donation is required."],
  },
  phone: {
    type: String,
    required: [true, "Contact  for donation is required."],
  },
  hospitalName: {
    type: String,
    required: [true, "Hospital Name for donation is required."],
  },
  State: {
    type: String,
    required: [true, "State Name for donation is required."],
  },
  City: {
    type: String,
    required: [true, "City Name for donation is required."],
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
  // date: {
  //   type: new date(),
  //   required: [true, "Date is required"],
  // },
  // this is date method
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

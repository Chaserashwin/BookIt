const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  experience: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  qty: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  username: { type: String, required: true },
  useremail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = { Booking };

const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  about: { type: String, required: true },
  photoUrl: { type: String, required: true },
  dates: { type: [Date], required: true },
  timeSlots: [
    {
      time: { type: String, required: true },
      left: { type: Number, required: true },
      soldOut: { type: Boolean, default: false },
    },
  ],
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = { Experience };

const express = require("express");
const { Booking } = require("../models/booking");
const bookingRouter = express.Router();

bookingRouter.post("/", async (req, res) => {
  try {
    console.log("Incoming booking data:", req.body);
    const { id, username, useremail, experience, date, time } = req.body;

    //Validation for required fields
    if (!username || !useremail || !experience || !date || !time) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    //Prevent double booking for same experience/time/date
    const existingBooking = await Booking.findOne({
      experience,
      date,
      time,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This time slot is already booked. Please choose another.",
      });
    }

    //Create new booking
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
});

module.exports = bookingRouter;

const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const promoRouter = require("./routes/promo");
const bookingRouter = require("./routes/booking");
const experienceRouter = require("./routes/experience");
require("dotenv").config();

const app = express();
app.use(express.json());

// List of allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://bookit-frontend-ejtartf5y-chaserashwin-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

//getting all the experiences & experienceById
app.use("/experiences", experienceRouter);

//validate promo codes
app.use("/promo/validate", promoRouter);

//Store booking details
app.use("/bookings", bookingRouter);

app.get("/", (req, res) => {
  res.send("✅ Bookit Backend API is running successfully!");
});

// Database connection (connect once per serverless cold start)
connectDB()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database connection error:", err));

// ✅ No app.listen() here — export the app instead
module.exports = app;

// connectDB()
//   .then(() => {
//     console.log("database connection established...");
//     app.listen(3000, () => {
//       console.log("Server is successfully listening to the port 3000...");
//     });
//   })
//   .catch((err) => {
//     console.log("database cannot be connected " + err);
//   });

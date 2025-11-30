const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

// ------------------ Middleware ------------------
app.use(express.json());

// ------------------ CORS ------------------
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// ------------------ ROUTES ------------------
app.use("/auth", require("./routes/auth"));              // <--- correct
app.use("/api/user", require("./routes/userRoutes"));    // <--- correct
app.use("/api/crop", require("./routes/prediction"));    // <--- correct

// ------------------ MongoDB ------------------
const MONGO_URL = process.env.MONGOURL;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✔ MongoDB connected successfully!"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ------------------ Server ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

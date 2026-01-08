console.log("FLASK_URL LOADED AS:", process.env.FLASK_URL);

const express = require("express");
const router = express.Router();
const axios = require("axios");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const History = require("../models/predictionHistory");
const { requireSignin } = require("../middleware");

// ---------------- Cloudinary Setup ----------------
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "crop-disease",
        allowed_formats: ["jpg"],
        resource_type: "image",
        transformation: [],      // ❗ NO TRANSFORMATIONS
        format: "jpg",           // Only convert, no resize
        quality: "auto:best"     // Keep original quality
    }
});


const upload = multer({ storage });

// ---------------- Upload + Predict Route ----------------
// ---------------- Upload + Predict Route ----------------
router.post(
  "/upload",
  requireSignin,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      console.log("USER ID:", req.userId);
      console.log("Uploaded File:", req.file);

      const imageUrl = req.file.path;
      console.log("Final Cloudinary URL:", imageUrl);

      // 🔥 Send image URL to Flask
      const flaskResponse = await axios.post(
        process.env.FLASK_URL,
        { imageUrl },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Flask Response:", flaskResponse.data);

      const result = flaskResponse.data;

      // ✅ Save FULL result (optional but recommended)
      await History.create({
        userId: req.userId,
        crop: result.crop,
        disease: result.disease,
        cause: result.cause,
        prevention: result.prevention,
        treatment: result.treatment,
        fertilizer: result.fertilizer,
        dos_and_donts: result.dos_and_donts,
        imageUrl
      });

      // ✅ SEND FULL FLASK RESPONSE TO FRONTEND
      res.json({
        message: "Prediction successful",
        prediction: {
          ...result,
          imageUrl
        }
      });

    } catch (err) {
      console.error("FULL ERROR:", err);
      res.status(500).json({ error: err.message || err });
    }
  }
);


// ---------------- Fetch User Prediction History ----------------
router.get("/history", requireSignin, async (req, res) => {
    try {
        const records = await History.find({ userId: req.userId }).sort({
            createdAt: -1
        });

        res.json(records);
    } catch (err) {
        console.error("FULL ERROR:", err);
        res.status(500).json({ error: err.message || err });
    }
});

module.exports = router;

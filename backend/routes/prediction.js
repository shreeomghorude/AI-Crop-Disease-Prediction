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
    cloudinary: cloudinary,
    params: {
        folder: "crop-disease",
        allowed_formats: ["jpg", "jpeg", "png"]
    }
});

const upload = multer({ storage });

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

           const imageUrl = req.file.path.replace("/upload/", "/upload/f_jpg/");
            console.log("Processed Cloudinary URL:", imageUrl);


            // Send image to Flask
            const flaskResponse = await axios.post(
                process.env.FLASK_URL,
                { imageUrl },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Flask Response:", flaskResponse.data);

            const result = flaskResponse.data;

            // ---- FIX START ----
            const crop = result.Crop;
            const disease = Array.isArray(result.Disease)
                ? result.Disease[0]
                : result.Disease;

            const cause = result.Cause || [];
            const prevention = result.Prevent_Cure || [];
            // ---- FIX END ----

            // Save to MongoDB
            const history = await History.create({
                userId: req.userId,
                crop,
                disease,
                cause,
                prevention,
                imageUrl
            });

            res.json({
                message: "Prediction successful",
                prediction: {
                    crop,
                    disease,
                    cause,
                    prevention,
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

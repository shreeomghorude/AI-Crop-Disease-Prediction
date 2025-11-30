const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { requireSignin } = require("../middleware");

// Fetch logged-in user
router.get("/me", requireSignin, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user)
            return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

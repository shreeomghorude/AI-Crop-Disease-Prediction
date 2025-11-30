const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

// ----------------- Signup -----------------
router.post("/signup", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !email || !password) {
            return res.status(400).send("Required fields missing");
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).send("Email already exists");

        const hashedPw = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPw
        });

        res.status(200).json({ message: "User registered", user: newUser });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------- Login -----------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).send("Email and Password required");

        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send("Incorrect password");

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id,
            firstname: user.firstname
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------- Token Verification -----------------
router.post("/checktoken", (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ valid: false });

        jwt.verify(token, JWT_SECRET);

        res.json({ valid: true });
    } catch (err) {
        res.status(401).json({ valid: false });
    }
});

module.exports = router;

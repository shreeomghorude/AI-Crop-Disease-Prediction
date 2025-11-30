const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

exports.requireSignin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user info
        req.userId = decoded._id;

        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

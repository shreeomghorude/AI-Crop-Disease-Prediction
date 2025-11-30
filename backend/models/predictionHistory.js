const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },

    crop: {
        type: String,
        required: true
    },

    disease: {
        type: String,
        required: true
    },

    cause: {
        type: [String],   // Array of strings
        default: []
    },

    prevention: {
        type: [String],   // Array of strings
        default: []
    },

    imageUrl: {
        type: String,     // Optional: only if you want to save image path
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("History", historySchema);

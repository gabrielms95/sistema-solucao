// backend/models/Solution.js
const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
    problem: {
        type: String,
        required: true,
        trim: true,
    },
    solution: {
        type: String,
        required: true,
        trim: true,
    },
    keywords: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Solution', SolutionSchema);

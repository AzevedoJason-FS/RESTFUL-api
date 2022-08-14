const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    collection_Name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Movie', movieSchema);
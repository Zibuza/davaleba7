// models/Movie.model.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    genre: String,
    description: String,
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Director" 
    }
});

module.exports = mongoose.model("Movie", movieSchema);

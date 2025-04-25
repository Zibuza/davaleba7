const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true, enum: ['action', 'comedy', 'drama', 'sci-fi'] },
  description: String,
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true }
});

module.exports = mongoose.model("Movie", movieSchema);

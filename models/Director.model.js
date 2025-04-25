const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
  name: String,
  birthYear: Number,
  nationality: String,
});

directorSchema.virtual("movies", {
  ref: "Movie",
  localField: "_id",
  foreignField: "director",
  justOne: false,
});

module.exports = mongoose.model("Director", directorSchema);

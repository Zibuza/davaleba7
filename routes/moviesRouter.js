const { Router } = require("express");
const moviesRouter = Router();
const Movie = require("../models/Movie.model");
const { movieSchema } = require("../validations/validations");
const { isValidObjectId } = require("mongoose")
const checkDirectorMiddleware = (req, res, next) => {
  if (!req.headers["director-id"]) {
    return res.status(400).json({ message: "Director ID is required" });
  }
  next();
};

moviesRouter.get("/", async (req, res) => {
  try {
    const { genre, year, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (genre) filters.genre = genre;
    if (year) filters.year = year;

    const movies = await Movie.find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("director");

    const totalMovies = await Movie.countDocuments(filters);

    res.json({
      totalMovies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: page,
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

moviesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const movie = await Movie.findById(id).populate("director");
    res.json(movie);
  } else {
    res.status(400).json({ message: "Invalid ID" });
  }
});

moviesRouter.post("/", checkDirectorMiddleware, async (req, res) => {
  const { error } = movieSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const movie = await Movie.create({
    ...req.body,
    director: req.headers["director-id"],
  });

  res.status(201).json({ message: "Movie created", movie });
});

moviesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const movie = await Movie.findByIdAndDelete(id);
    if (movie) {
      await Director.updateOne(
        { _id: movie.director },
        { $pull: { movies: movie._id } }
      );
      res.status(200).json({ message: "Movie deleted successfully", movie });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid ID" });
  }
});

module.exports = moviesRouter;

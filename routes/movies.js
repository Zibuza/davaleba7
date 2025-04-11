const { Router } = require("express");
const moviesRouter = Router();
const Movie = require("../models/Movie.model");
const { isValidObjectId } = require("mongoose");

moviesRouter.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().populate("director");
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "შეცდომა", error });
  }
});

moviesRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
        const movie = await Movie.findById(id).populate("director");
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        res.json(movie);
    } else {
        res.status(400).json({ message: "Invalid ID" });
    }
});



moviesRouter.post("/", async (req, res) => {
  const directorId = req.headers["director-id"];
  const { title, year, genre, description } = req.body;

  if (!title || !year || !directorId) {
    return res
      .status(400)
      .json({ message: "title, year და director-id სავალდებულოა" });
  }

  try {
    const newMovie = await Movie.create({
      title,
      year,
      genre,
      description,
      director: directorId,
    });
    res
      .status(201)
      .json({ message: "ფილმი წარმატებით შეიქმნა", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "შეცდომა ფილმის შექმნისას", error });
  }
});

moviesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const movie = await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully", movie });
  } else {
    res.status(400).json({ message: "Invalid ID" });
  }
});

moviesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Updated successfully", updatedMovie });
  } else {
    res.status(400).json({ message: "Invalid ID" });
  }
});

module.exports = moviesRouter;

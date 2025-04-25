const { Router } = require("express");
const directorsRouter = Router();
const Director = require("../models/Director.model");
const { directorSchema } = require("../validations/validations");
const { isValidObjectId } = require("mongoose");

directorsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const director = await Director.findById(id).populate("movies");
    res.json(director);
  } else {
    res.status(400).json({ message: "Invalid ID" });
  }
});

directorsRouter.post("/", async (req, res) => {
  const { error } = directorSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const director = await Director.create(req.body);
  res.status(201).json({ message: "Director created", director });
});

directorsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const director = await Director.findByIdAndDelete(id);
    if (director) {
      
      await Movie.deleteMany({ director: director._id });
      res.status(200).json({ message: "Director and their movies deleted" });
    } else {
      res.status(404).json({ message: "Director not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid ID" });
  }
});

module.exports = directorsRouter;

const { Router } = require("express");
const directorsRouter = Router();
const Director = require("../models/Director.model");
const { isValidObjectId } = require("mongoose");

directorsRouter.get("/", async (req, res) => {
    try {
        const directors = await Director.find().populate("movies"); // ფილმების სია მოყვება
        res.json(directors);
    } catch (error) {
        res.status(500).json({ message: "შეცდომა", error });
    }
});


directorsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
        const director = await Director.findById(id).populate("movies");
        if (!director) return res.status(404).json({ message: "რეჟისორი არ მოიძებნა" });
        res.json(director);
    } else {
        res.status(400).json({ message: "Invalid ID" });
    }
});


directorsRouter.post("/", async (req, res) => {
    const { name, birthYear, nationality } = req.body;
    if (!name) {
        return res.status(400).json({ message: "name is required" });
    }

    await Director.create({ name, birthYear, nationality });
    res.status(201).json({ message: "Director created successfully" });
});

directorsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
        const director = await Director.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully", director });
    } else {
        res.status(400).json({ message: "Invalid ID" });
    }
});

directorsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
        const updatedDirector = await Director.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Updated successfully", updatedDirector });
    } else {
        res.status(400).json({ message: "Invalid ID" });
    }
});

module.exports = directorsRouter;

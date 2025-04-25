const Joi = require("joi");


const movieSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(2025).required(),
  genre: Joi.string().valid("action", "comedy", "drama", "sci-fi").required(),
  description: Joi.string().required(),
  director: Joi.string().required(),
});

const directorSchema = Joi.object({
  name: Joi.string().required(),
  birthYear: Joi.number().integer().min(1900).max(2025).required(),
  nationality: Joi.string().required(),
});

module.exports = { movieSchema, directorSchema };

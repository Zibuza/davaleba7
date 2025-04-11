const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  name: String,
  birthYear: Number,
  nationality: String
});


directorSchema.virtual('movies', {
  ref: 'Movie',
  localField: '_id',
  foreignField: 'director'
});

directorSchema.set('toObject', { virtuals: true });
directorSchema.set('toJSON', { virtuals: true });

const Director = mongoose.model('Director', directorSchema);
module.exports = Director;

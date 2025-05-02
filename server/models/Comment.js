const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  movie_id: mongoose.Schema.Types.ObjectId,
  text: String,
  date: Date
});

module.exports = mongoose.model('Comment', commentSchema, 'comments');
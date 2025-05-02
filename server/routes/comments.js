const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get all comments for a specific movie
router.get('/movie/:movieId', async (req, res) => {
  try {
    const comments = await Comment.find({ movie_id: req.params.movieId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new comment
router.post('/', async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    email: req.body.email,
    movie_id: req.body.movie_id,
    text: req.body.text,
    date: new Date()
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a comment
router.patch('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (req.body.text) comment.text = req.body.text;
    if (req.body.name) comment.name = req.body.name;
    if (req.body.email) comment.email = req.body.email;

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
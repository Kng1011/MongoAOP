const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Comment = require('../models/Comment');

// Get all movies with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .select('title year poster genres')
      .sort({ year: -1 })
      .skip(skip)
      .limit(limit);

    const totalMovies = await Movie.countDocuments();

    res.json({
      movies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search movies
router.get('/search', async (req, res) => {
  try {
    const { term, type, page = 1 } = req.query;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    let query = {};
    if (term) {
      switch (type) {
        case 'title':
          query.title = { $regex: term, $options: 'i' };
          break;
        case 'genre':
          query.genres = { $regex: term, $options: 'i' };
          break;
        case 'director':
          query.directors = { $regex: term, $options: 'i' };
          break;
        case 'cast':
          query.cast = { $regex: term, $options: 'i' };
          break;
        default:
          query.title = { $regex: term, $options: 'i' };
      }
    }

    const movies = await Movie.find(query)
      .select('title year poster genres')
      .sort({ year: -1 })
      .skip(skip)
      .limit(limit);

    const totalMovies = await Movie.countDocuments(query);

    res.json({
      movies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get movie by ID with comments
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const comments = await Comment.find({ movie_id: req.params.id })
      .sort({ date: -1 })
      .limit(20);

    res.json({ movie, comments });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
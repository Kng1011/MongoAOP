import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import API_URL from '../config';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/movies/${id}`);
        setMovie(response.data.movie);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="error">Movie not found</div>;
  }

  return (
    <div className="movie-detail">
      <button onClick={() => navigate('/')} className="back-button">
        Back to Movies
      </button>
      
      <div className="movie-header">
        <h1>{movie.title} ({movie.year})</h1>
        {movie.poster && <img src={movie.poster} alt={movie.title} className="detail-poster" />}
      </div>

      <div className="movie-meta">
        <p><strong>Director:</strong> {movie.directors && movie.directors.join(', ')}</p>
        <p><strong>Cast:</strong> {movie.cast && movie.cast.join(', ')}</p>
        <p><strong>Genres:</strong> {movie.genres && movie.genres.join(', ')}</p>
        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
        {movie.imdb && movie.imdb.rating && (
          <p><strong>IMDB Rating:</strong> {movie.imdb.rating}/10</p>
        )}
      </div>

      <div className="movie-plot">
        <h3>Plot</h3>
        <p>{movie.fullplot || movie.plot || 'No plot available.'}</p>
      </div>

      <CommentSection movieId={id} />
    </div>
  );
}

export default MovieDetail;
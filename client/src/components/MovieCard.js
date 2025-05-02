import React from 'react';

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster">
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} />
        ) : (
          <div className="no-poster">No Poster Available</div>
        )}
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <div className="genres">
          {movie.genres && movie.genres.join(', ')}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
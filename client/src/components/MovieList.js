import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import API_URL from '../config';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ term: '', type: 'title' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { term, type } = searchParams;
        const url = term
          ? `${API_URL}/movies/search?page=${page}&term=${encodeURIComponent(term)}&type=${type}`
          : `${API_URL}/movies?page=${page}`;
        
        const response = await axios.get(url);
        setMovies(response.data.movies);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchParams]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleSearch = (term, type) => {
    setSearchParams({ term, type });
    setPage(1); // Reset to first page when searching
  };

  return (
    <div className="movie-list">
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <>
          {movies.length === 0 ? (
            <div className="no-results">
              No movies found matching your search criteria.
            </div>
          ) : (
            <>
              <div className="movies-grid">
                {movies.map((movie) => (
                  <MovieCard 
                    key={movie._id} 
                    movie={movie} 
                    onClick={() => handleMovieClick(movie._id)}
                  />
                ))}
              </div>
              <div className="pagination">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MovieList;
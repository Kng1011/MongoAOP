import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, searchType);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-input-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies..."
          className="search-input"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="search-type"
        >
          <option value="title">Title</option>
          <option value="genre">Genre</option>
          <option value="director">Director</option>
          <option value="cast">Cast</option>
        </select>
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 
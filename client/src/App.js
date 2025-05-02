import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <h1 className="header">MongoDB Movie Explorer</h1>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
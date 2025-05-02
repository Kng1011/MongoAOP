// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          MFLIX Movies
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
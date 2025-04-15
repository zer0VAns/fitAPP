import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Fitness App</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <Link to="/ejercicios" onClick={toggleMenu}>Ejercicios</Link>
            </li>
            <li>
              <Link to="/chat" onClick={toggleMenu}>Chat</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
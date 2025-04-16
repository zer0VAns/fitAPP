import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import AuthContext from './AuthContext';

function Header() {
  const { user} = useContext(AuthContext);
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Fitness App</h1>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ejercicios">Ejercicios</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              {user ? (
                <div>
                  {user.username && (
                    <div className="user-info">
                      <span><Link to ="/Perfil">Hola, {user.username}</Link></span>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Link to="/login">Login</Link> | <Link to="/register">Registro</Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
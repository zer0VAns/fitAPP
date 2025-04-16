// src/pages/Perfil.js
import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import './Perfil.css'; 


const Perfil = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="perfil-container">
      <h2 className='tit'>Datos del usuario</h2>
      <div className="perfil-info">
        <p><strong>Nombre:</strong> {user?.username}</p>
        <p><strong>Email:</strong> (no disponible aún)</p>
      </div>
      <div className='tit'>
        <button className="logout-btn" onClick={logout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Perfil;

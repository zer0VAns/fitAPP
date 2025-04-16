// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    const profileImage = localStorage.getItem('profileImage');
    if (token && username) {
      setUser({ username, profileImage });
    }
  }, []);

  const login = (username, token, profileImage = null) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    localStorage.setItem('profileImage', profileImage);
    setUser({ username, profileImage });
  };

  const updateProfileImage = (imageUrl) => {
    localStorage.setItem('profileImage', imageUrl);
    setUser((prev) => ({
      ...prev,
      profileImage: imageUrl,
    }));
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImage');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

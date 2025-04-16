// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';
import './App.css';
import ScrollTop from './components/ScrollTop';

function App() {
  return (
    <Router>
      <ScrollTop />
      <div className="app">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ListaEjercicios from './components/ListaEjercicios';
import Chat from './components/Chat';
import EjercicioDetail from './components/EjercicioDetail';
import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
    <div className="app">
    <Header />
    <div style={{flex:1}}>
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path="/ejercicios" element={<ListaEjercicios />} />
        <Route path="/ejercicios/:id" element={<EjercicioDetail />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      </div>
      <Footer />
    </div>
    </Router>
  );
}
export default App;
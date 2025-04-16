
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import ListaEjercicios from './components/ListaEjercicios';
import Chat from './components/Chat';
import EjercicioDetail from './components/EjercicioDetail';
import Login from './components/Login';
import Register from './components/Register';
import Perfil from './components/Perfil';

function AppRoutes() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div style={{ flex: 1 }} className={`pag ${isHomePage ? 'home-background' : ''}`}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ejercicios' element={<ListaEjercicios />} />
        <Route path='/ejercicios/:id' element={<EjercicioDetail />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/perfil' element={<Perfil />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;

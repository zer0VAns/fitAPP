import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartaEjercicios from './CartaEjercicios';
import './ListaEjercicios.css';

function ListaEjercicios() {
  const [ejercicios, setEjercicios] = useState([]);
  const [filteredEjercicios, setFilteredEjercicios] = useState([]);
  const [gruposMusculares, setGruposMusculares] = useState([]);
  const [selectedGrupo, setSelectedGrupo] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/ejercicios/')
      .then(response => response.json())
      .then(data => {
        setEjercicios(data);
        setFilteredEjercicios(data);

        // Extrae grupos musculares únicos
        const grupos = new Set();
        data.forEach(ej => {
          // Divide el campo grupo_muscular por comas y elimina espacios
          const gruposEjercicio = ej.grupo_muscular
            .split(',')
            .map(grupo => grupo.trim().toLowerCase());
          gruposEjercicio.forEach(grupo => grupos.add(grupo));
        });
        setGruposMusculares(['Todos', ...Array.from(grupos).sort()]);

        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los ejercicios');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedGrupo === 'Todos') {
      setFilteredEjercicios(ejercicios);
    } else {
      const filtered = ejercicios.filter(ej =>
        ej.grupo_muscular
          .toLowerCase()
          .split(',')
          .map(grupo => grupo.trim())
          .includes(selectedGrupo.toLowerCase())
      );
      setFilteredEjercicios(filtered);
    }
  }, [selectedGrupo, ejercicios]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="lista-ejercicios">
      <h2>Ejercicios</h2>
      <div className="filtro-grupo-muscular">
        <label htmlFor="grupo-muscular">Filtrar por grupo muscular: </label>
        <select
          id="grupo-muscular"
          value={selectedGrupo}
          onChange={e => setSelectedGrupo(e.target.value)}
        >
          {gruposMusculares.map(grupo => (
            <option key={grupo} value={grupo}>
              {grupo.charAt(0).toUpperCase() + grupo.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="ejercicios-grid">
        {filteredEjercicios.length > 0 ? (
          filteredEjercicios.map(ej => (
            <Link to={`/ejercicios/${ej.id}`} key={ej.id} className="ejercicio-link">
              <CartaEjercicios
                nombre={ej.nombre}
                descripcion={ej.descripcion}
                tecnica={ej.tecnica}
                erroresComunes={ej.errores_comunes}
                grupoMuscular={ej.grupo_muscular}
                videoURL={ej.video_url}
              />
            </Link>
          ))
        ) : (
          <p>No se encontraron ejercicios para este grupo muscular.</p>
        )}
      </div>
    </div>
  );
}

export default ListaEjercicios;
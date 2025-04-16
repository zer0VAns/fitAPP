import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EjercicioDetail.css';
import { ejercicioExtras } from './customContent';

function EjercicioDetail() {
  const { id } = useParams();
  const [ejercicio, setEjercicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/ejercicios/${id}/`)
      .then(response => response.json())
      .then(data => {
        setEjercicio(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar el ejercicio');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!ejercicio) return <div>Ejercicio no encontrado</div>;

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      try {
        const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
        return `https://www.youtube.com/embed/${videoId}`;
      } catch (error) {
        console.error('Error al procesar la URL de YouTube:', error);
        return null;
      }
    }
    return null;
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(ejercicio.video_url);

  return (
    <div className="ejercicio-detail">
      <h2>{ejercicio.nombre}</h2>
      {youtubeEmbedUrl ? (
        <div className="video-container">
          <iframe
            width="100%"
            height="400"
            src={youtubeEmbedUrl}
            title={`Video de ${ejercicio.nombre}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="video-placeholder">
          <p>No hay video disponible</p>
        </div>
      )}
      <p><strong>Descripción:</strong> {ejercicio.descripcion || 'No disponible'}</p>
      <p><strong>Grupo Muscular:</strong> {ejercicio.grupo_muscular || 'No disponible'}</p>
      <p><strong>Técnica:</strong> {ejercicio.tecnica || 'No disponible'}</p>
      <p><strong>Errores Comunes:</strong> {ejercicio.errores_comunes || 'No disponible'}</p>
      {ejercicioExtras[parseInt(id)]?.extraHtml}
    </div>
  );
}

export default EjercicioDetail;
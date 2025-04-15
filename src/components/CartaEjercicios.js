import React from 'react';
import './CartaEjercicios.css';

function CartaEjercicios({ nombre, descripcion, tecnica, erroresComunes, grupoMuscular, videoURL }) {
  // Función para obtener la miniatura de un video de YouTube
  const getYouTubeThumbnail = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      try {
        const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      } catch (error) {
        console.error('Error al procesar la URL de YouTube:', error);
        return null;
      }
    }
    return null;
  };

  const youtubeThumbnail = getYouTubeThumbnail(videoURL);

  return (
    <div className="carta-ejercicio">
      {/* Mostrar miniatura o placeholder */}
      {youtubeThumbnail ? (
        <div className="video-container">
          <img
            src={youtubeThumbnail}
            alt={`Miniatura de ${nombre}`}
            className="video-thumbnail"
          />
        </div>
      ) : (
        <div className="video-placeholder">
          <p>No hay video disponible</p>
        </div>
      )}

      <h3>{nombre}</h3>
      {descripcion && <p><strong>Descripción:</strong> {descripcion}</p>}
      <p><strong>Grupo Muscular:</strong> {grupoMuscular || 'No disponible'}</p>
      <p><strong>Técnica:</strong> {tecnica || 'No disponible'}</p>
      <p><strong>Errores Comunes:</strong> {erroresComunes || 'No disponible'}</p>
    </div>
  );
}

export default CartaEjercicios;
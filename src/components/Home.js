import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import './Home.css';
import Login from './Login';

function Home() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const token = await getAccessTokenSilently();
                const res = await axios.get('http://localhost:8000/api/perfil/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPerfil(res.data);
            } catch (error) {
                console.error('Error al obtener perfil:', error);
            }
        };

        if (isAuthenticated) {
            obtenerPerfil();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    return (
        <div>
            <h1>Bienvenido a la página Fitness que necesitas.</h1>
            <p className='desc'>Crea tu rutina, mira los ejercicios más populares,
             personaliza tu experiencia según tus objetivos.</p>
            <p>FitApp llegó para ayudarte a alcanzar tus objetivos</p>
            <button className='try'>Pruébala gratis</button>

            <p>Mira las opiniones de nuestros clientes</p>
            <p>.......................................</p>
            <p>Entrenar no debería ser tan difícil. Llegamos para salvarte la vida.</p>
            <p>
                .Rutinas para volumen, mantenerte o perder grasa <br />
                .Seguimiento de tu progreso <br />
                .IA entrenada para que te ayude en lo que necesites <br />
                .Interfaz intuitiva <br />
                .Ejercicios explicados con la técnica perfecta
            </p>

            <p>Pruébala que no te vas a arrepentir</p>
            <button className='try'>Pruébala gratis YA</button>

            <div>
                <h1>Inicio</h1>
                {perfil ? (
                    <div>
                        <p><strong>Email:</strong> {perfil.email}</p>
                        <p><strong>ID:</strong> {perfil.sub}</p>
                    </div>
                ) : (
                    isAuthenticated ? <p>Cargando perfil...</p> : <p>Inicia sesión para ver tu perfil</p>
                )}
            </div>
                <Login />
        </div>



    );
}

export default Home;

import { useRef } from 'react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import './Home.css';

function Home() {

    const scrollRef = useRef(null);
    const animateScroll = () => {
        const container = scrollRef.current;
        container.classList.add('animate-scroll');
        setTimeout(() => {
            container.classList.remove('animate-scroll');
        }, 400);
    };

    const scrollRight = () => {
        const container = scrollRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        animateScroll();
        if (Math.ceil(container.scrollLeft) >= maxScrollLeft) {
            // Volver al inicio
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // Scroll a la derecha
            container.scrollBy({ left: 420, behavior: 'smooth' });
        }
    };

    const scrollLeft = () => {
        const container = scrollRef.current;
        animateScroll();
        if (container.scrollLeft <= 0) {
            // Ir al final
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
            // Scroll a la izquierda
            container.scrollBy({ left: -420, behavior: 'smooth' });
        }
    };
    const { user } = useContext(AuthContext);
    return (
        <div className='homeB'>
            <div className='home'>
                <div className='titulo-box'>
                {user ? (
                    <div>
                    <h1 id='titulo'>Bienvenido de nuevo, {user.username}</h1>
                    {user.username && (
                        <div id='perfil'>
                            <p id='msjFinal'></p>
                            <span className='perfil-link'  id='f-button'><Link to="/Perfil">Crea tu rutina ya</Link></span>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                <h1 id='titulo'>Bienvenido a la página Fitness que necesitas.</h1>
                <button id='getStarted'>Get started ></button>
                </div>
            )}

                </div>
            </div>

            <div className="info-section">
                <p className="intro">Entrenar no debería ser tan difícil. Llegamos para salvarte la vida.</p>
                <p className="features">
                    <strong>.</strong>Rutinas para volumen, mantenerte o perder grasa <br />
                    <strong>.</strong>Seguimiento de tu progreso <br />
                    <strong>.</strong>IA entrenada para que te ayude en lo que necesites <br />
                    <strong>.</strong>Interfaz intuitiva <br />
                    <strong>.</strong>Ejercicios explicados con la técnica perfecta
                </p>
            </div>

            <div className="clientes">
                <p className="desc">
                    <span>Mira las opiniones de nuestros clientes</span>
                </p>

                <div className="scroll-wrapper">
                    <button className="arrow left" onClick={scrollLeft}>←</button>

                    <div className='clientBox' ref={scrollRef}>
                        <div id='cont-grid'>
                            <div id='cont1' className='boxclient'></div>
                            <div id='cont2' className='boxclient'></div>
                            <div id='cont3' className='boxclient'></div>
                            <div id='cont4' className='boxclient'></div>
                            <div id='cont5' className='boxclient'></div>
                            <div id='cont6' className='boxclient'></div>
                        </div>
                    </div>

                    <button className="arrow right" onClick={scrollRight}>→</button>
                </div>
            </div>
            {user ? (
                <div>
                    {user.username && (
                        <div id='perfil'>
                            <p id='msjFinal'>Que pasa {user.username}? Andas perdido?</p>
                            <span className='perfil-link'  id='f-button'><Link to="/Perfil">Crea tu rutina ya</Link></span>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <div className="cta-container">
                        <h2 className="cta-title">¿Qué estás esperando?</h2>
                        <button className="cta-button"><Link to='/Register'>Regístrate ></Link></button>
                    </div>
                </div>
            )}


        </div>
    );
}

export default Home;

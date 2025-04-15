import './Footer.css';

function Footer(){
    return(
        <footer className="footer">
        <p>&copy; 2025 FitApp. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="/about">Acerca de</a>
          <a href="/contact">Contacto</a>
          <a href="/privacidad">Política de privacidad</a>
        </div>
      </footer>
    );
}

export default Footer;
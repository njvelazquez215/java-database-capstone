// footer.js

function renderFooter() {
    const footer = document.getElementById("footer");
    if (!footer) return;

    footer.innerHTML = `
    <footer class="footer">
      <div class="footer-logo">
        <img src="../assets/images/logo/logo.png" alt="Logo" height="40" />
        <p>© Copyright 2025 - MediConnect. Todos los derechos reservados.</p>
      </div>
      <div class="footer-links">
        <div class="footer-column">
          <h4>Empresa</h4>
          <a href="#">Acerca de</a>
          <a href="#">Carreras</a>
          <a href="#">Prensa</a>
        </div>
        <div class="footer-column">
          <h4>Soporte</h4>
          <a href="#">Cuenta</a>
          <a href="#">Centro de Ayuda</a>
          <a href="#">Contacto</a>
        </div>
        <div class="footer-column">
          <h4>Legales</h4>
          <a href="#">Términos</a>
          <a href="#">Política de Privacidad</a>
          <a href="#">Licencias</a>
        </div>
      </div>
    </footer>
  `;
}

// Ejecutamos automáticamente al cargar
document.addEventListener("DOMContentLoaded", renderFooter);
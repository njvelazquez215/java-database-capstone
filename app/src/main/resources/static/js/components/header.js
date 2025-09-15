// header.js

function renderHeader() {
    const headerDiv = document.getElementById("header");
    if (!headerDiv) return;

    // Verificamos si estamos en la página de inicio ("/")
    if (window.location.pathname.endsWith("/")) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        return;
    }

    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    // Validación: si está logueado pero no tiene token
    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
        localStorage.removeItem("userRole");
        alert("Sesión expirada o inicio de sesión inválido. Por favor, inicie sesión nuevamente.");
        window.location.href = "/";
        return;
    }

    let headerContent = "";

    // Encabezado según rol
    if (role === "admin") {
        headerContent += `
      <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Agregar Doctor</button>
      <a href="#" id="logoutBtn">Cerrar sesión</a>
    `;
    } else if (role === "doctor") {
        headerContent += `
      <a href="/doctor/dashboard" id="homeBtn">Inicio</a>
      <a href="#" id="logoutBtn">Cerrar sesión</a>
    `;
    } else if (role === "patient") {
        headerContent += `
      <a href="/login.html" id="loginBtn">Iniciar sesión</a>
      <a href="/register.html" id="registerBtn">Registrarse</a>
    `;
    } else if (role === "loggedPatient") {
        headerContent += `
      <a href="/pages/patientDashboard.html" id="homeBtn">Inicio</a>
      <a href="/pages/appointments.html" id="appointmentsBtn">Citas</a>
      <a href="#" id="logoutPatientBtn">Cerrar sesión</a>
    `;
    }

    headerDiv.innerHTML = headerContent;
    attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    const logoutPatientBtn = document.getElementById("logoutPatientBtn");
    if (logoutPatientBtn) {
        logoutPatientBtn.addEventListener("click", logoutPatient);
    }

    const homeBtn = document.getElementById("homeBtn");
    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            const role = localStorage.getItem("userRole");
            if (role === "doctor") {
                window.location.href = "/doctor/dashboard";
            } else if (role === "loggedPatient") {
                window.location.href = "/pages/patientDashboard.html";
            }
        });
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
}

function logoutPatient() {
    localStorage.removeItem("token");
    localStorage.setItem("userRole", "patient");
    window.location.href = "/pages/patientDashboard.html";
}

// Ejecutamos el renderHeader automáticamente si existe el contenedor
document.addEventListener("DOMContentLoaded", renderHeader);
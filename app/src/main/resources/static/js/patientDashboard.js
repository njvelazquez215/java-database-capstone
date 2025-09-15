// Imports
import { getDoctors, filterDoctors } from './services/doctorServices.js';
import { openModal } from './components/modals.js';
import { createDoctorCard } from './components/doctorCard.js';
import { patientSignup, patientLogin } from './services/patientServices.js';

// Cargar tarjetas al cargar la página + listeners de eventos
document.addEventListener("DOMContentLoaded", () => {
    // Cargar todos los doctores al inicio
    loadDoctorCards();

    // Abrir modal de registro de paciente
    const signupBtn = document.getElementById("patientSignup");
    if (signupBtn) {
        signupBtn.addEventListener("click", () => openModal("patientSignup"));
    }

    // Abrir modal de login de paciente
    const loginBtn = document.getElementById("patientLogin");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => openModal("patientLogin"));
    }

    // Eventos de búsqueda y filtros
    document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
    document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
    document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);
});

// Cargar todos los médicos
function loadDoctorCards() {
    getDoctors()
        .then(doctors => {
            const contentDiv = document.getElementById("content");
            contentDiv.innerHTML = "";

            doctors.forEach(doctor => {
                const card = createDoctorCard(doctor);
                contentDiv.appendChild(card);
            });
        })
        .catch(error => {
            console.error("❌ Failed to load doctors:", error);
            document.getElementById("content").innerHTML = "<p>Error al cargar los doctores.</p>";
        });
}

// Filtro de búsqueda y selectores
function filterDoctorsOnChange() {
    const name = document.getElementById("searchBar").value.trim() || null;
    const time = document.getElementById("filterTime").value || null;
    const specialty = document.getElementById("filterSpecialty").value || null;

    filterDoctors(name, time, specialty)
        .then(response => {
            const doctors = response.doctors || [];
            const contentDiv = document.getElementById("content");
            contentDiv.innerHTML = "";

            if (doctors.length > 0) {
                doctors.forEach(doctor => {
                    const card = createDoctorCard(doctor);
                    contentDiv.appendChild(card);
                });
            } else {
                contentDiv.innerHTML = "<p>No se encontraron médicos con los filtros aplicados.</p>";
            }
        })
        .catch(error => {
            console.error("❌ Error al filtrar doctores:", error);
            alert("❌ Ocurrió un error al aplicar los filtros.");
        });
}

// Registro de Paciente
window.signupPatient = async function () {
    try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;

        const data = { name, email, password, phone, address };
        const { success, message } = await patientSignup(data);

        if (success) {
            alert(message);
            document.getElementById("modal").style.display = "none";
            window.location.reload();
        } else {
            alert(message);
        }
    } catch (error) {
        console.error("❌ Signup failed:", error);
        alert("❌ Error al registrarse. Inténtelo nuevamente.");
    }
};

// Inicio de Sesión de Paciente
window.loginPatient = async function () {
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await patientLogin({ email, password });

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.token);
            selectRole('loggedPatient');  // ⚠️ Esta función debe estar definida globalmente
            window.location.href = '/pages/loggedPatientDashboard.html';
        } else {
            alert('❌ Credenciales inválidas');
        }
    } catch (error) {
        console.error("❌ Error en loginPatient:", error);
        alert("❌ Error al iniciar sesión. Inténtelo más tarde.");
    }
};
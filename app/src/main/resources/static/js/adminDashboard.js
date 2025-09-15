import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

// Al cargar la página, renderiza los médicos
window.onload = () => {
    loadDoctorCards();

    // Evento botón Agregar Médico
    const addDocBtn = document.getElementById('addDocBtn');
    if (addDocBtn) {
        addDocBtn.addEventListener('click', () => {
            openModal('addDoctor');
        });
    }

    // Eventos de búsqueda y filtrado
    document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
    document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
    document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);

    // Evento envío de formulario agregar médico
    document.getElementById("addDoctorForm").addEventListener("submit", adminAddDoctor);
};

/**
 * Cargar todos los médicos del backend
 */
async function loadDoctorCards() {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
}

/**
 * Renderiza la lista de tarjetas de médicos en el DOM
 */
function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";

    if (doctors.length === 0) {
        contentDiv.innerHTML = "<p>No se encontraron médicos.</p>";
        return;
    }

    doctors.forEach((doc) => {
        const card = createDoctorCard(doc);
        contentDiv.appendChild(card);
    });
}

/**
 * Filtro dinámico por nombre, horario y especialidad
 */
async function filterDoctorsOnChange() {
    const name = document.getElementById("searchBar").value.trim();
    const time = document.getElementById("filterTime").value;
    const specialty = document.getElementById("filterSpecialty").value;

    const filteredDoctors = await filterDoctors(name, time, specialty);
    renderDoctorCards(filteredDoctors);
}

/**
 * Envío del formulario para agregar un nuevo médico
 */
async function adminAddDoctor(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Debe iniciar sesión como administrador.");
        return;
    }

    const name = document.getElementById("doctorName").value;
    const email = document.getElementById("doctorEmail").value;
    const password = document.getElementById("doctorPassword").value;
    const mobile = document.getElementById("doctorMobile").value;
    const specialty = document.getElementById("doctorSpecialty").value;

    const availableTime = Array.from(document.querySelectorAll("input[name='availability']:checked"))
        .map(cb => cb.value);

    const doctor = {
        name,
        email,
        password,
        mobile,
        specialty,
        time: availableTime
    };

    const response = await saveDoctor(doctor, token);

    if (response.success) {
        alert("Médico agregado exitosamente.");
        document.getElementById("addDoctorForm").reset();
        loadDoctorCards();
        document.getElementById("addDoctorModal").style.display = "none";
    } else {
        alert("Error al agregar médico: " + response.message);
    }
}
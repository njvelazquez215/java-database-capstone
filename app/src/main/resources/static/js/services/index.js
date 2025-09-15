// index.js

import { openModal } from "../components/modals.js";
import { API_BASE_URL } from "../config/config.js";
import { selectRole } from "../render.js";

const ADMIN_API = API_BASE_URL + '/admin';
const DOCTOR_API = API_BASE_URL + '/doctor/login';

window.onload = function () {
    const adminBtn = document.getElementById('adminLogin');
    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            openModal('adminLogin');
        });
    }

    const doctorBtn = document.getElementById('doctorLogin');
    if (doctorBtn) {
        doctorBtn.addEventListener('click', () => {
            openModal('doctorLogin');
        });
    }
};

// ADMIN login
window.adminLoginHandler = async function () {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    const admin = { username, password };

    try {
        const response = await fetch(ADMIN_API + "/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(admin)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            selectRole("admin");
        } else {
            alert("¡Credenciales inválidas!");
        }
    } catch (error) {
        console.error("Error en adminLoginHandler:", error);
        alert("Ocurrió un error inesperado.");
    }
};

// DOCTOR login
window.doctorLoginHandler = async function () {
    const email = document.getElementById("doctorEmail").value;
    const password = document.getElementById("doctorPassword").value;

    const doctor = { email, password };

    try {
        const response = await fetch(DOCTOR_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctor)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            selectRole("doctor");
        } else {
            alert("¡Credenciales inválidas!");
        }
    } catch (error) {
        console.error("Error en doctorLoginHandler:", error);
        alert("Ocurrió un error inesperado.");
    }
};
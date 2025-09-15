import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

// Variables globales
const patientTableBody = document.getElementById("patientTableBody");
let selectedDate = new Date().toISOString().split("T")[0];
let token = localStorage.getItem("token");
let patientName = null;

// Evento de búsqueda por nombre
document.getElementById("searchBar").addEventListener("input", (e) => {
    const value = e.target.value.trim();
    patientName = value.length > 0 ? value : "null";
    loadAppointments();
});

// Botón "Citas de Hoy"
document.getElementById("todayButton").addEventListener("click", () => {
    selectedDate = new Date().toISOString().split("T")[0];
    document.getElementById("datePicker").value = selectedDate;
    loadAppointments();
});

// Selector de fecha
document.getElementById("datePicker").addEventListener("change", (e) => {
    selectedDate = e.target.value;
    loadAppointments();
});

// Función para cargar las citas
async function loadAppointments() {
    try {
        const appointments = await getAllAppointments(selectedDate, patientName, token);
        patientTableBody.innerHTML = "";

        if (!appointments || appointments.length === 0) {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td colspan="5" style="text-align:center;">No se encontraron citas para la fecha seleccionada.</td>
      `;
            patientTableBody.appendChild(row);
            return;
        }

        appointments.forEach((appt) => {
            const row = createPatientRow(appt);
            patientTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error al cargar citas:", error);
        const row = document.createElement("tr");
        row.innerHTML = `
      <td colspan="5" style="text-align:center; color:red;">Error al cargar citas. Intente nuevamente.</td>
    `;
        patientTableBody.appendChild(row);
    }
}

// Render inicial
document.addEventListener("DOMContentLoaded", () => {
    // Si tenés un renderContent() global que se usa en otras vistas, podés llamarlo aquí.
    loadAppointments();
});

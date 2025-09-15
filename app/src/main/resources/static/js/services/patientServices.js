// patientServices.js
import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = API_BASE_URL + '/patient';

/**
 * Registrar un nuevo paciente
 */
export async function patientSignup(data) {
    try {
        const response = await fetch(`${PATIENT_API}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Registro fallido");
        }

        return { success: true, message: result.message || "Registro exitoso" };
    } catch (error) {
        console.error("Error :: patientSignup ::", error);
        return { success: false, message: error.message || "Error en el registro" };
    }
}

/**
 * Iniciar sesión del paciente
 */
export async function patientLogin(data) {
    try {
        const response = await fetch(`${PATIENT_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, message: result.message || "Credenciales inválidas" };
        }

        return { success: true, token: result.token, patient: result.patient };
    } catch (error) {
        console.error("Error :: patientLogin ::", error);
        return { success: false, message: error.message || "Error al iniciar sesión" };
    }
}

/**
 * Obtener datos del paciente conectado
 */
export async function getPatientData(token) {
    try {
        const response = await fetch(`${PATIENT_API}/${token}`);
        const data = await response.json();

        if (response.ok) return data.patient;
        return null;
    } catch (error) {
        console.error("Error :: getPatientData ::", error);
        return null;
    }
}

/**
 * Obtener citas del paciente (o desde el rol doctor)
 */
export async function getPatientAppointments(id, token, user) {
    try {
        const response = await fetch(`${PATIENT_API}/${id}/${user}/${token}`);
        const data = await response.json();

        if (response.ok) {
            return data.appointments;
        }

        return null;
    } catch (error) {
        console.error("Error :: getPatientAppointments ::", error);
        return null;
    }
}

/**
 * Filtrar citas por condición y nombre
 */
export async function filterAppointments(condition, name, token) {
    try {
        const response = await fetch(`${PATIENT_API}/filter/${condition}/${name}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, appointments: data };
        } else {
            console.error("Error al filtrar citas:", response.statusText);
            return { success: false, appointments: [], message: "No se pudo filtrar" };
        }
    } catch (error) {
        console.error("Error :: filterAppointments ::", error);
        alert("¡Algo salió mal al filtrar citas!");
        return { success: false, appointments: [], message: error.message };
    }
}
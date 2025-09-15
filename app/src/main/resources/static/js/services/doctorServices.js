// doctorServices.js

import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + '/doctor';

// Obtener todos los doctores
export async function getDoctors() {
    try {
        const response = await fetch(DOCTOR_API, {
            method: "GET"
        });

        if (response.ok) {
            const data = await response.json();
            return data; // Se espera un array de doctores
        } else {
            console.error("Error al obtener doctores:", response.status);
            return [];
        }
    } catch (error) {
        console.error("Error de red en getDoctors:", error);
        return [];
    }
}

// Eliminar un doctor por ID
export async function deleteDoctor(id, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            return { success: true, message: result.message || "Doctor eliminado correctamente" };
        } else {
            return { success: false, message: result.message || "No se pudo eliminar al doctor" };
        }
    } catch (error) {
        console.error("Error de red en deleteDoctor:", error);
        return { success: false, message: "Error del servidor" };
    }
}

// Guardar (agregar) un nuevo doctor
export async function saveDoctor(doctor, token) {
    try {
        const response = await fetch(DOCTOR_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(doctor)
        });

        const result = await response.json();

        if (response.ok) {
            return { success: true, message: result.message || "Doctor guardado exitosamente" };
        } else {
            return { success: false, message: result.message || "No se pudo guardar el doctor" };
        }
    } catch (error) {
        console.error("Error de red en saveDoctor:", error);
        return { success: false, message: "Error del servidor" };
    }
}

// Filtrar doctores por nombre, horario y especialidad
export async function filterDoctors(name, time, specialty) {
    try {
        const params = new URLSearchParams();

        if (name) params.append("name", name);
        if (time) params.append("time", time);
        if (specialty) params.append("specialty", specialty);

        const url = `${DOCTOR_API}/filter?${params.toString()}`;

        const response = await fetch(url, {
            method: "GET"
        });

        if (response.ok) {
            const data = await response.json();
            return data; // array de doctores filtrados
        } else {
            console.error("Error al filtrar doctores:", response.status);
            return [];
        }
    } catch (error) {
        console.error("Error de red en filterDoctors:", error);
        return [];
    }
}
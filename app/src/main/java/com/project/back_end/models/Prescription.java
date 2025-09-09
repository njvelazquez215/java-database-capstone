package com.project.back_end.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;

/**
 * Documento MongoDB que representa una receta médica emitida durante una cita.
 * Incluye información del paciente, medicamento, dosis y notas del médico.
 */
@Document(collection = "prescriptions")
public class Prescription {

    // Identificador único de MongoDB (ObjectId en formato String)
    @Id
    private String id;

    // Nombre completo del paciente (requerido, 3–100 caracteres)
    @NotNull(message = "El nombre del paciente es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String patientName;

    // ID de la cita asociada (requerido)
    @NotNull(message = "La cita referenciada es obligatoria")
    private Long appointmentId;

    // Nombre del medicamento (requerido, 3–100 caracteres)
    @NotNull(message = "El nombre del medicamento es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre del medicamento debe tener entre 3 y 100 caracteres")
    private String medication;

    // Dosificación del medicamento (requerido, 3–20 caracteres)
    @NotNull(message = "La dosificación es obligatoria")
    @Size(min = 3, max = 20, message = "La dosificación debe tener entre 3 y 20 caracteres")
    private String dosage;

    // Notas opcionales del médico (máx. 200 caracteres)
    @Size(max = 200, message = "Las notas del médico no deben superar los 200 caracteres")
    private String doctorNotes;

    // Constructor vacío requerido por Spring Data
    public Prescription() {}

    // Constructor con los campos más importantes
    public Prescription(String patientName, Long appointmentId, String medication, String dosage, String doctorNotes) {
        this.patientName = patientName;
        this.appointmentId = appointmentId;
        this.medication = medication;
        this.dosage = dosage;
        this.doctorNotes = doctorNotes;
    }

    // Getters y setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getMedication() {
        return medication;
    }

    public void setMedication(String medication) {
        this.medication = medication;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getDoctorNotes() {
        return doctorNotes;
    }

    public void setDoctorNotes(String doctorNotes) {
        this.doctorNotes = doctorNotes;
    }
}
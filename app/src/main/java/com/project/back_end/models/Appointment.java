package com.project.back_end.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Entidad JPA que representa una cita médica entre un doctor y un paciente.
 * Contiene información sobre fecha, hora, estado y relaciones con otras entidades.
 */
@Entity
public class Appointment {

    // ID autoincremental como clave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación con Doctor: muchas citas pueden tener el mismo doctor
    @ManyToOne
    @NotNull(message = "La cita debe tener un doctor asignado")
    private Doctor doctor;

    // Relación con Paciente: muchas citas pueden tener el mismo paciente
    @ManyToOne
    @NotNull(message = "La cita debe tener un paciente asignado")
    private Patient patient;

    // Fecha y hora de la cita (debe ser en el futuro)
    @Future(message = "La hora de la cita debe ser en el futuro")
    @NotNull(message = "La fecha y hora de la cita no puede ser nula")
    private LocalDateTime appointmentTime;

    // Estado de la cita (0 = Programada, 1 = Completada)
    @NotNull(message = "El estado de la cita es obligatorio")
    private int status;

    // Constructor vacío requerido por JPA
    public Appointment() {}

    // Constructor útil para inicializar campos
    public Appointment(Doctor doctor, Patient patient, LocalDateTime appointmentTime, int status) {
        this.doctor = doctor;
        this.patient = patient;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    // Métodos auxiliares (no se persisten en la base de datos)

    @Transient
    public LocalDateTime getEndTime() {
        return appointmentTime.plusHours(1);
    }

    @Transient
    public LocalDate getAppointmentDate() {
        return appointmentTime.toLocalDate();
    }

    @Transient
    public LocalTime getAppointmentTimeOnly() {
        return appointmentTime.toLocalTime();
    }
}
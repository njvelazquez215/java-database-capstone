package com.project.back_end.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Entidad JPA que representa a un proveedor de atención médica (doctor).
 * Incluye datos personales, credenciales y disponibilidad horaria.
 */
@Entity
public class Doctor {

    // ID autoincremental como clave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre completo del doctor (requerido, entre 3 y 100 caracteres)
    @NotNull(message = "El nombre es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String name;

    // Especialidad médica (requerida, entre 3 y 50 caracteres)
    @NotNull(message = "La especialidad es obligatoria")
    @Size(min = 3, max = 50, message = "La especialidad debe tener entre 3 y 50 caracteres")
    private String specialty;

    // Email válido (requerido, con formato)
    @NotNull(message = "El email es obligatorio")
    @Email(message = "Debe ser un email válido")
    private String email;

    // Contraseña (mínimo 6 caracteres, solo escritura en JSON)
    @NotNull(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    // Teléfono (exactamente 10 dígitos)
    @NotNull(message = "El número de teléfono es obligatorio")
    @Pattern(regexp = "\\d{10}", message = "El número de teléfono debe tener 10 dígitos")
    private String phone;

    // Lista de franjas horarias disponibles (formato: "09:00-10:00")
    @ElementCollection
    private List<String> availableTimes;

    // Constructor vacío (JPA lo necesita)
    public Doctor() {}

    // Constructor con campos principales
    public Doctor(String name, String specialty, String email, String password, String phone, List<String> availableTimes) {
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.availableTimes = availableTimes;
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<String> getAvailableTimes() {
        return availableTimes;
    }

    public void setAvailableTimes(List<String> availableTimes) {
        this.availableTimes = availableTimes;
    }
}
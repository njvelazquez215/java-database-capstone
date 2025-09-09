package com.project.back_end.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Entidad JPA que representa a un paciente del sistema.
 * Incluye información personal, de contacto y acceso.
 */
@Entity
public class Patient {

    // ID autoincremental como clave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre completo (requerido, entre 3 y 100 caracteres)
    @NotNull(message = "El nombre es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String name;

    // Email válido (requerido)
    @NotNull(message = "El email es obligatorio")
    @Email(message = "Debe ser un email válido")
    private String email;

    // Contraseña (requerido, mínimo 6 caracteres, oculta en JSON)
    @NotNull(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    // Teléfono (10 dígitos exactos)
    @NotNull(message = "El número de teléfono es obligatorio")
    @Pattern(regexp = "\\d{10}", message = "El número de teléfono debe tener 10 dígitos")
    private String phone;

    // Dirección (máximo 255 caracteres)
    @NotNull(message = "La dirección es obligatoria")
    @Size(max = 255, message = "La dirección no debe superar los 255 caracteres")
    private String address;

    // Constructor vacío (necesario para JPA)
    public Patient() {}

    // Constructor con campos principales
    public Patient(String name, String email, String password, String phone, String address) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
    }

    // Getters y setters

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
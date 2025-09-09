package com.project.back_end.models;

import jakarta.persistence.*; // Para @Entity, @Id, @GeneratedValue
import jakarta.validation.constraints.NotNull; // Para validaciones como @NotNull
import com.fasterxml.jackson.annotation.JsonProperty; // Para ocultar campos en respuestas JSON

/**
 * Entidad JPA que representa a un administrador del sistema.
 * Gestiona las credenciales necesarias para iniciar sesión en el backend de la clínica.
 */
@Entity
public class Admin {

    // ID autoincremental como clave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre de usuario del administrador (no puede ser nulo)
    @NotNull(message = "El nombre de usuario no puede ser nulo")
    private String username;

    // Contraseña del administrador (no puede ser nula, y se oculta en las respuestas JSON)
    @NotNull(message = "La contraseña no puede ser nula")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    // Constructor vacío requerido por JPA
    public Admin() {
    }

    // Constructor completo (opcional, útil para crear instancias manuales)
    public Admin(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Aunque se escribe, no se incluirá en respuestas JSON gracias a @JsonProperty
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
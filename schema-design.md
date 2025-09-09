# Diseño de Esquema de Base de Datos - SmartCare Clinic System

## 🗃️ Diseño de Base de Datos Relacional (MySQL)

A continuación se detallan las tablas principales del sistema, definidas para garantizar integridad referencial, normalización y escalabilidad.

### 🔸 Tabla: `administradores`

| Columna       | Tipo de Dato     | Restricciones                 |
|---------------|------------------|-------------------------------|
| id            | INT              | PRIMARY KEY, AUTO_INCREMENT  |
| nombre        | VARCHAR(100)     | NOT NULL                     |
| email         | VARCHAR(100)     | NOT NULL, UNIQUE             |
| password_hash | VARCHAR(255)     | NOT NULL                     |

<!-- Se almacena un hash de contraseña por seguridad. -->

---

### 🔸 Tabla: `doctores`

| Columna        | Tipo de Dato     | Restricciones                        |
|----------------|------------------|--------------------------------------|
| id             | INT              | PRIMARY KEY, AUTO_INCREMENT          |
| nombre         | VARCHAR(100)     | NOT NULL                             |
| email          | VARCHAR(100)     | NOT NULL, UNIQUE                     |
| especialidad   | VARCHAR(100)     | NOT NULL                             |
| telefono       | VARCHAR(20)      |                                      |
| disponible     | BOOLEAN          | DEFAULT TRUE                         |
| id_admin       | INT              | FOREIGN KEY → administradores(id)    |

<!-- Cada doctor puede ser gestionado por un administrador. -->

---

### 🔸 Tabla: `pacientes`

| Columna        | Tipo de Dato     | Restricciones                     |
|----------------|------------------|-----------------------------------|
| id             | INT              | PRIMARY KEY, AUTO_INCREMENT       |
| nombre         | VARCHAR(100)     | NOT NULL                          |
| email          | VARCHAR(100)     | NOT NULL, UNIQUE                  |
| fecha_nacimiento | DATE           |                                   |
| telefono       | VARCHAR(20)      |                                   |
| password_hash  | VARCHAR(255)     | NOT NULL                          |

<!-- Los pacientes también tienen autenticación básica. -->

---

### 🔸 Tabla: `citas`

| Columna      | Tipo de Dato     | Restricciones                             |
|--------------|------------------|-------------------------------------------|
| id           | INT              | PRIMARY KEY, AUTO_INCREMENT               |
| fecha_hora   | DATETIME         | NOT NULL                                  |
| motivo       | TEXT             |                                           |
| id_paciente  | INT              | FOREIGN KEY → pacientes(id)               |
| id_doctor    | INT              | FOREIGN KEY → doctores(id)                |
| estado       | ENUM             | ('Programada', 'Completada', 'Cancelada') DEFAULT 'Programada' |

<!-- Una cita conecta a un paciente con un doctor y puede cambiar de estado. -->

---

## 🍃 Diseño de Colección MongoDB

MongoDB se utiliza para almacenar **recetas médicas**, ya que permiten estructuras más flexibles, con campos anidados y arreglos que pueden variar por paciente o tratamiento.

### 🔹 Colección: `recetas`

```json
{
  "_id": "65fc12ab98c3c45f8123aa91",
  "id_paciente": 3,
  "id_doctor": 2,
  "fecha_emision": "2025-09-08T10:30:00Z",
  "medicamentos": [
    {
      "nombre": "Ibuprofeno",
      "dosis": "400mg",
      "frecuencia": "cada 8 horas",
      "duracion_dias": 5
    },
    {
      "nombre": "Amoxicilina",
      "dosis": "500mg",
      "frecuencia": "cada 12 horas",
      "duracion_dias": 7
    }
  ],
  "indicaciones": "Tomar los medicamentos con comida. Reposo por 48hs.",
  "firmado_digitalmente": true
}
```

Este diseño mixto permite:
- Aprovechar la estructura relacional de MySQL para datos estandarizados y relaciones firmes.
- Usar MongoDB para documentos médicos que pueden tener variaciones y crecer con el tiempo.
- Facilitar la escalabilidad y flexibilidad del sistema a medida que se añaden nuevas funcionalidades.
- Optimizar el rendimiento mediante consultas específicas a cada tipo de base de datos según la naturaleza de los datos.
- Permitir futuras integraciones con otros sistemas de salud o aplicaciones móviles a través de APIs RESTful.

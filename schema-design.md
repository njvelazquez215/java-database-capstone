# Diseño del Esquema de Base de Datos - SmartCare Clinic System

Este documento detalla el diseño de la base de datos para el Sistema Inteligente de Gestión de Clínicas. Se divide en dos partes:

1. **Diseño relacional con MySQL** para los datos estructurados y altamente interrelacionados.
2. **Diseño documental con MongoDB** para almacenar datos flexibles como recetas.

---

## 🗃️ MySQL Database Design

Se identificaron cuatro entidades clave: pacientes, doctores, citas y administradores. Estas tablas permiten asegurar la integridad referencial y facilitar la trazabilidad de la información médica.

---

### 🔹 Tabla: `administradores`

| Columna        | Tipo de Dato     | Restricciones                    |
|----------------|------------------|----------------------------------|
| id             | INT              | PRIMARY KEY, AUTO_INCREMENT      |
| nombre         | VARCHAR(100)     | NOT NULL                         |
| email          | VARCHAR(100)     | NOT NULL, UNIQUE                 |
| password_hash  | VARCHAR(255)     | NOT NULL                         |

<!-- 
Justificación:
Los administradores gestionan la plataforma y deben autenticarse de forma segura.
 -->

---

### 🔹 Tabla: `doctores`

| Columna         | Tipo de Dato     | Restricciones                            |
|-----------------|------------------|------------------------------------------|
| id              | INT              | PRIMARY KEY, AUTO_INCREMENT              |
| nombre          | VARCHAR(100)     | NOT NULL                                 |
| email           | VARCHAR(100)     | NOT NULL, UNIQUE                         |
| especialidad    | VARCHAR(100)     | NOT NULL                                 |
| telefono        | VARCHAR(20)      |                                          |
| disponible      | BOOLEAN          | DEFAULT TRUE                             |
| id_admin        | INT              | FOREIGN KEY → administradores(id)        |

<!-- 
Cada doctor puede estar vinculado a un administrador para gestión de acceso o auditoría.
 -->

---

### 🔹 Tabla: `pacientes`

| Columna           | Tipo de Dato     | Restricciones                     |
|-------------------|------------------|-----------------------------------|
| id                | INT              | PRIMARY KEY, AUTO_INCREMENT       |
| nombre            | VARCHAR(100)     | NOT NULL                          |
| email             | VARCHAR(100)     | NOT NULL, UNIQUE                  |
| fecha_nacimiento  | DATE             |                                   |
| telefono          | VARCHAR(20)      |                                   |
| password_hash     | VARCHAR(255)     | NOT NULL                          |

<!-- 
Los pacientes también deben autenticarse y gestionar sus citas.
 -->

---

### 🔹 Tabla: `citas`

| Columna        | Tipo de Dato     | Restricciones                                      |
|----------------|------------------|----------------------------------------------------|
| id             | INT              | PRIMARY KEY, AUTO_INCREMENT                        |
| id_paciente    | INT              | FOREIGN KEY → pacientes(id), NOT NULL              |
| id_doctor      | INT              | FOREIGN KEY → doctores(id), NOT NULL               |
| fecha_hora     | DATETIME         | NOT NULL                                           |
| motivo         | TEXT             |                                                   |
| estado         | ENUM             | ('Programada', 'Completada', 'Cancelada'), DEFAULT 'Programada' |

<!-- 
Las citas vinculan pacientes y doctores. Podrían eliminarse en cascada si el paciente es eliminado.
 -->

---

### 💡 Preguntas clave consideradas:

- ¿Qué pasa si se elimina un paciente? → Las citas podrían eliminarse en cascada o marcarse como archivadas.
- ¿Se permite que un doctor tenga múltiples citas al mismo tiempo? → No. Se validará en la lógica de negocio para evitar superposiciones.
- ¿Debe cada doctor tener horarios de disponibilidad? → Sí, se planea extender este diseño con una tabla adicional (`horarios`) más adelante.

---

## 🍃 MongoDB Collection Design

MongoDB se usará para almacenar **recetas médicas**, ya que requieren estructura flexible, campos anidados, y pueden variar en cada consulta médica.

---

### 🔸 Colección: `recetas`

```json
{
  "_id": "ObjectId('6512ab34fa87e901a6543210')",
  "id_paciente": 3,
  "id_doctor": 2,
  "id_cita": 12,
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
  "notas": "Tomar los medicamentos con comida. Evitar el alcohol.",
  "firmado_digitalmente": true,
  "metadatos": {
    "creadoEn": "2025-09-08T10:30:00Z",
    "estado": "activa",
    "ultimaActualizacion": "2025-09-08T11:45:00Z"
  },
  "etiquetas": ["antibiótico", "analgésico"]
}
```
- MongoDB permite guardar múltiples medicamentos por receta en un solo documento.
- Se incluye un arreglo para medicamentos, un objeto anidado de metadatos y etiquetas para búsqueda.
- La receta se asocia con una cita (`id_cita`), pero también podría funcionar independientemente si fuera necesario.

### ✅ Conclusión
- MySQL se utiliza para información estructurada, como relaciones entre pacientes, doctores y citas.
- MongoDB se reserva para documentos flexibles que pueden cambiar con el tiempo, como recetas.
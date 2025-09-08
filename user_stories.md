# Historias de Usuario - Sistema de Gestión de Clínicas SmartCare

## 👤 Historias de Usuario para Administrador

---

**Título:**  
_Como administrador, quiero iniciar sesión en el portal con mi nombre de usuario y contraseña, para poder gestionar la plataforma de forma segura._

**Criterios de Aceptación:**
1. La página de inicio de sesión es accesible mediante una URL segura.
2. Las credenciales se validan contra los datos almacenados.
3. Un inicio de sesión exitoso redirige al panel de administrador.

**Prioridad:** Alta  
**Puntos de Historia:** 3  
**Notas:**
- Incluir manejo de errores para credenciales incorrectas.

---

**Título:**  
_Como administrador, quiero cerrar sesión en el portal, para proteger el acceso al sistema cuando no estoy activo._

**Criterios de Aceptación:**
1. El botón de cerrar sesión está disponible en todas las páginas del administrador.
2. Cerrar sesión finaliza la sesión del usuario y limpia los tokens.
3. El usuario es redirigido a la página de inicio de sesión.

**Prioridad:** Alta  
**Puntos de Historia:** 2  
**Notas:**
- Importante para mantener la seguridad del sistema.

---

**Título:**  
_Como administrador, quiero agregar nuevos doctores al portal, para que puedan comenzar a gestionar citas._

**Criterios de Aceptación:**
1. El administrador puede acceder a un formulario de "Nuevo Doctor".
2. Se validan todos los campos obligatorios.
3. El doctor se guarda en la base de datos MySQL.

**Prioridad:** Alta  
**Puntos de Historia:** 4  
**Notas:**
- Incluir validación de correo electrónico duplicado o ID.

---

**Título:**  
_Como administrador, quiero eliminar el perfil de un doctor, para poder quitar usuarios inactivos del sistema._

**Criterios de Aceptación:**
1. El administrador puede seleccionar doctores desde una lista.
2. Se muestra un mensaje de confirmación antes de eliminar.
3. Los datos del doctor se eliminan de forma segura de la base de datos.

**Prioridad:** Media  
**Puntos de Historia:** 3  
**Notas:**
- Considerar eliminaciones en cascada (citas, etc.).

---

**Título:**  
_Como administrador, quiero ejecutar un procedimiento almacenado en MySQL CLI para ver la cantidad de citas por mes, con el fin de rastrear el uso del sistema._

**Criterios de Aceptación:**
1. El procedimiento está disponible en la base de datos.
2. El administrador puede ejecutarlo desde CLI o interfaz.
3. Se muestran/exportan las estadísticas mensuales.

**Prioridad:** Media  
**Puntos de Historia:** 2  
**Notas:**
- Útil para generación de reportes.

---

## 🧑‍⚕️ Historias de Usuario para Paciente

---

**Título:**  
_Como paciente, quiero ver una lista de doctores sin iniciar sesión, para explorar opciones antes de registrarme._

**Criterios de Aceptación:**
1. La lista pública está accesible desde la página de inicio.
2. Incluye filtros y búsqueda por especialidad.
3. El perfil del doctor muestra información básica y disponibilidad.

**Prioridad:** Alta  
**Puntos de Historia:** 3  
**Notas:**
- Acceso solo lectura.

---

**Título:**  
_Como paciente, quiero registrarme usando mi correo electrónico y contraseña, para poder reservar citas._

**Criterios de Aceptación:**
1. Hay un formulario de registro accesible.
2. Se requiere correo electrónico válido y contraseña segura.
3. El usuario es redirigido al panel de paciente tras el registro.

**Prioridad:** Alta  
**Puntos de Historia:** 4  
**Notas:**
- Validar correo duplicado.

---

**Título:**  
_Como paciente, quiero iniciar sesión en el portal, para poder gestionar mis reservas._

**Criterios de Aceptación:**
1. El login utiliza autenticación con JWT.
2. El token se almacena de forma segura.
3. Se muestran mensajes de error ante fallos de login.

**Prioridad:** Alta  
**Puntos de Historia:** 2  
**Notas:**
- Integración entre frontend y backend.

---

**Título:**  
_Como paciente, quiero cerrar sesión en el portal, para proteger mi cuenta._

**Criterios de Aceptación:**
1. El logout invalida el token y termina la sesión.
2. El usuario es redirigido a la página de inicio.
3. Se elimina la información de la sesión actual.

**Prioridad:** Media  
**Puntos de Historia:** 1  
**Notas:**
- Debe funcionar en múltiples dispositivos.

---

**Título:**  
_Como paciente, quiero reservar una cita de una hora con un doctor, para poder recibir atención médica._

**Criterios de Aceptación:**
1. El formulario de reserva permite seleccionar fecha y hora.
2. Se valida la disponibilidad en tiempo real.
3. Se muestra una confirmación tras la reserva.

**Prioridad:** Alta  
**Puntos de Historia:** 5  
**Notas:**
- Evitar conflictos de horario.

---

**Título:**  
_Como paciente, quiero ver mis próximas citas, para poder prepararme con anticipación._

**Criterios de Aceptación:**
1. Se muestra una lista de citas ordenadas por fecha.
2. Incluye nombre del doctor, horario y ubicación.
3. Las citas se actualizan dinámicamente.

**Prioridad:** Media  
**Puntos de Historia:** 3  
**Notas:**
- En futuras versiones puede incluir botón para cancelar.

---

## 👨‍⚕️ Historias de Usuario para Doctor

---

**Título:**  
_Como doctor, quiero iniciar sesión en el portal, para gestionar las citas de mis pacientes._

**Criterios de Aceptación:**
1. La página de login está protegida.
2. Se verifica el rol de doctor.
3. El login redirige al panel del doctor.

**Prioridad:** Alta  
**Puntos de Historia:** 3  
**Notas:**
- Debe diferenciarse del login de administrador o paciente.

---

**Título:**  
_Como doctor, quiero cerrar sesión del sistema, para proteger mis datos personales._

**Criterios de Aceptación:**
1. El logout revoca el token.
2. Se redirige a la página de inicio.
3. Se limpia la información del usuario en la sesión.

**Prioridad:** Media  
**Puntos de Historia:** 1  
**Notas:**
- Requiere manejo seguro de sesión.

---

**Título:**  
_Como doctor, quiero ver mi calendario de citas, para organizar mi día de forma efectiva._

**Criterios de Aceptación:**
1. El calendario muestra todas las citas próximas.
2. Se puede filtrar por día o semana.
3. Al hacer clic se ve el detalle de la cita.

**Prioridad:** Alta  
**Puntos de Historia:** 4  
**Notas:**
- Utilizar librería de calendario en frontend.

---

**Título:**  
_Como doctor, quiero marcar horarios como no disponibles, para que los pacientes no reserven en esos momentos._

**Criterios de Aceptación:**
1. El doctor puede bloquear fechas y horas.
2. Los horarios se actualizan en la vista del paciente.
3. Los cambios se reflejan en tiempo real.

**Prioridad:** Alta  
**Puntos de Historia:** 4  
**Notas:**
- Controlar solapamientos con citas ya reservadas.

---

**Título:**  
_Como doctor, quiero actualizar mi perfil con mi especialización y contacto, para que los pacientes tengan mi información actualizada._

**Criterios de Aceptación:**
1. Formulario editable para especialidad, email, teléfono, etc.
2. Los cambios se guardan en la base de datos.
3. La información actualizada se muestra en el listado público.

**Prioridad:** Media  
**Puntos de Historia:** 2  
**Notas:**
- Validar que el correo electrónico siga siendo único.

---

**Título:**  
_Como doctor, quiero ver los detalles del paciente para mis próximas citas, para estar preparado de antemano._

**Criterios de Aceptación:**
1. Se muestran nombre, edad, historial y motivo de consulta.
2. Solo se pueden ver pacientes con citas asignadas al doctor.
3. La información es solo de lectura.

**Prioridad:** Alta  
**Puntos de Historia:** 3  
**Notas:**
- Asegurar protección de datos sensibles.
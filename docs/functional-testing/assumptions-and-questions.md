# Dudas y supuestos del requerimiento — MakersPay

## Objetivo

Documentar las definiciones faltantes, ambiguas o no especificadas detectadas durante el análisis de la funcionalidad de envío de dinero de MakersPay.

Estas preguntas deberían ser revisadas con Producto, Negocio o Desarrollo antes de ejecutar las pruebas.

> MakersPay es un producto ficticio. Los supuestos incluidos en este documento se utilizan únicamente para completar el diseño de pruebas y no representan reglas de negocio confirmadas.

---

## 1. Dudas funcionales

### PREG-001 — Confirmación de la transferencia

**Pregunta:**
¿El usuario debe visualizar una pantalla de confirmación antes de ejecutar definitivamente la transferencia?

**Riesgo de no definirlo:**
El usuario podría enviar dinero accidentalmente o no tener oportunidad de revisar destinatario y monto.

**Supuesto utilizado:**
Se asume que existe una instancia de confirmación antes de procesar la operación.

---

### PREG-002 — Comprobante de operación

**Pregunta:**
¿Qué información debe incluir el comprobante de una transferencia exitosa?

**Riesgo de no definirlo:**
Podría faltar información necesaria para trazabilidad, soporte o reclamos.

**Supuesto utilizado:**
Se asume que el comprobante incluye:

* Número de referencia.
* Fecha y hora.
* Monto.
* Estado.
* Celular o identificación del destinatario.
* Saldo final del remitente.

---

### PREG-003 — Estado de una transferencia

**Pregunta:**
¿Qué estados puede tener una transferencia?

**Riesgo de no definirlo:**
No sería posible validar correctamente transiciones, historial y recuperación ante fallas.

**Supuesto utilizado:**
Se consideran los estados:

* Iniciada.
* Pendiente.
* Exitosa.
* Rechazada.
* Fallida.
* Revertida.

---

## 2. Dudas sobre montos y límites

### PREG-004 — Uso de decimales

**Pregunta:**
¿El monto de la transferencia admite valores decimales?

**Riesgo de no definirlo:**
Podrían producirse errores de redondeo o diferencias entre interfaz, API y base de datos.

**Supuesto utilizado:**
Se asume que los montos se ingresan en valores enteros de COP.

---

### PREG-005 — Saldo final igual a cero

**Pregunta:**
¿Está permitido que el remitente transfiera la totalidad de su saldo y quede en cero?

**Riesgo de no definirlo:**
El comportamiento podría ser diferente según comisiones, saldos mínimos o reglas internas.

**Supuesto utilizado:**
Se asume que sí está permitido, siempre que no existan comisiones adicionales.

---

### PREG-006 — Comisión por transferencia

**Pregunta:**
¿MakersPay cobra una comisión por realizar transferencias?

**Riesgo de no definirlo:**
La validación de saldo disponible podría ser incorrecta.

**Supuesto utilizado:**
Se asume que las transferencias no tienen comisión.

---

### PREG-007 — Límite máximo

**Pregunta:**
¿El límite de $2.000.000 COP aplica por operación, por día o por usuario?

**Riesgo de no definirlo:**
No sería posible diseñar correctamente pruebas de acumulación de transferencias.

**Supuesto utilizado:**
Se asume que el límite corresponde a cada transacción individual.

---

### PREG-008 — Límites diarios o mensuales

**Pregunta:**
¿Existe un límite acumulado diario, semanal o mensual?

**Riesgo de no definirlo:**
El sistema podría permitir operaciones que excedan restricciones financieras o regulatorias.

**Supuesto utilizado:**
No se consideran límites acumulados porque no fueron especificados.

---

## 3. Dudas sobre el número de celular

### PREG-009 — Formato permitido

**Pregunta:**
¿Qué formato debe tener el número de celular?

**Riesgo de no definirlo:**
Podrían aceptarse números inválidos o rechazarse números válidos.

**Supuesto utilizado:**
Se asume un número colombiano de 10 dígitos, sin espacios ni prefijo internacional.

---

### PREG-010 — Números internacionales

**Pregunta:**
¿Se permiten transferencias a números de otros países?

**Riesgo de no definirlo:**
Podría existir una validación incorrecta del formato o del destinatario.

**Supuesto utilizado:**
Se asume que solo se permiten números registrados en Colombia.

---

### PREG-011 — Número inactivo o bloqueado

**Pregunta:**
¿Qué ocurre si el destinatario está registrado, pero su cuenta está bloqueada o inactiva?

**Riesgo de no definirlo:**
El dinero podría acreditarse en una cuenta que no puede operarse.

**Supuesto utilizado:**
Se asume que la transferencia debe ser rechazada.

---

## 4. Dudas de seguridad

### PREG-012 — Autorización adicional

**Pregunta:**
¿La transferencia requiere PIN, contraseña, biometría u OTP?

**Riesgo de no definirlo:**
No se puede evaluar completamente la seguridad de la operación.

**Supuesto utilizado:**
Se asume que el usuario debe confirmar la transferencia mediante un mecanismo adicional de autenticación.

---

### PREG-013 — Sesión expirada

**Pregunta:**
¿Qué ocurre si la sesión expira durante la confirmación de la transferencia?

**Riesgo de no definirlo:**
La operación podría quedar en un estado incierto o ejecutarse sin autorización válida.

**Supuesto utilizado:**
Se asume que la operación debe cancelarse y solicitar nuevamente autenticación.

---

### PREG-014 — Protección de datos

**Pregunta:**
¿Qué datos del destinatario se muestran antes de confirmar la operación?

**Riesgo de no definirlo:**
Podría exponerse información personal innecesaria.

**Supuesto utilizado:**
Se asume que se muestra el nombre parcialmente oculto y los últimos dígitos del celular.

---

## 5. Dudas ante timeout y errores

### PREG-015 — Timeout durante el procesamiento

**Pregunta:**
¿Qué mensaje debe mostrarse si ocurre un timeout después de confirmar la transferencia?

**Riesgo de no definirlo:**
El usuario podría reintentar y generar una operación duplicada.

**Supuesto utilizado:**
Se asume que el sistema muestra un estado pendiente e indica que no debe repetirse la operación hasta consultar el historial.

---

### PREG-016 — Recuperación de la operación

**Pregunta:**
¿Cómo consulta el usuario el estado real de una transferencia después de una interrupción?

**Riesgo de no definirlo:**
No habría forma clara de saber si la operación fue aplicada.

**Supuesto utilizado:**
Se asume que la operación puede consultarse mediante una referencia única en el historial.

---

### PREG-017 — Reversión automática

**Pregunta:**
¿Existe una reversión automática si el remitente es debitado pero el destinatario no recibe el dinero?

**Riesgo de no definirlo:**
Podrían quedar saldos inconsistentes y requerirse intervención manual.

**Supuesto utilizado:**
Se asume que debe existir un mecanismo automático de reversión o compensación.

---

## 6. Dudas sobre duplicados y concurrencia

### PREG-018 — Doble clic

**Pregunta:**
¿Cómo previene el sistema que un doble clic genere dos transferencias?

**Riesgo de no definirlo:**
Puede producirse un doble débito y una doble acreditación.

**Supuesto utilizado:**
Se asume que el botón se deshabilita después del primer clic y que el backend aplica idempotencia.

---

### PREG-019 — Reintento de una solicitud

**Pregunta:**
¿La API utiliza una clave de idempotencia o referencia única para evitar duplicados?

**Riesgo de no definirlo:**
Un reintento por error de red puede generar varias operaciones.

**Supuesto utilizado:**
Se asume que cada transferencia posee una referencia única reutilizable para identificar reintentos.

---

### PREG-020 — Transferencias simultáneas

**Pregunta:**
¿Qué ocurre si el usuario realiza dos transferencias simultáneas que, en conjunto, superan el saldo disponible?

**Riesgo de no definirlo:**
El sistema podría permitir saldo negativo o procesar ambas operaciones incorrectamente.

**Supuesto utilizado:**
Se asume que el saldo se valida y bloquea de forma transaccional.

---

## 7. Dudas sobre historial y trazabilidad

### PREG-021 — Actualización del historial

**Pregunta:**
¿El historial debe actualizarse de forma inmediata?

**Riesgo de no definirlo:**
El usuario podría interpretar que la operación no fue realizada y volver a enviarla.

**Supuesto utilizado:**
Se asume que el historial se actualiza inmediatamente o muestra un estado pendiente.

---

### PREG-022 — Información del movimiento

**Pregunta:**
¿Qué campos debe mostrar cada registro del historial?

**Riesgo de no definirlo:**
La trazabilidad puede resultar insuficiente.

**Supuesto utilizado:**
Cada movimiento incluye:

* Referencia.
* Tipo de movimiento.
* Monto.
* Fecha y hora.
* Estado.
* Contraparte.
* Saldo resultante.

---

### PREG-023 — Zona horaria

**Pregunta:**
¿Qué zona horaria se utiliza para registrar fecha y hora?

**Riesgo de no definirlo:**
Podrían existir diferencias entre interfaz, servicios y base de datos.

**Supuesto utilizado:**
Se asume la zona horaria oficial de Colombia.

---

## 8. Resumen de riesgos

| Área         | Riesgo principal                           |
| ------------ | ------------------------------------------ |
| Montos       | Validaciones o cálculos incorrectos        |
| Seguridad    | Transferencias sin autorización suficiente |
| Timeout      | Duplicación de operaciones                 |
| Concurrencia | Saldo negativo o doble débito              |
| Historial    | Falta de trazabilidad                      |
| Reversión    | Dinero descontado sin acreditación         |
| Celular      | Transferencia a destinatario incorrecto    |

## 9. Estado de las definiciones

Todas las preguntas permanecen abiertas hasta ser confirmadas por Producto, Negocio o Desarrollo.

Los supuestos documentados permiten continuar con el diseño de pruebas, pero deben revisarse antes de una ejecución real.

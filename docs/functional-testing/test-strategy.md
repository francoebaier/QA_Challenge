# Estrategia de Pruebas Funcionales — MakersPay

## 1. Objetivo

Definir el enfoque de pruebas para validar la funcionalidad de envío de dinero entre usuarios registrados de MakersPay.

El objetivo principal es comprobar que las transferencias respeten las reglas de negocio y que los saldos e historiales se mantengan consistentes tanto en operaciones exitosas como fallidas.

## 2. Funcionalidad bajo prueba

Un usuario autenticado puede enviar dinero a otro usuario registrado utilizando su número de celular.

## 3. Alcance

Se validará:

* Acceso de un usuario autenticado.
* Ingreso del número de celular del destinatario.
* Ingreso del monto de la transferencia.
* Validación del monto mínimo.
* Validación del monto máximo.
* Validación del saldo disponible.
* Restricción de transferencias al mismo número.
* Validación de destinatarios registrados.
* Actualización del saldo del remitente.
* Actualización del saldo del destinatario.
* Registro del movimiento en ambos historiales.
* Mensajes de éxito.
* Mensajes de error.
* Integridad de los datos ante fallas.
* Prevención de transacciones duplicadas.

## 4. Fuera de alcance

Debido a que MakersPay es un producto ficticio y no se proporcionó una aplicación ejecutable, no se realizarán:

* Pruebas ejecutadas sobre una interfaz real.
* Consultas reales de base de datos.
* Pruebas sobre APIs reales.
* Pruebas reales de performance.
* Validaciones reales de logs.
* Pruebas de penetración.

Los escenarios serán diseñados y documentados para una futura ejecución.

## 5. Reglas de negocio

* El monto mínimo por transacción es de $5.000 COP.
* El monto máximo por transacción es de $2.000.000 COP.
* El usuario no puede enviar más dinero que el saldo disponible.
* No se permiten transferencias al mismo número de celular.
* En una transferencia exitosa:

  * Se descuenta el monto del saldo del remitente.
  * Se incrementa el saldo del destinatario.
  * Se registra el movimiento en el historial de ambos usuarios.
* En una transferencia fallida:

  * Se muestra un mensaje de error claro.
  * No se modifican los saldos.
  * No se registra un movimiento exitoso.

## 6. Tipos de prueba

### Pruebas funcionales

Validan que la funcionalidad cumpla las reglas de negocio.

### Pruebas positivas

Validan transferencias con datos y condiciones válidas.

### Pruebas negativas

Validan entradas inválidas, saldo insuficiente y restricciones.

### Pruebas de integración

Validan la interacción entre transferencias, saldos e historiales.

### Pruebas end-to-end

Validan el flujo completo desde el ingreso de datos hasta la actualización final.

### Pruebas de regresión

Validan que cambios futuros no afecten transferencias, saldos o historiales.

### Pruebas exploratorias

Permiten identificar comportamientos no contemplados inicialmente.

### Pruebas básicas de seguridad

Validan que un usuario no pueda operar sin autenticación ni enviar dinero desde una cuenta ajena.

## 7. Técnicas de diseño

### Partición de equivalencia

Se dividirán los montos en grupos:

* Menores a $5.000 COP.
* Entre $5.000 y $2.000.000 COP.
* Mayores a $2.000.000 COP.

### Análisis de valores límite

Se probarán:

* $4.999 COP.
* $5.000 COP.
* $5.001 COP.
* $1.999.999 COP.
* $2.000.000 COP.
* $2.000.001 COP.

### Tabla de decisión

Se combinarán condiciones como:

* Usuario autenticado.
* Destinatario registrado.
* Destinatario distinto del remitente.
* Monto válido.
* Saldo suficiente.

### Transición de estados

Se analizarán estados de una transferencia como:

* Iniciada.
* Pendiente.
* Exitosa.
* Rechazada.
* Fallida.

### Error guessing

Se contemplarán riesgos como:

* Doble clic.
* Reintento luego de timeout.
* Campos con espacios.
* Número propio.
* Saldo modificado parcialmente.
* Historial desactualizado.

### Pruebas basadas en riesgos

Se priorizarán los escenarios que puedan producir:

* Pérdida o duplicación de dinero.
* Saldos inconsistentes.
* Transferencias a usuarios incorrectos.
* Operaciones duplicadas.
* Falta de trazabilidad.

## 8. Riesgos principales

* Doble débito al remitente.
* Falta de acreditación al destinatario.
* Modificación de saldo ante una operación fallida.
* Transferencia duplicada.
* Transferencia por fuera de los límites.
* Transferencia al mismo usuario.
* Historial inconsistente.
* Mensaje exitoso sin persistencia de la transacción.
* Exposición de información de otro usuario.

## 9. Datos de prueba

Se necesitarán:

* Usuario remitente autenticado.
* Usuario destinatario registrado.
* Usuario destinatario no registrado.
* Número de celular del propio remitente.
* Cuenta con saldo suficiente.
* Cuenta con saldo insuficiente.
* Cuenta con saldo exacto para la transferencia.
* Montos dentro, debajo y encima de los límites.

## 10. Criterios de entrada

* Requerimientos disponibles.
* Reglas de negocio definidas.
* Ambiente de pruebas habilitado.
* Usuarios y datos disponibles.
* Acceso al historial y saldos.
* Versión desplegada y estable.

## 11. Criterios de salida

* Casos críticos ejecutados.
* Reglas de negocio cubiertas.
* Sin defectos críticos abiertos.
* Defectos altos analizados.
* Saldos e historiales consistentes.
* Evidencias disponibles.
* Riesgos residuales documentados.

## 12. Entregables

* Estrategia de pruebas.
* Escenarios de prueba.
* Casos de prueba.
* Reportes de defectos hipotéticos.
* Registro de dudas y supuestos.

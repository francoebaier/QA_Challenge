# Makers QA – Prueba Técnica

Solución completa a la prueba técnica de QA Engineer. Cubre los tres módulos requeridos: automatización UI sobre SauceDemo, documentación de testing funcional sobre MakersPay y pruebas de API sobre ReqRes.

---

## Stack

| Herramienta | Versión | Rol |
|---|---|---|
| [Cypress](https://www.cypress.io/) | 15.x | Framework de automatización (UI + API) |
| [Page Object Model](https://docs.cypress.io/guides/references/best-practices) | — | Patrón de diseño para tests UI |
| [Mochawesome](https://github.com/adamgruber/mochawesome) | 7.x | Reporte HTML de resultados |
| [cypress-plugin-api](https://github.com/filiphric/cypress-plugin-api) | 2.x | UI mejorada para tests de API |
| [dotenv](https://github.com/motdotla/dotenv) | 16.x | Variables de entorno |
| [ESLint + Prettier](https://eslint.org/) | 9.x | Calidad y formato de código |

---

## Estructura del proyecto

```
Makers_QA_Prueba/
│
├── cypress/
│   ├── e2e/
│   │   └── login/
│   │       └── logIn.cy.js          # Smoke tests de inicio de sesión
│   ├── fixtures/
│   │   ├── users.json               # Credenciales de prueba (SauceDemo)
│   │   └── api-data.json            # Payloads para tests de API
│   ├── pages/
│   │   └── LogIn.js                 # Page Object – pantalla de login
│   ├── reports/                     # Reportes Mochawesome generados
│   ├── support/
│   │   ├── commands.js              # Comandos personalizados
│   │   └── e2e.js                   # Entry point global
│   └── tsconfig.json                # Tipos de Cypress para IntelliSense
│
├── api/
│   ├── postman/                     # Colección Postman de referencia
│   └── automated-tests/             # Tests de API automatizados con Cypress
│
├── functional-testing/              # Módulo 2 – Testing Funcional (MakersPay)
│   ├── test-strategy.md             # Estrategia, tipos y técnicas de prueba
│   ├── test-scenarios.md            # 12 escenarios de alto nivel
│   ├── test-cases.md                # 13 casos detallados con pasos
│   └── bug-reports.md               # Plantilla + 3 bug reports de ejemplo
│
├── evidence/                        # Screenshots y videos de ejecución
├── .env                             # Variables de entorno (no commitear)
├── cypress.config.js
├── package.json
└── README.md
```

---

## Prerequisitos

| Requisito | Versión mínima | Verificar |
|---|---|---|
| Node.js | 18.x | `node -v` |
| npm | 9.x | `npm -v` |

---

## Instalación

```bash
npm install
```

> **Nota:** Si la red usa proxy o intercepta certificados SSL:
> ```powershell
> $env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
> npm install
> ```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto (ya incluido, no commitear):

```
BASE_URL=https://www.saucedemo.com
REQUEST_URL=https://reqres.in/api
```

Estas variables se leen automáticamente desde `cypress.config.js` a través de `dotenv`.

---

## Ejecutar tests

```bash
# Abrir Cypress en modo interactivo
npm run test:open

# Todos los tests en modo headless
npm test

# Solo Smoke Tests de Login (SauceDemo)
npm run test:ui

# Solo API Tests (ReqRes)
npm run test:api

# Correr con navegador visible
npm run test:headed
```

---

## Reportes

```bash
# Fusionar resultados individuales
npm run report:merge

# Generar HTML final
npm run report:generate

# Todo en uno
npm run report
```

El reporte queda en `cypress/reports/html/output.html`.

---

## Módulo 1 – Automatización UI (SauceDemo)

**URL:** https://www.saucedemo.com  
**Page Object:** `cypress/pages/LogIn.js`  
**Fixtures:** `cypress/fixtures/users.json`  
**Spec:** `cypress/e2e/login/logIn.cy.js`

| ID | Caso de prueba | Tipo |
|---|---|---|
| TC-001 | La página de login carga correctamente | Smoke |
| TC-002 | Login exitoso con credenciales válidas | Happy path |
| TC-003 | Login fallido – contraseña incorrecta | Negativo |
| TC-004 | Login fallido – usuario bloqueado | Negativo |
| TC-005 | Validación – ambos campos vacíos | Campo obligatorio |
| TC-006 | Validación – campo password vacío | Campo obligatorio |

---

## Módulo 2 – Testing Funcional (MakersPay)

Producto ficticio: billetera digital con flujo de envío de dinero entre usuarios registrados.

| Archivo | Contenido |
|---|---|
| `test-strategy.md` | Tipos de prueba, técnicas (EP, BVA, casos de uso), riesgos |
| `test-scenarios.md` | 12 escenarios de alto nivel con prioridad y técnica aplicada |
| `test-cases.md` | 13 casos detallados con precondiciones, pasos y resultado esperado |
| `bug-reports.md` | Plantilla estándar + 3 bug reports basados en las reglas de negocio |

**Reglas de negocio cubiertas:**
- Monto mínimo $5.000 COP / máximo $2.000.000 COP
- Saldo insuficiente
- Autoenvío al propio número
- Actualización de saldos e historial post-transacción

---

## Módulo 3 – API Testing (ReqRes)

**Base URL:** `https://reqres.in/api`  
**Specs:** `api/automated-tests/`  
**Fixtures:** `cypress/fixtures/api-data.json`

| ID | Método | Endpoint | Escenario |
|---|---|---|---|
| TC-API-001 | POST | /users | Crear usuario → 201 |
| TC-API-002 | POST→GET | /users/{id} | Crear y consultar |
| TC-API-003 | GET | /users?page=1 | Listar paginado → 200 |
| TC-API-004 | GET | /users/9999 | Inexistente → 404 |
| TC-API-005 | PUT | /users/2 | Actualización completa → 200 |
| TC-API-006 | PATCH | /users/2 | Actualización parcial → 200 |
| TC-API-007 | DELETE | /users/2 | Eliminar → 204 |
| TC-API-008 | POST | /login | Login exitoso → token |
| TC-API-009 | POST | /login | Sin password → 400 |
| TC-API-010 | POST | /register | Register exitoso → id + token |

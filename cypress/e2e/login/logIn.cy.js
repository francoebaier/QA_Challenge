/// <reference types="cypress" />
import LogIn     from '../../pages/LogIn'
import Inventory from '../../pages/Inventory'

describe('Login Page – SauceDemo', () => {

    beforeEach(() => {
        LogIn.visit()
    })

    it('TC-001 | La página de login carga correctamente', () => {
        cy.get(LogIn.usernameInput).should('be.visible')
        cy.get(LogIn.passwordInput).should('be.visible')
        cy.get(LogIn.loginButton).should('be.visible').and('have.value', 'Login')
    })

    //Happy path

    it('TC-002 | Login exitoso con usuario válido', () => {
        // Pre-login: campos visibles y botón habilitado
        cy.get(LogIn.usernameInput).should('be.visible')
        cy.get(LogIn.passwordInput).should('be.visible')
        cy.get(LogIn.loginButton).should('be.visible').and('be.enabled')

        // Login
        cy.fixture('users').then(({ validUser }) => {
            LogIn.login(validUser.username, validUser.password)
        })

        // Post-login: URL, título Products, lista de productos, sin error
        Inventory.assertLoaded()
    })

    // Casos negativos 

    it('TC-003 | Login fallido con contraseña incorrecta', () => {
        cy.fixture('users').then(({ validUser, wrongPassword }) => {
            LogIn.login(validUser.username, wrongPassword.password)

            // 1 + 2: contenedor de error visible con mensaje correcto
            cy.get(LogIn.errorMsg)
                .should('be.visible')
                .and('contain', 'Epic sadface: Username and password do not match any user in this service')

            // 3: URL no avanzó al inventario
            cy.url().should('not.include', '/inventory.html')

            // 4: formulario de login sigue visible
            cy.get(LogIn.loginForm).should('be.visible')

            // 5: listado de productos no existe
            cy.get(Inventory.inventoryList).should('not.exist')

            // 6: campos muestran estado visual de error
            cy.get(LogIn.usernameInput).should('have.class', 'input_error')
            cy.get(LogIn.passwordInput).should('have.class', 'input_error')
        })
    })

    it('TC-004 | Login fallido con usuario bloqueado', () => {
        cy.fixture('users').then(({ lockedUser }) => {
            LogIn.login(lockedUser.username, lockedUser.password)
            cy.get(LogIn.errorMsg)
                .should('be.visible')
                .and('contain', 'Epic sadface: Sorry, this user has been locked out.')
        })
    })

    // Campos obligatorios

    it('TC-005 | Error al enviar formulario sin credenciales', () => {
        LogIn.clickLogin()
        LogIn.assertErrorMessage('Epic sadface: Username is required')
        cy.url().should('not.include', '/inventory.html')
        cy.get(LogIn.loginForm).should('be.visible')
        cy.get(Inventory.inventoryList).should('not.exist')
        cy.get(LogIn.usernameInput).should('have.class', 'input_error')
    })

    it('TC-006 | Error al enviar sin password', () => {
        cy.fixture('users').then(({ validUser }) => {
            LogIn.fillUsername(validUser.username)
            LogIn.clickLogin()
            LogIn.assertErrorMessage('Epic sadface: Password is required')
            cy.url().should('not.include', '/inventory.html')
            cy.get(LogIn.loginForm).should('be.visible')
            cy.get(Inventory.inventoryList).should('not.exist')
            cy.get(LogIn.passwordInput).should('have.class', 'input_error')
        })
    })

    it('TC-011 | Error al enviar sin usuario con contraseña ingresada', () => {
        cy.fixture('users').then(({ validUser }) => {
            LogIn.fillPassword(validUser.password)
            LogIn.clickLogin()
            LogIn.assertErrorMessage('Epic sadface: Username is required')
            cy.url().should('not.include', '/inventory.html')
            cy.get(LogIn.loginForm).should('be.visible')
            cy.get(Inventory.inventoryList).should('not.exist')
            cy.get(LogIn.usernameInput).should('have.class', 'input_error')
        })
    })

    // Casos opcionales

    it('TC-007 | Login fallido con usuario inexistente', () => {
        cy.fixture('users').then(({ invalidUser }) => {
            LogIn.login(invalidUser.username, invalidUser.password)
            cy.get(LogIn.errorMsg)
                .should('be.visible')
                .and('contain', 'Epic sadface: Username and password do not match any user in this service')
            cy.url().should('not.include', '/inventory.html')
        })
    })

    it('TC-008 | Login fallido con contraseña con espacios', () => {
        cy.fixture('users').then(({ passwordWithSpaces }) => {
            LogIn.login(passwordWithSpaces.username, passwordWithSpaces.password)
            cy.get(LogIn.errorMsg)
                .should('be.visible')
                .and('contain', 'Epic sadface: Username and password do not match any user in this service')
            cy.url().should('not.include', '/inventory.html')
        })
    })

    it('TC-009 | Login fallido con contraseña en mayúsculas (case-sensitive)', () => {
        cy.fixture('users').then(({ passwordUpperCase }) => {
            LogIn.login(passwordUpperCase.username, passwordUpperCase.password)
            cy.get(LogIn.errorMsg)
                .should('be.visible')
                .and('contain', 'Epic sadface: Username and password do not match any user in this service')
            cy.url().should('not.include', '/inventory.html')
        })
    })

    it('TC-010 | Cerrar mensaje de error y volver a intentar con credenciales válidas', () => {
        cy.fixture('users').then(({ validUser, wrongPassword }) => {
            // Primer intento: falla
            LogIn.login(validUser.username, wrongPassword.password)
            cy.get(LogIn.errorMsg).should('be.visible')

            // Cerrar el error
            LogIn.dismissError()
            cy.get(LogIn.errorMsg).should('not.exist')

            // Segundo intento: exitoso
            LogIn.login(validUser.username, validUser.password)
            Inventory.assertLoaded()
        })
    })

})

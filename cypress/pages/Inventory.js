export class Inventory {
  title         = '[data-test="title"]'
  inventoryList = '[data-test="inventory-list"]'
  inventoryItem = '[data-test="inventory-item"]'
  appLogo       = '.app_logo'
  errorMsg      = '[data-test="error"]'

  assertLoaded() {
    cy.url().should('include', '/inventory.html')
    cy.get(this.title).should('be.visible').and('have.text', 'Products')
    cy.get(this.inventoryList).should('be.visible')
    cy.get(this.inventoryItem).should('have.length.greaterThan', 0)
    cy.get(this.errorMsg).should('not.exist')
  }
}

export default new Inventory()

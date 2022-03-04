describe('Admin', () => {
  before(() => {
    cy.login()
    cy.task('db:seed')
  })

  describe('Navigation', () => {
    it(`Should open navigation with shortcut and allow selection with arrow key.
             Navigate to list and with a click on row, open detail`, () => {
      cy.visit('/tocco')
      cy.contains('nice') // wait till username is shown in top right corner
      cy.get('body').type('{ctrl}{alt}m')
      cy.getByAttr('admin-nav', 'ui-search-box').should('be.focused').clear().type('Veranstaltung')
      cy.getByAttr('admin-menuitem-address').should('not.exist')
      cy.getByAttr('admin-menuitem-event').should('exist')
      cy.get('body').type('{downarrow}')
      cy.get('[data-cy=admin-menuitem-event] a[data-quick-navigation]').should('be.focused')
      cy.focused().click()

      cy.url().should('include', 'e/Event/list')
      cy.getByAttr('list-navigation-arrow').first().click()
      cy.url().should('include', '/detail')
    })
  })
})

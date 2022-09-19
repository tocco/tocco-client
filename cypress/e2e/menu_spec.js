describe('Menu', () => {
  before(() => {
    cy.login()
    cy.visit('/tocco')
    cy.contains('tocco-test') // wait till username is shown in top right corner
    cy.getByAttr('infobox-newapplications') // wait until dashboards are loaded
  })

  it('Should open and close menu with shortcut', () => {
    cy.get('body').type('{ctrl}{alt}m')
    cy.getByAttr('admin-nav').should('be.visible')
    cy.get('body').type('{ctrl}{alt}m')
    cy.getByAttr('admin-nav').should('not.be.visible')
  })

  it('Should open and close menu with mouse', () => {
    cy.get('#react-burger-menu-btn').click()
    cy.getByAttr('admin-nav').should('be.visible')
    cy.get('#react-burger-menu-btn').click()
    cy.getByAttr('admin-nav').should('not.be.visible')
  })

  it('Should expand and collapse all menu entries', () => {
    cy.get('body').type('{ctrl}{alt}m')
    cy.getByAttr('expand-all-menu-entries').click()
    cy.get('[data-cy=menu-entry-wrapper] > [data-cy^=admin-menuitem]').each($el => {
      cy.wrap($el).get('[data-cy=menu-children-wrapper]').should('be.visible')
    })
    cy.getByAttr('collapse-all-menu-entries').click()
    cy.get('[data-cy=menu-entry-wrapper] > [data-cy^=admin-menuitem]').each($el => {
      cy.wrap($el).get('[data-cy=menu-children-wrapper]').should('not.be.visible')
    })
    cy.get('body').type('{ctrl}{alt}m')
  })

  it('Should show extended search', () => {
    cy.get('body').type('{ctrl}{alt}m')
    cy.getByAttr('admin-nav', 'ui-search-box').should('be.focused').clear().type('bus')
    cy.getByAttr('extended-search-wrapper').should('be.visible')
  })
})

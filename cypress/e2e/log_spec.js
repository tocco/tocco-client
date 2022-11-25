describe('LogView-Action', () => {
  before(() => {
    cy.login()
  })
  it(`Should open navigation, search for log-view and open the action`, () => {
    cy.visit('/tocco')
    cy.contains('tocco-test') // wait till username is shown in top right corner
    cy.getByAttr('infobox-newapplications') // wait until dashboards are loaded
    cy.get('body').type('{ctrl}{alt}m')
    cy.getByAttr('menu-tab-system').click()
    cy.getByAttr('admin-nav', 'ui-search-box').should('be.focused').clear().type('Log-Ansicht')
    cy.getByAttr('admin-menuitem-log').should('exist')
    cy.get('[data-cy=menu-entry-wrapper] > [data-cy^=admin-menuitem]').should('have.length', 1)
    cy.get('[data-cy=admin-menuitem-log] a[data-quick-navigation]').click()

    cy.getByAttr('form-field').should('exist')
    cy.getByAttr('form-field').should('have.length', 3)

    cy.get('#fileSelectField').click()
    cy.get('#react-select-2-option-0').should('be.visible')
    cy.get('#react-select-2-option-0').click()
    cy.get('#react-select-2-option-0').should('not.exist')

    cy.get('#fileCountField').click()
    cy.focused().clear().type(123)
    cy.focused().type('Test')
    cy.get('#fileCountField').should('have.value', '123')

    cy.get('#hostnameField').click({force: true})
    cy.get('#hostnameField').should('be.disabled')
    cy.get('#hostnameField').should('have.not.focus')

    cy.contains('Log-Datei')
    cy.contains('Zeilenanzahl')
    cy.contains('Host')
    cy.contains('Neu laden').click()
  })
})

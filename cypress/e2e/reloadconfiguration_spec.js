describe('reloadConfiguration', () => {
  it('should open the configuration page and reload selected configurations', () => {
    cy.login()
    cy.visit('/tocco')
    cy.contains('tocco-test')
    cy.getByAttr('infobox-newapplications')
    cy.get('body').type('{ctrl}{alt}m')
    cy.getByAttr('menu-tab-system').click()
    cy.get('body').get('[data-cy="admin-menuitem-reload-configuration"] [data-quick-navigation]').click()
    cy.get('input[id="editable-value-acl"]').click()
    cy.get('button[id="reload-selected-button"]').click()
    cy.get('.StyledToaster-eUKHVb').should('be.visible')
  })
})

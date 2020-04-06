import helpers from '../helpers/helpers'

const visitAdmin = (suffix = '') => {
  cy.visit(`${helpers.getStoryUrl(['Apps', 'Admin'], 'Admin')}${suffix}`)
}

describe('Admin', () => {
  before(() => {
    cy.login()
  })

  describe('Navigation', () => {
    it(`Should open navigation with shortcut and allow selection with arrow key.
             Navigate to list and with a click on row, open detail`, () => {
      visitAdmin()
      cy.get('body').type('{ctrl}m')
        .wait(100).type('Veranstaltung')
        .wait(50).type('{downarrow}')
        .focused().click()
      cy.url().should('include', 'e/Event/list')
      cy.get(' [data-cy=list-navigation-arrow]').first().click()
      cy.url().should('include', '/detail')
    })
  })
})

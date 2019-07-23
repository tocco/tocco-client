import helpers from '../helpers/helpers'

describe('Entity Browser', function() {
  before(() => {
    cy.login()
  })

  describe('ListView', () => {
    beforeEach(() => {
      cy.visit(`${helpers.getStoryUrl(['Apps', 'Entity Browser'], 'Entity Browser')}`)
    })

    it('should load and display essential parts of the list view', function() {
      cy.contains('Daten werden geladen...', {timeout: 15000})
      cy.get('[title="Vorname"]')
        .should('be.visible')
      cy.get('[type="submit"]')
        .should('be.visible')
      cy.contains('Einträgen')
      cy.contains('Aktionen auf Alle')
      cy.get('[data-cy=list-cell]', {timeout: 6000})
        .should('have.length.above', 1)
    })

    describe('SearchForm', () => {
      it('should display extended search form', function() {
        cy.get('[data-cy=form-field]')
          .should('have.length', 1)
        cy.get('[data-cy=extend-search-button]')
          .click()
        cy.get('[data-cy=form-field]')
          .should('have.length.above', 1)
      })

      it('should reset list view through search button reset', function() {
        cy.get('input#input-searchForm-txtFulltext')
          .type('Test Person')
        cy.get('[data-cy=search-form_reset-button]')
          .click({force: true})
        cy.get('[data-cy=form-field]').children().children()
          .should('be.empty')
      })
    })
  })

  describe('DetailView', () => {
    beforeEach(() => {
      cy.visit(`${helpers.getStoryUrl(['Apps', 'Entity Browser'], 'Entity Browser')}detail/15737`)
    })

    it('should display detail view', function() {
      cy.get('[data-cy=form-field]').should('have.length.above', 1)
    })

    it('should change value in detail view and save', function() {
      cy.get('input#input-detailForm-callname')
        .type('{selectall}{del}Test Callname')
        .should('have.value', 'Test Callname')
      cy.get('[data-cy=detail-form_submit-button]').click()
      cy.contains('Zuletzt gespeichert')
    })

    it('should change page back to list view without warning', function() {
      cy.get('[data-cy=entity-detail_back-button]')
        .click({force: true})
      cy.get('[data-cy=list-cell]', {timeout: 15000})
        .should('have.length.above', 1)
    })

    it('should display warning on changing page back to list view on edited form', function() {
      cy.get('input#input-detailForm-callname')
        .type('{selectall}{del}')
      cy.get('[data-cy=entity-detail_back-button]').click()
      cy.contains('ungespeicherte Änderungen')
    })
  })
})

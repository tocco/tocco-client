import helpers from '../helpers/helpers'

describe('Entity Browser', function() {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    cy.visit(`${helpers.getStoryUrl(['Apps', 'Entity Browser'], 'Entity Browser')}`)
  })

  describe('ListView', () => {
    it('should load and display essential parts of the list view', function() {
      cy.contains('Daten werden geladen...', {timeout: 15000})
      cy.get('[title="Vorname"]')
      cy.get('[type="submit"]')
      cy.contains('Einträgen')
      cy.contains('Aktionen auf Alle')
      cy.get('[data-cy=list-cell]').then(el => {
        cy.wrap(el).should('have.length.above', 10)
      })
    })
  })

  describe('DetailView', () => {
    beforeEach(() => {
      cy.get('[data-cy=list-cell]').then(el => {
        const firstCell = el.first()
        cy.wrap(firstCell).click()
      })
    })

    it('should display detail view', function() {
      cy.get('[data-cy=cypress-form-field]').then(el => {
        cy.wrap(el).should('have.length.above', 1)
      })
    })

    it('should change value in detail view and save', function() {
      cy.get('input#input-detailForm-callname').then(el => {
        cy.wrap(el)
          .type('{selectall}{del}Test Callname')
          .should('have.value', 'Test Callname')
      })
      cy.get('[data-cy=detail-form_submit-button]').children().first()
        .click()
      cy.contains('Zuletzt gespeichert', {timeout: 4000})
    })

    it('should change page back to list view without warning', function() {
      cy.get('[data-cy=entity-detail_back-button]').children().first().then(el => {
        cy.wrap(el).click()
      })
      cy.get('[data-cy=list-cell]').then(el => {
        const listCells = el.children()
        cy.wrap(listCells).should('have.length.above', 10)
      })
    })

    it('should display warning on changing page back to list view on edited form', function() {
      cy.get('input#input-detailForm-callname')
        .type('{selectall}{del}')
      cy.get('[data-cy=entity-detail_back-button]').children().first().then(el => {
        cy.wrap(el).click()
      })
      cy.contains('ungespeicherte Änderungen', {timeout: 2000})
    })
  })

  describe('SearchForm', () => {
    it('should display extended search form', function() {
      cy.get('[data-cy=extend-search-button]').children().first()
        .click({force: true})
      cy.get('[data-cy=cypress-form-field]').then(el => {
        cy.wrap(el).should('have.length.above', 10)
      })
    })

    it('should reset list view through search button reset', function() {
      cy.get('[data-cy=cypress-form-field]').children().children()
        .type('Test Person')
      cy.get('[data-cy=search-form_reset-button]')
        .click({force: true})
      cy.get('[data-cy=list-cell]').then(el => {
        const listCells = el.children()
        cy.wrap(listCells).should('have.length.above', 10)
      })
    })
  })
})

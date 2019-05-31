import {getStoryUrl} from '../helpers/helpers'

describe('Entity Browser', function() {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    cy.visit(`${getStoryUrl(['Apps', 'Entity Browser'], 'Entity Browser')}`)
  })

  it('should load and display essential parts of the list view', function() {
    cy.contains('Daten werden geladen...', {timeout: 8000})
    cy.get('[title="Vorname"]')
    cy.get('[type="submit"]')
    cy.contains('Einträgen')
    cy.contains('Aktionen auf Alle')
    cy.get('[data-list-cell]').should('have.length.above', 10)
  })

  it('should display detail view', function() {
    cy.get('tr.break-word.pointer').first()
      .click()
    cy.get('.form-group')
      .should('have.length.above', 50)
  })

  it('should change value in detail view and save', function() {
    cy.get('tr.break-word.pointer').first()
      .click()
    cy.get('input#input-detailForm-callname')
      .type('{selectall}{del}Test Callname')
    cy.get('input#input-detailForm-callname')
      .should('have.value', 'Test Callname')
    cy.contains('Speichern')
      .click()
    cy.contains('Zuletzt gespeichert')
  })

  it('should change page back to list view without warning', function() {
    cy.get('tr.break-word.pointer').first()
      .click()
    cy.get('button').first()
      .click()
    cy.get('[data-list-cell]').should('have.length.above', 10)
  })

  it('should display warning on changing page back to list view on edited form', function() {
    cy.get('tr.break-word.pointer').first()
      .click()
    cy.get('input#input-detailForm-callname')
      .type('Test Callname')
    cy.get('button').first()
      .click()
    cy.contains('ungespeicherte Änderungen')
  })

  it('should display extended search form', function() {
    cy.get('button').children('svg')
      .click()
    cy.get('.form-horizontal').children().first().children()
      .should('have.length.above', 10)
  })

  it('should reset list view through search button reset', function() {
    cy.get('input#input-searchForm-txtFulltext')
      .type('Test Person')
    cy.contains('Daten werden geladen...')
    cy.get('button').next().next()
      .click()
    cy.get('[data-list-cell]').should('have.length.above', 10)
  })
})

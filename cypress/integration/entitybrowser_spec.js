import helpers from '../helpers/helpers'

const getPkFromUrl = url => url.substring(url.lastIndexOf('/') + 1)

const LONG_TIMEOUT = 15000

const createUser = (firstname, lastname) => {
  return cy.request({
    url: `${Cypress.env('BACKEND_URL')}/nice2/rest/entities/User`,
    method: 'POST',
    json: true,
    body: {model: 'User', key: null, paths: {firstname, lastname, relGender: {key: '2'}}}
  }).then(response => {
    const location = response.headers.location
    return getPkFromUrl(location)
  })
}

const deleteUser = pk => {
  return cy.request({
    url: `${Cypress.env('BACKEND_URL')}/nice2/rest/entities/User/${pk}`,
    method: 'DELETE'
  })
}

const visitEntityBrowser = (suffix = '') => {
  cy.visit(`${helpers.getStoryUrl(['Apps', 'Entity Browser'], 'Entity Browser')}${suffix}`)
}

describe('Entity Browser', () => {
  before(() => {
    cy.login()
  })

  describe('Create', () => {
    it('should navigate to create view wit NEW button', () => {
      visitEntityBrowser()

      cy.get('[data-cy=action-new]', {timeout: LONG_TIMEOUT})
        .should('be.enabled')
        .click()

      cy.contains('Personenangaben', {timeout: LONG_TIMEOUT})
    })

    it('should create a new User with basic data', () => {
      visitEntityBrowser('detail')

      cy.get('#input-detailForm-firstname').type('Cypress Test')
      cy.get('#input-detailForm-lastname').type('Test (can be deleted)').blur()

      cy.get('[data-cy=detail-form_submit-button]').click()
      cy.contains('Dieses Feld darf nicht leer sein')

      cy.get('#input-detailForm-relGender').type('{downarrow}').get('#react-select-3-option-1').click()

      cy.get('[data-cy=detail-form_submit-button]').click()
      cy.contains('Erstellt')

      cy.url().then(url => {
        const pk = getPkFromUrl(url)
        deleteUser(pk)
      })
    })
  })

  describe('Edits', () => {
    beforeEach(() => {
      createUser('Cypress Test', 'Can be deleted').then(pk => {
        cy.wrap(pk).as('pk')
        visitEntityBrowser('detail/' + pk)
      })
    })

    afterEach(() => {
      cy.get('@pk').then(pk => { deleteUser(pk) })
    })

    it('should display detail view', () => {
      cy.get('[data-cy=form-field]').should('have.length.above', 1)
    })

    it('should change value in detail view and save', () => {
      cy.get('#input-detailForm-callname')
        .type('{selectall}{del}Test')
        .should('have.value', 'Test')
      cy.get('[data-cy=detail-form_submit-button]').click()
      cy.contains('Gespeichert')
    })

    it('should change page back to list view without warning', () => {
      cy.get('[data-cy=entity-detail_back-button]')
        .click()
      cy.get('[data-cy=list-cell]', {timeout: LONG_TIMEOUT})
        .should('have.length.above', 1)
    })

    it('should change page back to list view without warning if data did not change', () => {
      cy.get('input#input-detailForm-firstname')
        .type('{selectall}{del}Cypress Test')
      cy.wait(300) // Wait for debounced onChange
      cy.get('[data-cy=entity-detail_back-button]')
        .click()
      cy.get('[data-cy=list-cell]', {timeout: LONG_TIMEOUT})
        .should('have.length.above', 1)
    })

    it('should display warning on changing page back to list view on edited form', () => {
      cy.get('input#input-detailForm-callname')
        .type('{selectall}{del}Test')
      cy.wait(300) // Wait for debounced onChange
      cy.get('[data-cy=entity-detail_back-button]').click()
      cy.contains('ungespeicherte Änderungen')
    })

    it('should allow update of various fields', () => {
      cy.get('#input-detailForm-firstname').type('!')
      cy.get('#input-detailForm-lastname').type('!')
      cy.get('#input-detailForm-email').type('test@tocco.ch')
      cy.get('#input-detailForm-callname').type('cyp')
      cy.get('#input-detailForm-relGender').type('{downarrow}').get('#react-select-3-option-1').click()
      cy.get('#input-detailForm-birthdate > .flatpickr-input').eq(1).type('14111988{enter}')
      cy.get('#input-detailForm-abbreviation').focus()
      cy.get('#input-detailForm-publish').check()
      cy.get('#input-detailForm-comment').type('Line1{enter}Line2{enter}Line3')
      cy.get('[data-cy=detail-form_submit-button]').click()
      cy.contains('Gespeichert')
    })
  })

  describe('List View', () => {
    beforeEach(() => {
      visitEntityBrowser()
    })

    it('should load and display essential parts of the list view', () => {
      cy.contains('Daten werden geladen...', {timeout: LONG_TIMEOUT})
      cy.get('[data-cy=header-cell-firstname]')
        .should('be.visible')
      cy.contains('Alle')
      cy.get('[data-cy=list-cell]')
        .should('have.length.above', 1)
    })

    it('should handle selection', () => {
      cy.get('[data-cy=list-row]')
        .should('have.length.above', 5)

      cy.get('[data-cy=list-selection-checkbox]').first().click()
      cy.get('[data-cy=list-selection-checkbox]').eq(3).click()
      cy.get('[data-cy=list-selection-checkbox]').eq(5).click()
      cy.contains('Selektiert: 3')

      cy.get('[data-cy=selection-controller-selection]').click()
      cy.get('[data-cy=list-row]')
        .should('have.length', 3)
      cy.get('[data-cy=selection-controller-delete-selection]').click()

      cy.get('[data-cy=list-row]')
        .should('have.length.above', 5)
    })

    it('should handle column sorting and multi sorting', () => {
      cy.get('[data-cy=header-cell-firstname]').click()
      cy.get('[data-cy=header-cell-firstname]').find('svg').should('have.attr', 'data-icon', 'sort-up')
      cy.get('[data-cy=header-cell-firstname]').click()
      cy.get('[data-cy=header-cell-firstname]').find('svg').should('have.attr', 'data-icon', 'sort-down')
      cy.get('#header-cell-lastname').click()
      cy.get('[data-cy=header-cell-firstname]').find('svg').should('have.length', 0)
      cy.get('body').type('{shift}', {release: false})
      cy.get('[data-cy=header-cell-firstname]').click()
      cy.get('[data-cy=header-cell-firstname]').find('svg').should('have.attr', 'data-icon', 'sort-up')
      cy.get('[data-cy=header-cell-firstname]').contains('2')
    })

    it('should handle resize of a column with min width', () => {
      cy.get('[data-cy=header-cell-firstname]').should('not.have.css', 'width', '30px')
      cy.get('[data-cy=header-cell-firstname] > .resizeHandle').trigger('mousedown')
        .trigger('mousemove', {clientX: 500, clientY: 0})
        .trigger('mousemove', {clientX: 100, clientY: 0})
        .trigger('mouseup')
      cy.get('[data-cy=header-cell-firstname]').should('have.css', 'width', '30px')
    })
  })

  describe('List Search', () => {
    beforeEach(() => {
      visitEntityBrowser()
    })

    it('should display extended search form', () => {
      cy.get('[data-cy=form-field]')
        .should('have.length', 1)
      cy.get('[data-cy=extend-search-button]')
        .click()
      cy.get('[data-cy=form-field]')
        .should('have.length.above', 1)
    })

    it('should find created user', () => {
      const random = Math.floor(Math.random() * 1000000)
      const firstName = `Cypress Test${random}`
      const lastName = 'lastname ' + random

      createUser(firstName, lastName).then(pk => {
        cy.wait(2000) // needed to make sure user is found via fulltext
        cy.get('input#input-searchForm-txtFulltext')
          .type(`${firstName}{enter}`)
        cy.contains(lastName, {timeout: LONG_TIMEOUT})

        deleteUser(pk)
      })
    })
  })
})

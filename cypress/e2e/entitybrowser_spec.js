const LONG_TIMEOUT = 15000

/**
 * Entity-Browser Widget has been removed.
 * TO DO: Migrate tests to specific Widget e.g. Einsatzeinsicht
 */
describe.skip('Entity Browser', () => {
  beforeEach(() => {
    cy.task('db:empty', undefined, {timeout: 180000})
    cy.loginWidget()
  })

  it('should be able to create a new user with basic data', () => {
    cy.task('db:seed:entity-browser').then(response => {
      cy.visitWidget(response.pk)

      cy.get('[data-cy=action-new]', {timeout: LONG_TIMEOUT}).should('be.enabled').click()

      cy.contains('Personenangaben', {timeout: LONG_TIMEOUT})

      cy.get('#input-detailForm-firstname').type('Cypress Test')
      cy.get('#input-detailForm-lastname').type('Test (can be deleted)').blur()

      cy.get('[data-cy=detail-form_submit-button]').click()
      cy.contains('Dieses Feld darf nicht leer sein')

      cy.get('#input-detailForm-relGender').type('{downarrow}').wait(100).get('#react-select-3-option-1').click()
      cy.wait(200)
      cy.get('[data-cy=detail-form_submit-button]').click()
      cy.contains('Erstellt')
    })
  })

  it('should be able to navigate to and edit an existing user', () => {
    cy.task('db:seed:entity-browser').then(({pk: widgetConfigKey}) => {
      cy.task('db:seed:user').then(user => {
        cy.visitWidget(widgetConfigKey, `/detail/${user.pk}`)

        // should display detail view
        cy.get('[data-cy=form-field]').should('have.length.above', 1)

        // should change value in detail view and save
        cy.get('#input-detailForm-callname').type('{selectall}{del}Test').should('have.value', 'Test')
        cy.get('[data-cy=detail-form_submit-button]').click()
        cy.contains('Gespeichert')

        // should change page back to list view without warning
        cy.get('[data-cy=entity-detail_back-button]').click()
        cy.get('[data-cy=list-cell]', {timeout: LONG_TIMEOUT}).should('have.length.above', 1)

        // should change page back to list view without warning if data did not change
        cy.get('[data-cy=list-row]:nth-child(1) [data-cy=list-cell]:nth-child(4)').click()
        cy.get('input#input-detailForm-firstname').type('{selectall}{del}').type(user.firstname)
        cy.wait(300) // Wait for debounced onChange
        cy.get('[data-cy=entity-detail_back-button]').click()
        cy.get('[data-cy=list-cell]', {timeout: LONG_TIMEOUT}).should('have.length.above', 1)

        // should display warning on changing page back to list view on edited form
        cy.get('[data-cy=list-row]:nth-child(1) [data-cy=list-cell]:nth-child(4)').click()
        cy.get('input#input-detailForm-firstname').type('{selectall}{del}Test')
        cy.wait(300) // Wait for debounced onChange
        cy.get('[data-cy=entity-detail_back-button]').click()
        cy.contains('ungespeicherte Änderungen')
        cy.get('button[label=OK]').click()

        // should allow update of various fields
        cy.get('[data-cy=list-row]:nth-child(1) [data-cy=list-cell]:nth-child(4)').click()
        cy.get('#input-detailForm-firstname').type('!')
        cy.get('#input-detailForm-lastname').type('!')
        cy.get('#input-detailForm-email').type('test@tocco.ch')
        cy.get('#input-detailForm-callname').type('cyp')
        cy.get('#input-detailForm-relGender').type('{downarrow}{downarrow}{enter}')
        cy.get('#input-detailForm-birthdate .react-datepicker__input-container input')
          .type('14.11.1988')
          .type('{enter}')
        cy.get('#input-detailForm-abbreviation').focus()
        cy.get('#input-detailForm-publish').check()
        cy.get('#input-detailForm-comment').type('Line1{enter}Line2{enter}Line3')
        cy.get('[data-cy=detail-form_submit-button]').click()
        cy.contains('Gespeichert')
      })
    })
  })

  it('should be able to handle list view', () => {
    cy.task('db:seed:user')
    cy.task('db:seed:user')
    cy.task('db:seed:user')
    cy.task('db:seed:user')
    cy.task('db:seed:user')
    cy.task('db:seed:entity-browser').then(({pk: widgetConfigKey}) => {
      cy.visitWidget(widgetConfigKey)
    })

    // should load and display essential parts of the list view
    cy.contains('Daten werden geladen...', {timeout: LONG_TIMEOUT})
    cy.get('[data-cy=header-cell-firstname]').should('be.visible')
    cy.contains('Alle')
    cy.get('[data-cy=list-cell]').should('have.length.above', 1)

    // should handle selection
    cy.get('[data-cy=list-row]').should('have.length.above', 5)
    cy.wait(500) // without this wait a "detached" error is thrown
    cy.get('[data-cy=list-selection-checkbox]').first().click()
    cy.get('[data-cy=list-selection-checkbox]').eq(3).click()
    cy.get('[data-cy=list-selection-checkbox]').eq(5).click()
    cy.contains('Selektiert: 3')

    cy.get('[data-cy=selection-controller-selection]').click()
    cy.get('[data-cy=list-row]').should('have.length', 3)
    cy.get('[data-cy=selection-controller-delete-selection]').click()

    cy.get('[data-cy=list-row]').should('have.length.above', 5)

    // should handle column sorting and multi sorting
    cy.get('[data-cy=header-cell-user_nr]').click() // Reset
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

    // should handle resize of a column with min width
    cy.get('[data-cy=header-cell-firstname]').should('not.have.css', 'width', '30px')
    cy.wait(500) // without this wait, a rerender will let the test fail
    cy.get('[data-cy=header-cell-firstname-resizing-controller]')
      .trigger('mousedown')
      .trigger('mousemove', {clientX: 500, clientY: 0})
      .wait(100)
      .trigger('mousemove', {clientX: 40, clientY: 0})
      .trigger('mouseup')
      .wait(100)
    cy.get('[data-cy=header-cell-firstname]').invoke('outerWidth').should('eq', 50)
  })

  it('should be able to search', () => {
    cy.task('db:seed:user').then(user => {
      cy.task('db:seed:entity-browser').then(({pk: widgetConfigKey}) => {
        cy.visitWidget(widgetConfigKey)
      })

      // should display extended search form
      cy.get('[data-cy=form-field]').should('have.length', 1)
      cy.get('[data-cy=extend-search-button]').click()
      cy.get('[data-cy=form-field]').should('have.length.above', 1)

      // should find created user
      cy.wait(2000) // needed to make sure user is found via fulltext
      cy.get('input#input-searchForm-txtFulltext').type(`${user.firstname}{enter}`)
      cy.contains(user.lastname, {timeout: LONG_TIMEOUT})
    })
  })
})

import helpers from '../helpers/helpers'

describe('Login', function() {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    cy.visit(`${helpers.getStoryUrl(['Apps', 'Login'], 'Login')}`)
  })

  describe('Login', () => {
    it('should load and display login view', function() {
      cy.contains('Dieser Bereich ist privat.', {timeout: 15000})
      cy.get('button').should('have.length', 2)
    })

    it('should not be possible to click login button', function() {
      cy.get('[data-cy=login-form_user-input]').then(el => {
        cy.wrap(el).type('{selectall}{del}cypress_test')
      })
      cy.get('[data-cy=login-form_login-button]').then(el => {
        cy.wrap(el).click({force: true})
      })
      cy.contains('Dieser Bereich ist privat.')
      cy.get('[data-cy=login-form_user-input]').then(el => {
        cy.wrap(el).type('{selectall}{del}')
      })
      cy.get('[data-cy=login-form_password-input]').then(el => {
        cy.wrap(el).type('{selectall}{del}12345')
      })
      cy.get('[data-cy=login-form_login-button]').then(el => {
        cy.wrap(el).click({force: true})
      })
      cy.contains('Dieser Bereich ist privat.')
    })

    it('should login', function() {
      cy.get('[data-cy=login-form_user-input]').then(el => {
        cy.wrap(el).type('{selectall}{del}cypress_test')
      })
      cy.get('[data-cy=login-form_password-input]').then(el => {
        cy.wrap(el).type('{selectall}{del}Test_pw1')
      })
      cy.get('[data-cy=login-form_login-button]').then(el => {
        cy.wrap(el).click()
          .children().first().should('be', 'svg', {timeout: 5000})
      })
    })

    it('should display error message on wrong login', function() {
      cy.get('[data-cy=login-form_user-input]').then(el => {
        cy.wrap(el).type('{selectall}{del}cypress_test')
      })
      cy.get('[data-cy=login-form_password-input]').then(el => {
        cy.wrap(el).type('{selectall}{del}asdf')
      })
      cy.get('[data-cy=login-form_login-button]').then(el => {
        cy.wrap(el).click()
      })
      cy.contains('Login fehlgeschlagen.', {timeout: 3000})
      // do successful login to reset failed login counter
      cy.get('[data-cy=login-form_user-input]').then(el => {
        cy.wrap(el).type('{selectall}{del}cypress_test')
      })
      cy.get('[data-cy=login-form_password-input]').then(el => {
        cy.wrap(el).type('{selectall}{del}Test_pw1')
      })
    })

    it('should request password from request page', function() {
      cy.contains('Passwort vergessen?', {timeout: 2000})
      cy.get('[data-cy=login-form_request-button]').then(el => {
        cy.wrap(el).click()
      })
      cy.get('[data-cy=password-request_input]').then(el => {
        cy.wrap(el).type('{selectall}{del}test@testmail.com')
      })
      cy.get('[data-cy=password-request_submit-button]').then(el => {
        cy.wrap(el).click()
      })
      cy.contains('Dieser Bereich ist privat.', {timeout: 2000})
      cy.contains('Passwort wurde per E-Mail versendet')
    })

    it('should change to login page on abort of password request ', function() {
      cy.get('[data-cy=login-form_request-button]').then(el => {
        cy.wrap(el).click()
      })
      cy.contains('Passwort vergessen?', {timeout: 2000})
      cy.get('[data-cy=password-request_abort-button]').then(el => {
        cy.wrap(el).click()
      })
      cy.contains('Dieser Bereich ist privat.', {timeout: 2000})
    })
  })
})

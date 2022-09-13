const visitLogin = widgetConfigKey => {
  cy.visit(`http://localhost:3000/?key=${widgetConfigKey}`)
}

describe('Login', () => {
  beforeEach(() => {
    cy.task('db:empty', undefined, {timeout: 180000})
  })

  it('should load and display login view', () => {
    cy.task('db:seed:login').then(response => {
      visitLogin(response.pk)
    })

    cy.get('[data-cy=login-form_user-input]', {timeout: 15000}).should('be.visible')
    cy.get('button').should('have.length', 2)
  })

  it('should not be possible to click login button', () => {
    cy.task('db:seed:login').then(response => {
      visitLogin(response.pk)
    })

    cy.get('[data-cy=login-form_user-input]').type('{selectall}{del}some_user')
    cy.get('[data-cy=login-form_login-button]').should('be.disabled')
    cy.get('[data-cy=login-form_user-input]').type('{selectall}{del}')
    cy.get('[data-cy=login-form_password-input]').type('{selectall}{del}12345')
    cy.get('[data-cy=login-form_login-button]').should('be.disabled')
    cy.get('[data-cy=login-form_request-button]')
  })

  it('should send login request', () => {
    cy.task('db:seed:login').then(response => {
      visitLogin(response.pk)
    })

    cy.get('[data-cy=login-form_user-input]').type('{selectall}{del}some_user')
    cy.get('[data-cy=login-form_password-input]').type('{selectall}{del}Test_pw1')
    cy.get('[data-cy=login-form_login-button]').click()
    cy.contains('Login fehlgeschlagen.')
  })

  it('should request password from request page', () => {
    cy.task('db:seed:login').then(response => {
      visitLogin(response.pk)
    })

    cy.contains('Passwort vergessen?')
    cy.get('[data-cy=login-form_request-button]').click()
    cy.get('[data-cy=password-request_input]').type('{selectall}{del}test@testmail.com')
    cy.get('[data-cy=password-request_submit-button]').click()
    cy.contains('Passwort wurde per E-Mail versendet')
  })

  it('should change to login page on abort of password request ', () => {
    cy.task('db:seed:login').then(response => {
      visitLogin(response.pk)
    })

    cy.get('[data-cy=login-form_request-button]').click()
    cy.get('[data-cy=password-request_abort-button]').click()
    cy.get('[data-cy=login-form_user-input]').should('be.visible')
    cy.get('[data-cy=login-form_password-input]').should('be.visible')
  })
})

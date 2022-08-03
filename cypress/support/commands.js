const WidgetBaseUrl = 'http://localhost:3000'

Cypress.Commands.add('login', (options = {}) => {
  const {backendUrl = ''} = options
  cy.task('log', 'Login into Tocco')
  cy.request({
    url: `${backendUrl}/nice2/session`,
    method: 'POST'
  }).then(request => {
    if (request.body?.success !== true) {
      cy.task('log', `Logging in... username: ${Cypress.env('USER')}`)
      cy.request({
        url: `${backendUrl}/nice2/login`,
        body: {username: Cypress.env('USER'), password: Cypress.env('PASSWORD')},
        method: 'POST',
        form: true
      }).then(req => {
        if (req.status === 200) {
          cy.task('log', 'Logged in')
        } else {
          cy.task('log:error', 'Could not log in')
        }
      })
    } else {
      cy.task('log', 'Already logged in')
    }
  })
})

Cypress.Commands.add('loginWidget', () => {
  cy.login({backendUrl: WidgetBaseUrl})
})

Cypress.Commands.add('visitWidget', (widgetConfigKey, suffix = '') => {
  cy.visit(`${WidgetBaseUrl}/?key=${widgetConfigKey}#${suffix}`)
})

Cypress.Commands.add('getByAttr', (...attrs) => {
  const selector = attrs.map(attr => `[data-cy="${attr}"]`).join(' ')
  return cy.get(selector)
})

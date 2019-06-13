Cypress.Commands.add('login', () => {
  cy.request({
    url: Cypress.env('CYPRESS_PR_URL') || `${Cypress.env('BACKEND_URL')}/nice2/session`,
    method: 'POST',
    form: true,
    json: true
  }).then(request => {
    if (request.body) {
      if (request.body.success !== true) {
        cy.request({
          url: `${Cypress.env('BACKEND_URL')}/nice2/login`,
          body: {username: Cypress.env('USER'), password: Cypress.env('PASSWORD')},
          method: 'POST',
          form: true,
          json: true
        })
      }
    }
  })
})

describe('Entity Browser', function() {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    cy.visit(`${getStoryUrl(['Apps', 'Entity Browser'], 'Entity Browser')}`)
  })

  const convert = s => s.replace(/ /g, '-').toLowerCase()

  const getStoryUrl = (chapter, story) =>
    `/iframe.html?id=${chapter.map(c => convert(c)).join('-')}--${convert(story)}#/`

  it('should load and display essential parts of the list view', function() {
    cy.contains('Daten werden geladen...', {timeout: 8000}) // Table Selection
    cy.get('[title="Vorname"]') // Table
    cy.get('[type="submit"]') // Searchform
    cy.contains('Einträgen') // Table Counter
    cy.contains('Aktionen auf Alle') // Table Selection
    cy.get('[data-list-cell]').should('have.length.above', 10) // Data
  })
})

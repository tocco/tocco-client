import {getFetchOptionsFromSearchForm} from './fetchOptions'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('fetchOptions', () => {
        describe('getFetchOptionsFromSearchForm', () => {
          test('should set basic attributes in tql and connect them with and operator', () => {
            const searchFormValues = {
              firstname: 'Robihoe',
              lastname: 'Griffin',
              cool: true
            }

            const expectedResult = {tql: 'firstname == "Robihoe" and lastname == "Griffin" and cool == "true"'}

            const result = getFetchOptionsFromSearchForm(searchFormValues)
            expect(result).to.eql(expectedResult)
          })

          test('should ignore condition without', () => {
            const searchFormValues = {
              firstname: 'Robihoe',
              lastname: null
            }

            const expectedResult = {tql: 'firstname == "Robihoe"'}

            const result = getFetchOptionsFromSearchForm(searchFormValues)
            expect(result).to.eql(expectedResult)
          })

          test('should map array of filter ', () => {
            const searchFormValues = {
              searchFilter: [{uniqueId: 'filter1'}, {uniqueId: 'filter2'}]
            }

            const expectedResult = {
              filters: ['filter1', 'filter2']
            }

            const result = getFetchOptionsFromSearchForm(searchFormValues)
            expect(result).to.eql(expectedResult)
          })

          test('should map single filter ', () => {
            const searchFormValues = {
              searchFilter: {uniqueId: 'filter1'}
            }

            const expectedResult = {
              filters: ['filter1']
            }

            const result = getFetchOptionsFromSearchForm(searchFormValues)
            expect(result).to.eql(expectedResult)
          })
        })
      })
    })
  })
})

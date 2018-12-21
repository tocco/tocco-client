import {getFetchOptionsFromSearchForm} from './fetchOptions'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('fetchOptions', () => {
        describe('getFetchOptionsFromSearchForm', () => {
          test('should set basic attributes in condition attribute maintain type', () => {
            const searchFormValues = {
              firstname: 'Robihoe',
              cool: true
            }

            const expectedResult = {
              conditions: {
                firstname: {
                  value: 'Robihoe'
                },
                cool: {
                  value: true
                }
              }
            }

            const result = getFetchOptionsFromSearchForm(searchFormValues)
            expect(result).to.eql(expectedResult)
          })

          test('should map txtFulltext to search', () => {
            const searchFormValues = {
              txtFulltext: 'asd',
              firstname: 'Test'
            }

            const expectedResult = {
              search: 'asd',
              conditions: {
                firstname: {
                  value: 'Test'
                }
              }
            }

            const result = getFetchOptionsFromSearchForm(searchFormValues)
            expect(result).to.eql(expectedResult)
          })

          test('should map array of filter ', () => {
            const searchFormValues = {
              searchFilter: [{uniqueId: 'filter1'}, {uniqueId: 'filter2'}],
              firstname: 'Test'
            }

            const expectedResult = {
              filters: ['filter1', 'filter2'],
              conditions: {
                firstname: {
                  value: 'Test'
                }
              }
            }

            const result = getFetchOptionsFromSearchForm(searchFormValues)
            expect(result).to.eql(expectedResult)
          })

          test('should map single filter ', () => {
            const searchFormValues = {
              searchFilter: {uniqueId: 'filter1'},
              firstname: 'Test'
            }

            const expectedResult = {
              filters: ['filter1'],
              conditions: {
                firstname: {
                  value: 'Test'
                }
              }
            }

            const result = getFetchOptionsFromSearchForm(searchFormValues)
            expect(result).to.eql(expectedResult)
          })

          test('should set relation types in condition object with pk', () => {
            const searchFormValues = {
              relGenderMulti: [{key: '1'}, {key: '2'}],
              relGenderSingle: {key: '1'}
            }

            const model = {
              relGenderMulti: {
                type: 'relation',
                multi: true
              },
              relGenderSingle: {
                type: 'relation',
                multi: false
              }
            }

            const expectedResult = {
              conditions: {
                'relGenderMulti.pk': [
                  {value: '1'},
                  {value: '2'}
                ],
                'relGenderSingle.pk':
                  {value: '1'}
              }
            }

            const result = getFetchOptionsFromSearchForm(searchFormValues, model)

            expect(result).to.deep.eql(expectedResult)
          })
        })
      })
    })
  })
})

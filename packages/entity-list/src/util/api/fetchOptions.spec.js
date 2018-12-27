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
              relGenderSingle: {key: '1'},
              relGenderMulti: [{key: '1'}, {key: '2'}],
              relUser: {key: '100'},
              relUsers: [{key: '99'}]
            }

            const formFields = {
              relGenderMulti: 'multi-select-box',
              relUsers: 'multi-remote-field',
              relGenderSingle: 'single-select-box',
              relUser: 'single-remote-field'
            }

            const expectedResult = {
              conditions: {
                'relGenderMulti.pk': [{value: '1'}, {value: '2'}],
                'relGenderSingle.pk': {value: '1'},
                'relUsers.pk': [{value: '99'}],
                'relUser.pk': {value: '100'}
              }
            }

            const result = getFetchOptionsFromSearchForm(searchFormValues, formFields)

            expect(result).to.deep.eql(expectedResult)
          })
        })
      })
    })
  })
})

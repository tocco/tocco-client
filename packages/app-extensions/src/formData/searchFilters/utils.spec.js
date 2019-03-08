import {searchFilterTransformer} from './utils'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('searchFilters', () => {
      describe('utils', () => {
        describe('searchFilterTransformer', () => {
          test('should extract the key with the specified path', () => {
            const json = {
              data: [
                {
                  display: 'Search Filter 1',
                  key: 123,
                  paths: {
                    unique_id: {
                      path: 'unique_id',
                      type: 'field',
                      value: {
                        value: 'filter1',
                        type: 'identifier'
                      }
                    }
                  }
                },
                {
                  display: 'Search Filter 2',
                  key: 124,
                  paths: {
                    unique_id: {
                      path: 'unique_id',
                      type: 'field',
                      value: {
                        value: 'filter2',
                        type: 'identifier'
                      }
                    }
                  }
                }
              ]
            }

            const expectedResult = [
              {key: 123, display: 'Search Filter 1', uniqueId: 'filter1'},
              {key: 124, display: 'Search Filter 2', uniqueId: 'filter2'}
            ]
            const transformedResult = searchFilterTransformer(json)
            expect(transformedResult).to.eql(expectedResult)
          })
        })
      })
    })
  })
})

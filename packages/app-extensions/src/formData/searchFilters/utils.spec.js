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
                  key: 123,
                  paths: {
                    unique_id: {
                      type: 'identifier',
                      writable: null,
                      value: 'filter1'
                    }
                  }
                },
                {
                  key: 124,
                  paths: {
                    unique_id: {
                      type: 'identifier',
                      writable: null,
                      value: 'filter2'
                    }
                  }
                }
              ]
            }

            const expectedResult = [
              {key: 123, uniqueId: 'filter1'},
              {key: 124, uniqueId: 'filter2'}
            ]
            const transformedResult = searchFilterTransformer(json)
            expect(transformedResult).to.eql(expectedResult)
          })
        })
      })
    })
  })
})

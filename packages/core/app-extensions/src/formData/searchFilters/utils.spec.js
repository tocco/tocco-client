import {searchFilterResponseTransformer} from './utils'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('searchFilters', () => {
      describe('utils', () => {
        describe('searchFilterTransformer', () => {
          test('should extract the key with the specified path', () => {
            const filtersResponse = {
              body: {
                filters: [
                  {key: '1', uniqueId: 'filter_1', label: 'Filter 1'},
                  {key: '3', uniqueId: 'filter_3', label: 'Filter 3 '}
                ]
              }
            }

            const expectedResult = [
              {key: '1', uniqueId: 'filter_1', display: 'Filter 1'},
              {key: '3', uniqueId: 'filter_3', display: 'Filter 3 '}
            ]

            const transformedResult = searchFilterResponseTransformer(filtersResponse)
            expect(transformedResult).to.eql(expectedResult)
          })
        })
      })
    })
  })
})

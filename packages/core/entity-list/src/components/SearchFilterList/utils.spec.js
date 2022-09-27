import {searchFilterCompare} from './utils'

describe('entity-list', () => {
  describe('components', () => {
    describe('SearchFilterList', () => {
      describe('utils', () => {
        describe('searchFilterCompare', () => {
          test('should sort searchfilter for default and sorting', () => {
            const searchFilters = [
              {uniqueId: '5', defaultFilter: false, sorting: 120},
              {uniqueId: '6', defaultFilter: false, sorting: null},
              {uniqueId: '2', defaultFilter: false, sorting: 10},
              {uniqueId: '4', defaultFilter: false, sorting: 100},
              {uniqueId: '3', defaultFilter: false, sorting: 20},
              {uniqueId: '1', defaultFilter: true, sorting: null},
              {uniqueId: '7', defaultFilter: false, sorting: null}
            ]

            searchFilters.sort(searchFilterCompare)

            expect(searchFilters.map(s => s.uniqueId)).to.deep.equal(['1', '2', '3', '4', '5', '6', '7'])
          })
        })
      })
    })
  })
})

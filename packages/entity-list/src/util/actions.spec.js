import * as actions from './actions'

describe('entity-list', () => {
  describe('util', () => {
    describe('actions', () => {
      test('should handle query selection ', () => {
        const state = {
          selection: {
            selectionMode: 'all',
            query: {search: 'test'},
            queryCount: 99
          }
        }

        const expectedSelection = {
          mode: 'QUERY',
          payload: {search: 'test'},
          count: 99
        }

        expect(actions.deriveSelectionFromState(state)).to.eql(expectedSelection)
      })

      test('should handle selection', () => {
        const state = {
          selection: {
            selectionMode: 'selection',
            selection: [1, 2, 4]
          }
        }

        const expectedSelection = {
          mode: 'ID',
          payload: [1, 2, 4],
          count: 3
        }

        expect(actions.deriveSelectionFromState(state)).to.eql(expectedSelection)
      })
    })
  })
})

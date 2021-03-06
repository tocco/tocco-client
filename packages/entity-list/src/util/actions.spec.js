import * as actions from './actions'

describe('entity-list', () => {
  describe('util', () => {
    describe('actions', () => {
      test('should handle query selection ', () => {
        const state = {
          input: {
            selectionStyle: 'multi'
          },
          entityList: {
            entityName: 'User'
          },
          selection: {
            query: {search: 'test'},
            queryCount: 99,
            selection: []
          }
        }

        const expectedSelection = {
          entityName: 'User',
          type: 'QUERY',
          query: {search: 'test'},
          count: 99
        }

        expect(actions.deriveSelectionFromState(state)).to.eql(expectedSelection)
      })

      test('should handle selection', () => {
        const state = {
          entityList: {
            entityName: 'User'
          },
          selection: {
            selection: [1, 2, 4]
          }
        }

        const expectedSelection = {
          entityName: 'User',
          type: 'ID',
          ids: [1, 2, 4],
          count: 3
        }

        expect(actions.deriveSelectionFromState(state)).to.eql(expectedSelection)
      })

      test('should return selection with multi_explicit', () => {
        const state = {
          input: {
            selectionStyle: 'multi_explicit'
          },
          entityList: {
            entityName: 'User'
          },
          selection: {
            selection: []
          }
        }

        const expectedSelection = {
          entityName: 'User',
          type: 'ID',
          ids: [],
          count: 0
        }

        expect(actions.deriveSelectionFromState(state)).to.eql(expectedSelection)
      })
    })
  })
})

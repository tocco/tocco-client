import reducer from './'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  positions: null,
  sorting: [],
  columns: {}
}

describe('entity-list', () => {
  describe('modules', () => {
    describe('preferences', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        test('should handle SET_SELECTION', () => {
          const stateBefore = {
            positions: null
          }
          const positions = {
            firstname: 0,
            lastname: 1
          }

          const expectedStateAfter = {
            positions
          }

          expect(reducer(stateBefore, actions.setPositions(positions))).to.deep.equal(expectedStateAfter)
        })

        test('should set sorting', () => {
          const newSorting = {
            field: 'field',
            order: 'order'
          }
          expect(reducer({sorting: [{field: 'old'}]}, actions.setSorting(newSorting)).sorting).to.equal(newSorting)
        })

        test('should clear sorting', () => {
          const previousSorting = {
            field: 'field',
            order: 'order'
          }
          expect(reducer({sorting: previousSorting}, actions.resetSorting()).sorting).to.be.empty
        })
      })
    })
  })
})

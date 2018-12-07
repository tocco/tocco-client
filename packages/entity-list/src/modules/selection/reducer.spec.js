import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  selectionMode: 'selection',
  selection: [],
  showSelectionController: false,
  tableSelectionStyle: 'none'
}

describe('entity-list', () => {
  describe('modules', () => {
    describe('selectable', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        test('should handle SET_SELECTION', () => {
          const stateBefore = {
            selection: [1, 2, 3, 4]
          }

          const expectedStateAfter = {
            selection: [1, 2, 8, 9]
          }

          const selection = [1, 2, 8, 9]

          expect(reducer(stateBefore, actions.setSelection(selection))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})

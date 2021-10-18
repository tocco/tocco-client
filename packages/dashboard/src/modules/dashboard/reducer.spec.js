import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  infoBoxes: []
}

describe('dashboard', () => {
  describe('modules', () => {
    describe('dashboard', () => {
      describe('reducer', () => {
        test(
          'should create valid initial state', () => {
            expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
          }
        )

        describe('SET_DASHBOARD', () => {
          test('should handle SET_DASHBOARD', () => {
            const infoBoxes = {infoBoxes: [{id: 'welcome'}]}
            const stateBefore = {
              otherProp: 'foo',
              infoBoxes: []
            }

            const expectedStateAfter = {
              otherProp: 'foo',
              infoBoxes
            }

            expect(reducer(stateBefore, actions.setDashboard(infoBoxes))).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})

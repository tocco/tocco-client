import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  infoboxes: []
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
            const infoboxes = {infoboxes: [{id: 'welcome'}]}
            const stateBefore = {
              otherProp: 'foo',
              infoboxes: []
            }

            const expectedStateAfter = {
              otherProp: 'foo',
              infoboxes
            }

            expect(reducer(stateBefore, actions.setDashboard(infoboxes))).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})

import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  requestedCode: ''
}

describe('login', () => {
  describe('modules', () => {
    describe('twoStepLogin', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        it('should handle SET_REQUESTED_CODE', () => {
          const stateBefore = {
            requestedCode: ''
          }

          const expectedStateAfter = {
            requestedCode: 'B8'
          }

          expect(reducer(stateBefore, actions.setRequestedCode('B8'))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})

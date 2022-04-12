import reducer from './reducer'
import * as actions from './actions'

const INITIAL_STATE = {
  initialised: false
}

describe('app-extensions', () => {
  describe('cache', () => {
    describe('reducer', () => {
      test('should create a valid initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
      })

      test('should set initialised', () => {
        const stateAfter = reducer(INITIAL_STATE, actions.setInitialised(true))
        expect(stateAfter).to.have.property('initialised')
        expect(stateAfter.initialised).to.be.true
      })
    })
  })
})

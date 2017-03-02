import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  entityName: '',
  formBase: '',
  entityModel: {},
  initialized: false
}

describe('entity-browser', () => {
  describe('modules', () => {
    describe('entityBrowser', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        it('should handle INITIALIZED', () => {
          let state = EXPECTED_INITIAL_STATE
          state = reducer(state, actions.initialized())
          expect(state.initialized).to.be.true
        })
      })
    })
  })
})

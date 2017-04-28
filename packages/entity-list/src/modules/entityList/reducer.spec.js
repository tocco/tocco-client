import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  entityModel: {},
  entityName: '',
  initialized: false,
  showSearchForm: false
}

describe('entity-list', () => {
  describe('modules', () => {
    describe('entityList', () => {
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

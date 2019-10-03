import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  entityModel: {},
  entityName: '',
  initialized: false,
  showSearchForm: false,
  searchFormPosition: 'top',
  parent: null
}

describe('entity-list', () => {
  describe('modules', () => {
    describe('entityList', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        test('should handle SET_INITIALIZED', () => {
          let state = EXPECTED_INITIAL_STATE
          state = reducer(state, actions.setInitialized())
          expect(state.initialized).to.be.true
        })
      })
    })
  })
})

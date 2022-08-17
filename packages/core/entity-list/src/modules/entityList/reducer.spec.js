import searchFormTypes from '../../util/searchFormTypes'
import * as actions from './actions'
import reducer from './index'

const INITIAL_STATE = {
  initialized: false,
  searchFormType: searchFormTypes.SIMPLE_ADVANCED,
  searchFormCollapsed: false
}

describe('entity-list', () => {
  describe('modules', () => {
    describe('entityList', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(INITIAL_STATE)
        })

        test('should handle SET_INITIALIZED', () => {
          let state = INITIAL_STATE
          state = reducer(state, actions.setInitialized())
          expect(state.initialized).to.be.true
        })

        test('should handle allow only valid searchFormTypes', () => {
          let state = INITIAL_STATE
          state = reducer(state, actions.setSearchFormType(searchFormTypes.ADMIN))
          expect(state.searchFormType).to.be.eql(searchFormTypes.ADMIN)
          state = reducer(state, actions.setSearchFormType(searchFormTypes.FULLTEXT))
          expect(state.searchFormType).to.be.eql(searchFormTypes.FULLTEXT)
          state = reducer(state, actions.setSearchFormType(searchFormTypes.NONE))
          expect(state.searchFormType).to.be.eql(searchFormTypes.NONE)
          state = reducer(state, actions.setSearchFormType('gugus'))
          expect(state.searchFormType).to.be.eql(searchFormTypes.SIMPLE_ADVANCED)
          state = reducer(state, actions.setSearchFormType(''))
          expect(state.searchFormType).to.be.eql(searchFormTypes.SIMPLE_ADVANCED)
        })
      })
    })
  })
})

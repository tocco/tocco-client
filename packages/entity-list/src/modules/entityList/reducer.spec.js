import reducer from './index'
import * as actions from './actions'
import searchFormTypes from '../../util/searchFormTypes'

const INITIAL_STATE = {
  entityModel: {},
  entityName: '',
  formName: '',
  initialized: false,
  searchFormType: searchFormTypes.BASIC,
  searchFormPosition: 'top',
  parent: null
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
          state = reducer(state, actions.setSearchFormType(searchFormTypes.SIMPLE))
          expect(state.searchFormType).to.be.eql(searchFormTypes.SIMPLE)
          state = reducer(state, actions.setSearchFormType(searchFormTypes.NONE))
          expect(state.searchFormType).to.be.eql(searchFormTypes.NONE)
          state = reducer(state, actions.setSearchFormType('gugus'))
          expect(state.searchFormType).to.be.eql(searchFormTypes.BASIC)
          state = reducer(state, actions.setSearchFormType(''))
          expect(state.searchFormType).to.be.eql(searchFormTypes.BASIC)
        })
      })
    })
  })
})

import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  entityName: '',
  formBase: '',
  showSearchForm: true,
  disableSimpleSearch: false,
  showDetailEntityId: undefined,
  entityModel: {},
  searchFilters: [],
  simpleSearchFields: ''
}

describe('entity-browser', () => {
  describe('modules', () => {
    describe('entityBrowser', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        it('should handle SET_SIMPLE_SEARCH_FIELDS', () => {
          let state = EXPECTED_INITIAL_STATE
          state = reducer(state, actions.setSimpleSearchFields('relRel1, field1,field2, relRel2'))
          const expectedSimpleSearchFields = ['relRel1', 'field1', 'field2', 'relRel2']

          expect(state.simpleSearchFields).to.deep.equal(expectedSimpleSearchFields)
        })
      })
    })
  })
})

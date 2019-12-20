import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  initialized: false,
  formDefinition: {},
  showExtendedSearchForm: false,
  simpleSearchFields: ['txtFulltext'],
  disableSimpleSearch: false,
  valuesInitialized: false,
  searchFilters: null
}

describe('entity-list', () => {
  describe('modules', () => {
    describe('searchForm', () => {
      describe('reducer', () => {
        test('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        test('should handle SET_FORM_DEFINITION', () => {
          const definition = [
            {name: 'name1', type: 'type1', label: 'label1', displayType: 'displayType1', useLabel: true}
          ]

          expect(reducer(EXPECTED_INITIAL_STATE, actions.setFormDefinition(definition)).formDefinition).to.deep.equal(
            definition
          )
        })

        test('should handle SET_SEARCH_FILTER_ACTIVE', () => {
          const uniqueId = 'activeUsers'
          const searchFilters = [
            {uniqueId, label: 'Active Users'},
            {uniqueId: 'inactiveUsers', label: 'Active Users'}
          ]

          let state = reducer(EXPECTED_INITIAL_STATE, actions.setSearchFilters(searchFilters))
          state = reducer(state, actions.setSearchFilterActive(uniqueId, true))
          expect(state.searchFilters.find(s => s.uniqueId === uniqueId).active).to.be.true
          state = reducer(state, actions.setSearchFilterActive(uniqueId, false))
          expect(state.searchFilters.find(s => s.uniqueId === uniqueId).active).to.be.false
        })
      })
    })
  })
})

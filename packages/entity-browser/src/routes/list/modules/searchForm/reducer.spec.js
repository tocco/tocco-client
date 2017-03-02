import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  formDefinition: [],
  relationEntities: {},
  searchInputs: {},
  showExtendedSearchForm: false,
  simpleSearchFields: ['txtFulltext'],
  preselectedSearchFields: []
}

describe('entity-browser', () => {
  describe('modules', () => {
    describe('searchForm', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        it('should handle SET_FORM_DEFINITION', () => {
          const definition = [
            {name: 'name1', type: 'type1', label: 'label1', displayType: 'displayType1', useLabel: true}
          ]

          expect(reducer(EXPECTED_INITIAL_STATE, actions.setFormDefinition(definition)).formDefinition).to.deep.equal(
            definition
          )
        })

        it('should handle SET_SEARCH_INPUT', () => {
          let state = EXPECTED_INITIAL_STATE

          state = reducer(state, actions.setSearchInput('firstname', 'Dan'))
          state = reducer(state, actions.setSearchInput('age', 18))

          expect(state.searchInputs).to.deep.equal({firstname: 'Dan', age: 18})
        })

        it('should handle SET_PRESELECTED_SEARCH_FIELDS', () => {
          const preselectedSearchFields = [
            {
              id: 'ID1',
              value: 'VALUE1',
              hidden: false
            }, {
              id: 'ID2',
              value: 'VALUE2',
              hidden: true
            }
          ]

          const stateNew = reducer(EXPECTED_INITIAL_STATE, actions.setPreselectedSearchFields(preselectedSearchFields))

          expect(stateNew.searchInputs).to.deep.equal({ID1: 'VALUE1', ID2: 'VALUE2'})
          expect(stateNew.preselectedSearchFields).to.deep.equal(preselectedSearchFields)
        })
      })
    })
  })
})

import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  formDefinition: [],
  entityModel: {},
  relationEntities: {},
  searchInputs: {}
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
      })
    })
  })
})

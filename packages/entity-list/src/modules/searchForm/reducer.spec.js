import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  initialized: false,
  searchFormName: '',
  formDefinition: {},
  showExtendedSearchForm: false,
  simpleSearchFields: ['txtFulltext'],
  disableSimpleSearch: false,
  valuesInitialized: false
}

describe('entity-list', () => {
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

        describe('setSearchFilter', () => {
          it('should set search filters', () => {
            const searchFilter = [
              {key: 'key1', display: 'display1'},
              {key: 'key2', display: 'display2'}
            ]

            const stateBefore = {}

            const expectedStateAfter = {
              searchFilter
            }

            expect(reducer(stateBefore, actions.setSearchFilter(searchFilter))).to.deep.equal(expectedStateAfter)
          })

          it('should update search filters', () => {
            const searchFilter = [
              {key: 'key1', display: 'display1'},
              {key: 'key2', display: 'display2'}
            ]

            const stateBefore = {
              searchFilter: [{key: 'someOther', display: 'Some Other'}]
            }

            const expectedStateAfter = {
              searchFilter
            }

            expect(reducer(stateBefore, actions.setSearchFilter(searchFilter))).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})

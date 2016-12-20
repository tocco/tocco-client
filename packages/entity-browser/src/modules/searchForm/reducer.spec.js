import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  entityName: '',
  formName: '',
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
          const stateBefore = {
            formDefinition: undefined
          }
          const definition = [
            {name: 'name1', type: 'type1', label: 'label1', displayType: 'displayType1', useLabel: true}
          ]

          const expectedStateAfter = {
            formDefinition: definition
          }

          expect(reducer(stateBefore, actions.setFormDefinition(definition))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})

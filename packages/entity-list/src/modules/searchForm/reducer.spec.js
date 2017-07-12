import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  searchFormName: '',
  formDefinition: {},
  showExtendedSearchForm: false,
  simpleSearchFields: ['txtFulltext'],
  preselectedSearchFields: [],
  disableSimpleSearch: false,
  relationEntities: {}
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
          expect(stateNew.preselectedSearchFields).to.deep.equal(preselectedSearchFields)
        })

        describe('setRelationEntity', () => {
          it('should add new entities', () => {
            const stateBefore = {
              relationEntities: {}
            }

            const entities = [
              {value: 1, label: 'User1'},
              {value: 2, label: 'User2'}
            ]

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  data: entities
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntity('User', entities))).to.deep.equal(expectedStateAfter)
          })

          it('should add entities to existing and do not override', () => {
            const stateBefore = {
              relationEntities: {
                User: {
                  data: [
                    {value: 1, label: 'User1'},
                    {value: 2, label: 'User2'}
                  ]
                }
              }
            }

            const entities = [
              {value: 2, label: 'User2 new'},
              {value: 3, label: 'User3'}
            ]

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  data: [
                    {value: 1, label: 'User1'},
                    {value: 2, label: 'User2'},
                    {value: 3, label: 'User3'}
                  ]
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntity('User', entities))).to.deep.equal(expectedStateAfter)
          })

          it('should add entities to existing and override with reset', () => {
            const stateBefore = {
              relationEntities: {
                User: {
                  data: [
                    {value: 1, label: 'User1'},
                    {value: 2, label: 'User2'}
                  ]
                }
              }
            }

            const entities = [
              {value: 2, label: 'User2 new'},
              {value: 3, label: 'User3'}
            ]

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  data: [
                    {value: 2, label: 'User2 new'},
                    {value: 3, label: 'User3'}
                  ]
                }
              }
            }

            expect(reducer(stateBefore, actions.setRelationEntity('User', entities, true)))
              .to.deep.equal(expectedStateAfter)
          })
        })

        describe('setRelationEntityLoaded', () => {
          it('should set loaded', () => {
            const stateBefore = {
              relationEntities: {
                User: {
                  loaded: false
                }
              }
            }

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  loaded: true
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntityLoaded('User'))).to.deep.equal(expectedStateAfter)
          })

          it('should handle empty entity', () => {
            const stateBefore = {
              relationEntities: {}
            }

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  loaded: true
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntityLoaded('User'))).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})

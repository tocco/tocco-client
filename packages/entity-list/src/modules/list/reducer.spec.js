import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  initialized: false,
  entityModel: {},
  entities: [],
  limit: 10,
  currentPage: 1,
  sorting: null,
  columnDefinition: [],
  entityCount: 0,
  entityStore: {},
  inProgress: false,
  searchFilters: [],
  showSearchForm: true,
  createPermission: false,
  selectable: false,
  selection: []
}

describe('entity-list', () => {
  describe('modules', () => {
    describe('list', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        it('should handle CLEAR_ENTITY_STORE', () => {
          const stateBefore = {
            entityStore: {
              entities: {
                1: [{}]
              }
            }
          }

          const expectedStateAfter = {
            entityStore: {}
          }

          expect(reducer(stateBefore, actions.clearEntityStore())).to.deep.equal(expectedStateAfter)
        })

        it('should handle ADD_ENTITIES_TO_STORE', () => {
          const existingEntities = {
            '1': [
              {field: 'value1'},
              {field: 'value2'}
            ]
          }
          const newEntities = [
            {field: 'value3'},
            {field: 'value4'}
          ]

          const mergedEntities = {
            '1': [
              {field: 'value1'},
              {field: 'value2'}
            ],
            '2': [
              {field: 'value3'},
              {field: 'value4'}
            ]
          }

          const stateBefore = {
            entityStore: existingEntities
          }

          const expectedStateAfter = {
            entityStore: mergedEntities
          }

          expect(reducer(stateBefore, actions.addEntitiesToStore(2, newEntities))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_ENTITIES', () => {
          const newEntities = [
            {
              lastname: 'Lastname1',
              firstname: 'Firstname1'
            },
            {
              lastname: 'Lastname2',
              firstname: 'Firstname2'
            }
          ]

          const stateBefore = {
            entities: [
              {
                lastname: 'LastnameBefore',
                firstname: 'FirstnameBefore'
              }
            ]
          }

          const expectedStateAfter = {
            entities: newEntities
          }

          expect(reducer(stateBefore, actions.setEntities(newEntities))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_COLUMN_DEFINITION', () => {
          const newDefinition = [
            {
              label: 'col1',
              value: [{0: 'col1'}]
            }, {
              label: 'col2',
              value: [{0: 'col2'}]
            }
          ]

          const stateBefore = {
            columnDefinition: []
          }

          const expectedStateAfter = {
            columnDefinition: newDefinition
          }

          expect(reducer(stateBefore, actions.setColumnDefinition(newDefinition))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_ENTITY_MODEL', () => {
          const newModel = {
            name: 'User'
          }

          const stateBefore = {
            entityModel: {}
          }

          const expectedStateAfter = {
            entityModel: newModel
          }

          expect(reducer(stateBefore, actions.setEntityModel(newModel))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_LIMIT', () => {
          const newLimit = 100

          const stateBefore = {
            limit: 10
          }

          const expectedStateAfter = {
            limit: newLimit
          }

          expect(reducer(stateBefore, actions.setLimit(newLimit))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_CURRENT_PAGE', () => {
          const newPage = 2

          const stateBefore = {
            currentPage: 1
          }

          const expectedStateAfter = {
            currentPage: newPage
          }

          expect(reducer(stateBefore, actions.setCurrentPage(newPage))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_SORTING', () => {
          const newSorting = [{field: 'firstname', order: 'asc'}]
          const stateBefore = {
            sorting: null
          }

          const expectedStateAfter = {
            sorting: [{field: 'firstname', order: 'asc'}]
          }

          expect(reducer(stateBefore, actions.setSorting(newSorting))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_ENTITY_COUNT', () => {
          const newEntityCount = 100

          const stateBefore = {
            entityCount: 50
          }

          const expectedStateAfter = {
            entityCount: newEntityCount
          }

          expect(reducer(stateBefore, actions.setEntityCount(newEntityCount))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_IN_PROGRESS', () => {
          const stateBefore = {
            inProgress: false
          }

          const expectedStateAfter = {
            inProgress: true
          }

          expect(reducer(stateBefore, actions.setInProgress(true))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_SELECTABLE', () => {
          const stateBefore = {
            selectable: false
          }

          const expectedStateAfter = {
            selectable: true
          }

          expect(reducer(stateBefore, actions.setSelectable(true))).to.deep.equal(expectedStateAfter)
        })

        it('should handle ON_SELECT_CHANGE for single row selection', () => {
          const stateBefore = {
            selection: []
          }

          const expectedStateAfter = {
            selection: [1]
          }

          const selection = {
            isSelected: true,
            keys: [1]
          }

          expect(reducer(stateBefore, actions.onSelectChange(selection))).to.deep.equal(expectedStateAfter)
        })

        it('should handle ON_SELECT_CHANGE for single row deselection', () => {
          const stateBefore = {
            selection: [1, 2, 3]
          }

          const expectedStateAfter = {
            selection: [1, 3]
          }

          const selection = {
            isSelected: false,
            keys: [2]
          }

          expect(reducer(stateBefore, actions.onSelectChange(selection))).to.deep.equal(expectedStateAfter)
        })

        it('should handle ON_SELECT_CHANGE for multiple row selection', () => {
          const stateBefore = {
            selection: []
          }

          const expectedStateAfter = {
            selection: [1, 2, 3, 4]
          }

          const selection = {
            isSelected: true,
            keys: [1, 2, 3, 4]
          }

          expect(reducer(stateBefore, actions.onSelectChange(selection))).to.deep.equal(expectedStateAfter)
        })

        it('should handle ON_SELECT_CHANGE for multiple row deselection', () => {
          const stateBefore = {
            selection: [1, 2, 3]
          }

          const expectedStateAfter = {
            selection: [1]
          }

          const selection = {
            isSelected: false,
            keys: [3, 2]
          }

          expect(reducer(stateBefore, actions.onSelectChange(selection))).to.deep.equal(expectedStateAfter)
        })

        it('should handle ON_SELECT_CHANGE for duplicate key entries', () => {
          const stateBefore = {
            selection: [2, 4]
          }

          const expectedStateAfter = {
            selection: [1, 2, 3, 4]
          }

          const selection = {
            isSelected: true,
            keys: [1, 2, 3, 4]
          }

          expect(reducer(stateBefore, actions.onSelectChange(selection))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_SELECTION', () => {
          const stateBefore = {
            selection: [1, 2, 3, 4]
          }

          const expectedStateAfter = {
            selection: [1, 2, 8, 9]
          }

          const selection = [1, 2, 8, 9]

          expect(reducer(stateBefore, actions.setSelection(selection))).to.deep.equal(expectedStateAfter)
        })
      })
    })
  })
})

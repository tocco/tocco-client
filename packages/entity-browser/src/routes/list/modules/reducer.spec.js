import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  entities: [],
  limit: 50,
  currentPage: 1,
  orderBy: null,
  columnDefinition: [],
  entityCount: 0,
  entityStore: {},
  inProgress: false,
  searchFilters: [],
  showSearchForm: true
}

describe('entity-browser', () => {
  describe('modules', () => {
    describe('listView', () => {
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

        it('should handle SET_ORDER_BY', () => {
          const newOrderBy = 'desc'

          const stateBefore = {
            orderBy: 'asc'
          }

          const expectedStateAfter = {
            orderBy: newOrderBy
          }

          expect(reducer(stateBefore, actions.setOrderBy(newOrderBy))).to.deep.equal(expectedStateAfter)
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
      })
    })
  })
})

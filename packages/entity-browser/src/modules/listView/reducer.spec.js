import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  entityName: '',
  formBase: '',
  records: [],
  limit: 50,
  currentPage: 1,
  orderBy: {},
  columnDefinition: [],
  recordCount: 0,
  recordStore: {},
  inProgress: false
}

describe('entity-browser', () => {
  describe('modules', () => {
    describe('listView', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        it('should handle CLEAR_RECORD_STORE', () => {
          const stateBefore = {
            recordStore: {
              records: {
                1: [{}]
              }
            }
          }

          const expectedStateAfter = {
            recordStore: {}
          }

          expect(reducer(stateBefore, actions.clearRecordStore())).to.deep.equal(expectedStateAfter)
        })

        it('should handle ADD_RECORDS_TO_STORE', () => {
          const existingRecords = {
            '1': [
              {field: 'value1'},
              {field: 'value2'}
            ]
          }
          const newRecords = [
            {field: 'value3'},
            {field: 'value4'}
          ]

          const mergedRecords = {
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
            recordStore: existingRecords
          }

          const expectedStateAfter = {
            recordStore: mergedRecords
          }

          expect(reducer(stateBefore, actions.addRecordsToStore(2, newRecords))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_ENTITY_NAME', () => {
          const stateBefore = {
            entityName: 'EntityBefore'
          }

          const expectedStateAfter = {
            entityName: 'EntityAfter'
          }

          expect(reducer(stateBefore, actions.setEntityName('EntityAfter'))).to.deep.equal(expectedStateAfter)
        })

        it('should handle SET_RECORDS', () => {
          const newRecords = [
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
            records: [
              {
                lastname: 'LastnameBefore',
                firstname: 'FirstnameBefore'
              }
            ]
          }

          const expectedStateAfter = {
            records: newRecords
          }

          expect(reducer(stateBefore, actions.setRecords(newRecords))).to.deep.equal(expectedStateAfter)
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

        it('should handle SET_RECORD_COUNT', () => {
          const newRecordCount = 100

          const stateBefore = {
            recordCount: 50
          }

          const expectedStateAfter = {
            recordCount: newRecordCount
          }

          expect(reducer(stateBefore, actions.setRecordCount(newRecordCount))).to.deep.equal(expectedStateAfter)
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

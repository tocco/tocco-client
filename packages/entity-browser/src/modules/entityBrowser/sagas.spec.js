import {takeLatest, takeEvery} from 'redux-saga'
import {put, select, call, fork, spawn} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

const generateState = (recordStore, page) => {
  let state = {}
  state.entityName = ''
  state.orderBy = ''
  state.limit = ''
  state.searchTerm = ''
  state.recordStore = recordStore || {}
  state.page = page
  return state
}

describe('entityBrowser', () => {
  describe('modules', () => {
    describe('sagas', () => {
      describe('rootSaga', () => {
        it('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal([
            fork(takeLatest, actions.INITIALIZE_TABLE, sagas.initializeEntityBrowser),
            fork(takeLatest, actions.CHANGE_PAGE, sagas.changePage),
            fork(takeEvery, actions.REQUEST_RECORDS, sagas.requestRecords),
            fork(takeEvery, actions.SET_ORDER_BY, sagas.resetDataSet),
            fork(takeEvery, actions.SET_SEARCH_TERM, sagas.resetDataSet),
            fork(takeEvery, actions.RESET_DATA_SET, sagas.resetDataSet)
          ])
          expect(generator.next().done).to.equal(true)
        })
      })

      describe('initializeEntityBrowser saga', () => {
        it('should initialize the entity browser', () => {
          const gen = sagas.initializeEntityBrowser()

          const entityName = 'User'
          const state = {...generateState(), entityName: entityName}

          const searchFormDefinition = [{
            name: entityName,
            type: 'type',
            displayType: 'displayType',
            label: 'label',
            useLabel: true
          }]

          const columnDefinition = [
            {label: 'Label', value: []}
          ]

          expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
          expect(gen.next(state).value).to.eql(call(sagas.getSearchFormDefinition, entityName))
          expect(gen.next(searchFormDefinition).value).to.eql(call(sagas.requestColumnDefinition, entityName))
          expect(gen.next(columnDefinition).value).to.eql(put(actions.setSearchFormDefinition(searchFormDefinition)))
          expect(gen.next().value).to.eql(put(actions.setColumnDefinition(columnDefinition)))
          expect(gen.next().value).to.eql(call(sagas.resetDataSet))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('changePage saga', () => {
        it('should set currentPage and requestRecords', () => {
          const page = 1
          const gen = sagas.changePage({payload: {page: page}})
          expect(gen.next().value).to.eql(put(actions.setCurrentPage(page)))
          expect(gen.next().value).to.eql(put(actions.requestRecords(page)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('fetchRecordsAndAddToStore saga', () => {
        it('should not add records to store', () => {
          const gen = sagas.fetchRecordsAndAddToStore(1)

          const state = generateState({ 1: true })

          expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
          expect(gen.next(state).done).to.deep.equal(true)
        })

        it('should add records to store', () => {
          const state = generateState({}, 1)
          const {entityName, page, orderBy, limit, searchTerm} = state

          const gen = sagas.fetchRecordsAndAddToStore(1)

          expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
          expect(gen.next(state).value).to.eql(call(sagas.fetchRecords, entityName, page, orderBy, limit, searchTerm))
          expect(gen.next().value).to.eql(put(actions.addRecordsToStore(page, undefined)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('requestRecords saga', () => {
        it('should request records', () => {
          const page = 1
          const gen = sagas.requestRecords({payload: {page: page}})

          const state = generateState({}, page)

          expect(gen.next().value).to.eql(put(actions.setRecordRequestInProgress(true)))
          expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
          expect(gen.next(state).value).to.eql(call(sagas.fetchRecordsAndAddToStore, page))
          expect(gen.next().value).to.eql(call(sagas.displayRecord, page))
          expect(gen.next().value).to.eql(put(actions.setRecordRequestInProgress(false)))
          expect(gen.next().value).to.eql(spawn(sagas.fetchRecordsAndAddToStore, page + 1))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('displayRecord saga', () => {
        it('should display record', () => {
          const page = 1
          const gen = sagas.displayRecord(page)
          const records = [{}]
          const state = generateState({1: records})
          expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
          expect(gen.next(state).value).to.eql(put(actions.setRecords(records)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('resetDataSet saga', () => {
        it('should clear the record store', () => {
          const gen = sagas.resetDataSet()

          const entityName = 'User'
          const state = {...generateState(), entityName: entityName}
          const recordCount = 100

          expect(gen.next().value).to.eql(put(actions.setRecords([])))
          expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
          expect(gen.next(state).value).to.eql(call(sagas.fetchRecordCount, entityName))
          expect(gen.next(recordCount).value).to.eql(put(actions.setRecordCount(recordCount)))
          expect(gen.next().value).to.eql(put(actions.clearRecordStore()))
          expect(gen.next().value).to.eql(call(sagas.changePage, {payload: {page: 1}}))
        })
      })
    })
  })
})

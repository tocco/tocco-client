import {takeLatest, takeEvery} from 'redux-saga'
import {put, select, call, fork, spawn} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import fetchMock from 'fetch-mock'
import * as api from '../../util/api'

const generateState = (recordStore = {}, page) => ({
  entityName: '',
  orderBy: '',
  limit: '',
  searchTerm: '',
  recordStore,
  page
})

describe('entity-browser', () => {
  describe('modules', () => {
    describe('entityBrowser', () => {
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
            expect(generator.next().done).to.be.true
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
            expect(gen.next().done).to.be.true
          })
        })

        describe('changePage saga', () => {
          it('should set currentPage and requestRecords', () => {
            const page = 1
            const gen = sagas.changePage({payload: {page: page}})
            expect(gen.next().value).to.eql(put(actions.setCurrentPage(page)))
            expect(gen.next().value).to.eql(put(actions.requestRecords(page)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('fetchRecordsAndAddToStore saga', () => {
          it('should not add records to store', () => {
            const gen = sagas.fetchRecordsAndAddToStore(1)

            const state = generateState({1: true})

            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(state).done).to.be.true
          })

          it('should add records to store', () => {
            const state = generateState({}, 1)
            const {entityName, page, orderBy, limit, searchTerm} = state

            const gen = sagas.fetchRecordsAndAddToStore(1)

            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(state).value).to.eql(call(api.fetchRecords, entityName, page, orderBy, limit, searchTerm))
            expect(gen.next().value).to.eql(put(actions.addRecordsToStore(page, undefined)))
            expect(gen.next().done).to.be.true
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
            expect(gen.next().done).to.be.true
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
            expect(gen.next().done).to.be.true
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
            expect(gen.next(state).value).to.eql(call(api.fetchRecordCount, entityName))
            expect(gen.next(recordCount).value).to.eql(put(actions.setRecordCount(recordCount)))
            expect(gen.next().value).to.eql(put(actions.clearRecordStore()))
            expect(gen.next().value).to.eql(call(sagas.changePage, {payload: {page: 1}}))
          })
        })

        describe('getSearchFormDefinition saga', () => {
          it('should create a search from definition', () => {
            const entityName = 'User'
            const jsonArr = [
              {
                name: 'name1',
                type: 'type',
                displayType: 'displayType',
                label: 'label1',
                useLabel: true,
                otherFieldA: 'some_input'
              }, {
                name: 'name2',
                type: 'type',
                displayType: 'displayType',
                label: 'label2',
                useLabel: true,
                otherFieldB: 'some_input'
              }
            ]

            const result = [
              {
                name: 'name1',
                type: 'type',
                displayType: 'displayType',
                label: 'label1',
                useLabel: true
              }, {
                name: 'name2',
                type: 'type',
                displayType: 'displayType',
                label: 'label2',
                useLabel: true
              }
            ]

            const gen = sagas.getSearchFormDefinition(entityName)
            expect(gen.next().value).to.eql(call(api.fetchSearchForm, entityName + '_search'))
            expect(gen.next(jsonArr).value).to.eql(result)
            expect(gen.next().done).to.be.true
          })
        })

        describe('requestColumnDefinition saga', () => {
          it('should create the column definition', () => {
            const entityName = 'User'
            const gen = sagas.requestColumnDefinition(entityName)

            const tableData = {
              children: [
                {
                  displayType: 'EDITABLE',
                  label: 'label1',
                  children: [{name: 'name1', type: 'type', displayType: 'EDITABLE', label: 'label'}]
                }, {
                  displayType: 'HIDDEN',
                  label: 'label2',
                  children: [{name: 'name2', type: 'type', displayType: 'HIDDEN', label: 'label'}]
                }, {
                  displayType: 'EDITABLE',
                  label: 'label3',
                  children: [{name: 'custom:name3', type: 'type', displayType: 'EDITABLE', label: 'label'}]
                }, {
                  displayType: 'EDITABLE',
                  label: 'label4',
                  children: [{
                    name: 'name4',
                    type: 'ch.tocco.nice2.model.form.components.action.Action',
                    displayType: 'EDITABLE',
                    label: 'label'
                  }]
                }, {
                  displayType: 'EDITABLE',
                  label: 'label5',
                  children: [{name: 'name5', type: 'type', displayType: 'EDITABLE', label: 'label'}]
                }
              ]
            }

            const result = [
              {label: 'label1', value: ['name1']},
              {label: 'label3', value: []},
              {label: 'label4', value: []},
              {label: 'label5', value: ['name5']}
            ]

            expect(gen.next().value).to.eql(call(api.fetchForm, entityName + '_list', 'table'))
            expect(gen.next(tableData).value).to.eql(result)
            expect(gen.next().done).to.be.true
          })
        })

        describe('fetchSearchForm saga', () => {
          it('should fetch the search form', done => {
            const formName = 'User_search'

            const expectedResult = [
              {
                name: 'txtFulltext',
                type: 'ch.tocco.nice2.model.form.components.simple.TextField',
                displayType: 'EDITABLE',
                children: [],
                label: 'Person',
                useLabel: 'YES'
              },
              {
                name: 'relAddress_user.relAddress',
                type: 'ch.tocco.nice2.model.form.components.simple.TextField',
                displayType: 'HIDDEN',
                children: [],
                label: 'Adresse',
                useLabel: 'HIDDEN'
              }]

            fetchMock.get('*', require('./../../dev/test_user_search.json'))

            api.fetchSearchForm(formName).then(result => {
              expect(result).to.be.eql(expectedResult)
              fetchMock.restore()
              done()
            })
          })
        })
      })
    })
  })
})

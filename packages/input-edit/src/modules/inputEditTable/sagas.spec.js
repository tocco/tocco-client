import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {select, takeEvery, takeLatest, all} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('input-edit', () => {
  describe('input-edit-table', () => {
    describe('sagas', () => {
      test('should fork child sagas', () => {
        const generator = rootSaga()
        expect(generator.next().value).to.deep.equal(all([
          takeLatest(actions.INITIALIZE_TABLE, sagas.initialize),
          takeLatest(actions.LOAD_DATA, sagas.loadData),
          takeEvery(actions.UPDATE_VALUE, sagas.updateValue),
          takeLatest(actions.SET_SORTING, sagas.sortData)
        ]))
        expect(generator.next().done).to.be.true
      })

      describe('initialize', () => {
        test('should load forms', () => {
          const expectedEditForm = [{
            editform: 'editform'
          }]
          const expectedDataForm = {
            dataform: 'dataform'
          }
          return expectSaga(sagas.initialize)
            .provide([
              [select(sagas.inputSelector), {inputEntityKey: 12}],
              [matchers.call.fn(rest.requestSaga), {
                body: expectedEditForm
              }],
              [matchers.call.fn(rest.fetchForm), expectedDataForm],
              [matchers.call.fn(sagas.loadData), {}]
            ])
            .put(actions.setEditForm({inputEditForm: expectedEditForm}))
            .put(actions.setDataForm({inputDataForm: expectedDataForm}))
            .call(sagas.loadData, {})
            .run()
        })
      })

      describe('load-data', () => {
        test('should load data', () => {
          const expectedData = {
            count: 50,
            data: [
              {
                pk: 123
              }
            ]
          }
          const expectedSorting = {
            field: 'field',
            direction: 'asc'
          }
          const expectedSearchQueries = [
            'firstname == \'something\''
          ]
          const expectedPagination = {
            offset: 25,
            recordsPerPage: 25
          }
          return expectSaga(sagas.loadData, {
            newSorting: expectedSorting,
            newSearchQueries: expectedSearchQueries,
            newPage: 2
          })
            .provide([
              [select(sagas.inputSelector), {inputEntityKey: 12}],
              [select(sagas.inputEditTableSelector), {sorting: {field: 'state sorting'}}],
              [select(sagas.searchQueriesSelector), []],
              [select(sagas.inputEditPaginationSelector), {
                count: 0,
                currentPage: 1,
                recordsPerPage: 25
              }],
              [matchers.call.fn(rest.requestSaga), {
                body: expectedData
              }]
            ])
            .call.like({
              fn: rest.requestSaga,
              args: [
                'inputEdit/12/data/search',
                {
                  method: 'POST',
                  body: {
                    sorting: expectedSorting,
                    searchQueries: expectedSearchQueries,
                    pagination: expectedPagination
                  }
                }
              ]
            })
            .put(actions.setData(expectedData))
            .run()
        })
        test('should load data from state if no arguments are passed', () => {
          const expectedSorting = {
            field: 'field',
            direction: 'asc'
          }
          const expectedSearchQueries = [
            'firstname == \'whatever\''
          ]
          const expectedPagination = {
            offset: 0,
            recordsPerPage: 25
          }
          return expectSaga(sagas.loadData, {})
            .provide([
              [select(sagas.inputSelector), {inputEntityKey: 12}],
              [select(sagas.inputEditTableSelector), {sorting: expectedSorting}],
              [select(sagas.searchQueriesSelector), expectedSearchQueries],
              [select(sagas.inputEditPaginationSelector), {
                count: 0,
                currentPage: 1,
                recordsPerPage: 25
              }],
              [matchers.call.fn(rest.requestSaga), {body: {}}]
            ])
            .call.like({
              fn: rest.requestSaga,
              args: [
                'inputEdit/12/data/search',
                {
                  method: 'POST',
                  body: {
                    sorting: expectedSorting,
                    searchQueries: expectedSearchQueries,
                    pagination: expectedPagination
                  }
                }
              ]
            })
            .run()
        })
      })

      describe('sort-data', () => {
        test('should pass sorting to loadData', () => {
          return expectSaga(sagas.sortData, actions.setSorting('field', 'desc'))
            .provide([
              [matchers.call.fn(sagas.loadData)]
            ])
            .call(sagas.loadData, {
              newSorting: {
                field: 'field',
                direction: 'desc'
              }
            })
            .run()
        })
      })

      describe('update-value', () => {
        test('should update value', () => {
          return expectSaga(sagas.updateValue, actions.updateValue(123, 'node', 'value'))
            .provide([
              [select(sagas.inputSelector), {inputEntityKey: 12}],
              [matchers.call.fn(rest.requestSaga), {
                body: {
                }
              }]
            ])
            .put(actions.setValue(123, 'node', 'value'))
            .call(rest.requestSaga, 'inputEdit/12/data', {
              method: 'POST',
              body: {
                inputDataKey: 123,
                node: 'node',
                value: 'value'
              }
            })
            .run()
        })
        test('should set newly calculated values', () => {
          return expectSaga(sagas.updateValue, actions.updateValue(123, 'node', 'value'))
            .provide([
              [select(sagas.inputSelector), {inputEntityKey: 12}],
              [matchers.call.fn(rest.requestSaga), {
                body: {
                  calculatedValues: [
                    {
                      inputDataKey: 122,
                      node: 'somenode',
                      value: 123
                    },
                    {
                      inputDataKey: 124,
                      node: 'another',
                      value: 'whatever'
                    }
                  ]
                }
              }]
            ])
            .put(actions.setValue(122, 'somenode', 123))
            .put(actions.setValue(124, 'another', 'whatever'))
            .run()
        })
      })
    })
  })
})

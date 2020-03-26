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
          return expectSaga(sagas.initialize, actions.initializeTable())
            .provide([
              [select(sagas.inputSelector), {inputEntityKey: 12}],
              [matchers.call.fn(rest.requestSaga), {
                body: expectedEditForm
              }],
              [matchers.call.fn(rest.fetchForm), expectedDataForm],
              [matchers.call.fn(sagas.loadData)]
            ])
            .put(actions.setEditForm({inputEditForm: expectedEditForm}))
            .put(actions.setDataForm({inputDataForm: expectedDataForm}))
            .call(sagas.loadData)
            .run()
        })
      })

      describe('load-data', () => {
        test('should load data', () => {
          const expectedData = {
            1: {
              pk: 123
            }
          }
          const expectedSorting = {
            field: 'field',
            direction: 'asc'
          }
          return expectSaga(sagas.loadData, expectedSorting)
            .provide([
              [select(sagas.inputSelector), {inputEntityKey: 12}],
              [select(sagas.inputEditTableSelector), {sorting: {field: 'state sorting'}}],
              [matchers.call.fn(rest.requestSaga), {
                body: expectedData
              }]
            ])
            .call(rest.requestSaga, 'inputEdit/12/data/search', {
              method: 'POST',
              body: {
                sorting: expectedSorting
              }
            })
            .put(actions.setData({data: expectedData}))
            .run()
        })
        test('should use sorting from state if none is passed', () => {
          const expectedSorting = {
            field: 'field',
            direction: 'asc'
          }
          return expectSaga(sagas.loadData)
            .provide([
              [select(sagas.inputSelector), {inputEntityKey: 12}],
              [select(sagas.inputEditTableSelector), {sorting: expectedSorting}],
              [matchers.call.fn(rest.requestSaga), {body: {}}]
            ])
            .call(rest.requestSaga, 'inputEdit/12/data/search', {
              method: 'POST',
              body: {
                sorting: expectedSorting
              }
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
              field: 'field',
              direction: 'desc'
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

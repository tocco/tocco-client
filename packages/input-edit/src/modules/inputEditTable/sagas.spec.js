import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, select, takeEvery, takeLatest} from 'redux-saga/effects'
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
              [select(sagas.inputEditSelector), {selection: [12], validation: {valid: true}}],
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
        const fakeDataForm = {
          children: [
            {
              componentType: 'table',
              children: [
                {
                  children: [
                    {
                      path: 'first field'
                    }
                  ]
                },
                {
                  children: [
                    {
                      path: 'second field'
                    }
                  ]
                }
              ]
            }
          ]
        }

        test('should load data', () => {
          const expectedData = {
            count: 50,
            data: [
              {
                pk: 123
              }
            ]
          }
          const fakeSelection = {ids: ['12']}
          return expectSaga(sagas.loadData, {
            newSorting: {
              field: 'field',
              direction: 'asc'
            },
            newSearchQueries: [
              'firstname == \'something\'',
              'lastname == \'something else\''
            ],
            newPage: 2
          })
            .provide([
              [select(sagas.inputEditTableSelector), {
                inputDataForm: fakeDataForm,
                sorting: {field: 'state sorting'}
              }],
              [select(sagas.inputEditSelector), {selection: fakeSelection, validation: {valid: true}}],
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
                'inputEdit/data/search',
                {
                  method: 'POST',
                  body: {
                    selection: fakeSelection,
                    searchBean: {
                      paths: ['first field', 'second field', 'pk'],
                      sort: 'field asc',
                      where: 'firstname == \'something\' and lastname == \'something else\'',
                      limit: 25,
                      offset: 25
                    }
                  }
                }
              ]
            })
            .put(actions.setData(expectedData))
            .run()
        })
        test('should load data from state if no arguments are passed', () => {
          const fakeSelection = {ids: ['12']}
          return expectSaga(sagas.loadData, {})
            .provide([
              [select(sagas.inputEditSelector), {selection: fakeSelection, validation: {valid: true}}],
              [select(sagas.inputEditTableSelector), {
                inputDataForm: fakeDataForm,
                sorting: {
                  field: 'field',
                  direction: 'asc'
                }
              }],
              [select(sagas.searchQueriesSelector), [
                'firstname == \'whatever\''
              ]],
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
                'inputEdit/data/search',
                {
                  method: 'POST',
                  body: {
                    selection: fakeSelection,
                    searchBean: {
                      paths: ['first field', 'second field', 'pk'],
                      sort: 'field asc',
                      where: 'firstname == \'whatever\'',
                      limit: 25,
                      offset: 0
                    }
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
              [select(sagas.inputEditSelector), {selection: [], validation: {valid: true}}],
              [matchers.call.fn(rest.requestSaga), {
                body: {
                }
              }]
            ])
            .put(actions.setValue(123, 'node', 'value'))
            .call(rest.requestSaga, 'inputEdit/data', {
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
              [select(sagas.inputEditSelector), {selection: [], validation: {valid: true}}],
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

import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {notification, rest} from 'tocco-app-extensions'

import * as inputEditActions from '../inputEdit/actions'
import * as searchActions from '../inputEditSearch/actions'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {transformResponseData} from './utils'

describe('input-edit', () => {
  describe('input-edit-table', () => {
    describe('sagas', () => {
      const fakeDataColumns = [
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

      const fakeDataForm = {
        children: [
          {
            id: 'main-action-bar',
            label: null,
            componentType: 'action-bar',
            children: [
              {
                id: 'output',
                label: 'Ausgabe'
              },
              {
                id: 'nice2.reporting.actions.ChangelogExportAction',
                label: 'Changelog exportieren'
              }
            ],
            actions: [],
            defaultAction: null
          },
          {
            componentType: 'table',
            children: fakeDataColumns
          }
        ]
      }

      test('should fork child sagas', () => {
        const generator = rootSaga()
        expect(generator.next().value).to.deep.equal(
          all([
            takeLatest(actions.INITIALIZE_TABLE, sagas.initialize),
            takeLatest(actions.LOAD_DATA, sagas.loadData),
            takeEvery(actions.UPDATE_VALUE, sagas.updateValue),
            takeLatest(actions.SET_SORTING, sagas.loadData)
          ])
        )
        expect(generator.next().done).to.be.true
      })

      describe('initialize', () => {
        test('should load forms', () => {
          const expectedEditForm = [
            {
              editform: 'editform'
            }
          ]
          const expectedDataForm = {
            dataform: 'dataform'
          }
          const readonlyActions = ['action']
          return expectSaga(sagas.initialize)
            .provide([
              [select(sagas.inputSelector), {selection: [12]}],
              [select(sagas.inputEditSearchSelector), {initialized: true}],
              [select(sagas.inputEditSelector), {validation: {valid: true}}],
              [
                matchers.call.fn(rest.requestSaga),
                {
                  body: {
                    editColumns: expectedEditForm,
                    readonly: false,
                    readonlyActions
                  }
                }
              ],
              [matchers.call.fn(rest.fetchForm), expectedDataForm],
              [matchers.call.fn(sagas.loadData), {}],
              [matchers.call.fn(sagas.processDataForm)]
            ])
            .call(rest.fetchForm, 'Input_edit_data', 'list')
            .put(actions.setEditForm({inputEditForm: expectedEditForm}))
            .call(sagas.processDataForm, expectedDataForm, false, readonlyActions)
            .call(sagas.loadData, {})
            .run()
        })

        test('should handle readonly', () => {
          const expectedEditForm = [
            {
              editform: 'editform'
            }
          ]
          const expectedDataForm = {
            dataform: 'dataform'
          }
          const readonlyActions = ['action']

          const sagaRunner = expectSaga(sagas.initialize)
            .provide([
              [select(sagas.inputSelector), {selection: [12]}],
              [select(sagas.inputEditSearchSelector), {initialized: true}],
              [select(sagas.inputEditSelector), {validation: {valid: true}}],
              [
                matchers.call.fn(rest.requestSaga),
                {
                  body: {
                    editColumns: expectedEditForm,
                    readonly: true,
                    readonlyActions
                  }
                }
              ],
              [matchers.call.fn(rest.fetchForm), expectedDataForm],
              [matchers.call.fn(sagas.loadData), {}],
              [matchers.call.fn(sagas.processDataForm)]
            ])
            .call(rest.fetchForm, 'Input_edit_data', 'list')
            .put(actions.setEditForm({inputEditForm: expectedEditForm}))
            .put(
              notification.toaster({
                type: 'info',
                title: 'client.actions.InputEdit.input_closed'
              })
            )
            .call(sagas.processDataForm, expectedDataForm, true, readonlyActions)
            .call(sagas.loadData, {})
            .run()

          expect(expectedEditForm[0].readonly).to.be.true

          return sagaRunner
        })

        test('should load data form from input', () => {
          const expectedEditForm = [
            {
              editform: 'editform'
            }
          ]
          const expectedDataForm = {
            dataform: 'dataform'
          }
          return expectSaga(sagas.initialize)
            .provide([
              [
                select(sagas.inputSelector),
                {
                  selection: [12],
                  actionProperties: {
                    inputEditDataForm: 'PublicInput_edit_data'
                  }
                }
              ],
              [select(sagas.inputEditSearchSelector), {initialized: false}],
              [select(sagas.inputEditSelector), {validation: {valid: true}, updateInProgress: false}],
              [
                matchers.call.fn(rest.requestSaga),
                {
                  body: {
                    editColumns: expectedEditForm,
                    readonly: false,
                    readonlyActions: []
                  }
                }
              ],
              [matchers.call.fn(sagas.processDataForm), {}],
              [matchers.call.fn(rest.fetchForm), expectedDataForm],
              [matchers.call.fn(sagas.loadData), {}]
            ])
            .dispatch(searchActions.initializeSearch(true))
            .call(rest.fetchForm, 'PublicInput_edit_data', 'list')
            .run()
        })

        test('should load data after selection update is done', () => {
          const expectedEditForm = [
            {
              editform: 'editform'
            }
          ]
          const expectedDataForm = {
            dataform: 'dataform'
          }
          return expectSaga(sagas.initialize)
            .provide([
              [
                select(sagas.inputSelector),
                {
                  selection: [12],
                  actionProperties: {
                    inputEditDataForm: 'PublicInput_edit_data'
                  }
                }
              ],
              [select(sagas.inputEditSearchSelector), {initialized: true}],
              [select(sagas.inputEditSelector), {validation: {valid: true}, updateInProgress: true}],
              [
                matchers.call.fn(rest.requestSaga),
                {
                  body: {
                    editColumns: expectedEditForm,
                    readonly: false,
                    readonlyActions: []
                  }
                }
              ],
              [matchers.call.fn(sagas.processDataForm), {}],
              [matchers.call.fn(rest.fetchForm), expectedDataForm],
              [matchers.call.fn(sagas.loadData), {}]
            ])
            .dispatch(inputEditActions.setSelectionUpdateInProgress(false))
            .call.like(sagas.loadData)
            .run()
        })
      })

      describe('load-data', () => {
        test('should load data', () => {
          const fakeSelection = {ids: ['12']}

          const fakeData = []

          return expectSaga(sagas.loadData, {
            newSearchQueries: ["firstname == 'something'", "lastname == 'something else'"],
            newPage: 2
          })
            .provide([
              [select(sagas.inputSelector), {selection: fakeSelection}],
              [
                select(sagas.inputEditTableSelector),
                {
                  dataFormColumns: fakeDataColumns,
                  sorting: [{field: 'field', order: 'asc'}]
                }
              ],
              [select(sagas.inputEditSelector), {validation: {valid: true}}],
              [select(sagas.searchQueriesSelector), []],
              [
                select(sagas.inputEditPaginationSelector),
                {
                  count: 0,
                  currentPage: 1,
                  recordsPerPage: 25
                }
              ],
              [
                matchers.call.fn(rest.requestSaga),
                {
                  body: {}
                }
              ],
              [matchers.call.fn(transformResponseData), fakeData]
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
                      where: "firstname == 'something' and lastname == 'something else'",
                      limit: 25,
                      offset: 25
                    }
                  }
                }
              ]
            })
            .put(actions.setData(fakeData))
            .run()
        })
        test('should load data from state if no arguments are passed', () => {
          const fakeSelection = {ids: ['12']}
          return expectSaga(sagas.loadData, {})
            .provide([
              [select(sagas.inputSelector), {selection: fakeSelection}],
              [select(sagas.inputEditSelector), {validation: {valid: true}}],
              [
                select(sagas.inputEditTableSelector),
                {
                  dataFormColumns: fakeDataColumns,
                  sorting: [{field: 'field', order: 'asc'}]
                }
              ],
              [select(sagas.searchQueriesSelector), ["firstname == 'whatever'"]],
              [
                select(sagas.inputEditPaginationSelector),
                {
                  count: 0,
                  currentPage: 1,
                  recordsPerPage: 25
                }
              ],
              [matchers.call.fn(rest.requestSaga), {body: {data: []}}]
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
                      where: "firstname == 'whatever'",
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

      describe('processDataForm', () => {
        test('should set action and column defintions', () => {
          return expectSaga(sagas.processDataForm, fakeDataForm)
            .put.actionType(actions.SET_ACTION_DEFINITIONS)
            .put.actionType(actions.SET_DATA_FORM_COLUMNS)
            .run()
        })
      })

      describe('update-value', () => {
        test('should update value', () => {
          return expectSaga(sagas.updateValue, actions.updateValue(123, 'node', 'value'))
            .provide([
              [select(sagas.inputSelector), {selection: []}],
              [select(sagas.inputEditSelector), {validation: {valid: true}}],
              [
                matchers.call.fn(rest.requestSaga),
                {
                  body: {}
                }
              ]
            ])
            .put(actions.setValue(123, 'node', 'value'))
            .put(actions.setCalculating(123, true))
            .put(actions.setCalculating(123, false))
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
              [select(sagas.inputSelector), {selection: []}],
              [select(sagas.inputEditSelector), {validation: {valid: true}}],
              [
                matchers.call.fn(rest.requestSaga),
                {
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
                }
              ]
            ])
            .put(actions.setValue(122, 'somenode', 123))
            .put(actions.setValue(124, 'another', 'whatever'))
            .run()
        })
      })
    })
  })
})

import {takeLatest, all, select} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {channel} from 'redux-saga'

import {entityListSelector, listSelector} from '../list/sagas'
import * as listSagas from '../list/sagas'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import * as listActions from '../list/actions'

describe('entity-list', () => {
  describe('modules', () => {
    describe('preferences', () => {
      describe('rootSaga', () => {
        test('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal(all([
            takeLatest(actions.LOAD_PREFERENCES, sagas.loadPreferences),
            takeLatest(actions.CHANGE_POSITION, sagas.changePosition),
            takeLatest(listActions.SET_SORTING_INTERACTIVE, sagas.saveSorting),
            takeLatest(actions.RESET_SORTING, sagas.resetSorting),
            takeLatest(actions.RESET_PREFERENCES, sagas.resetPreferences),
            takeLatest(actions.DISPLAY_COLUMN_MODAL, sagas.displayColumnModal)
          ]))
          expect(generator.next().done).to.be.true
        })
        describe('loadPreferences', () => {
          test('should fetch user preferences and dispatch', () => {
            const preferences = {
              'User_list.firstname.position': '5',
              'Principal_list.sortingField': 'first_field',
              'Principal_list.sortingDirection': 'asc',
              'Principal_list.sortingField.1': 'second_field',
              'Principal_list.sortingDirection.1': 'desc'
            }

            const expectedSorting = [
              {
                field: 'first_field',
                order: 'asc'
              },
              {
                field: 'second_field',
                order: 'desc'
              }
            ]

            return expectSaga(sagas.loadPreferences)
              .provide([
                [select(entityListSelector), {formName: 'User'}],
                [matchers.call.fn(rest.fetchUserPreferences), preferences]
              ])
              .put.actionType(actions.SET_POSITIONS)
              .put(actions.setSorting(expectedSorting))
              .run()
          })
        })

        describe('changePosition ', () => {
          test('should put new position, delete preferences and save new one ', () => {
            return expectSaga(sagas.changePosition, {payload: {field: 'firstname', afterFieldPosition: 'mail'}})
              .provide([
                [select(entityListSelector), {formName: 'User'}],
                [select(sagas.preferencesSelector), {positions: {firstname: 1, mail: 2}}],
                [matchers.call.fn(rest.deleteUserPreferences)],
                [matchers.call.fn(rest.savePreferences)]
              ])
              .put.actionType(actions.SET_POSITIONS)
              .call.like({fn: rest.savePreferences})
              .call.like({fn: rest.deleteUserPreferences})
              .run()
          })
        })

        describe('saveSorting ', () => {
          test('should save sorting from list as preference', () => {
            const providedSorting = [
              {
                field: 'first_field',
                order: 'asc'
              },
              {
                field: 'second_field',
                order: 'desc'
              }
            ]
            const expectedPreferences = {
              'User_list.sortingField': 'first_field',
              'User_list.sortingDirection': 'asc',
              'User_list.sortingField.1': 'second_field',
              'User_list.sortingDirection.1': 'desc'
            }
            return expectSaga(sagas.saveSorting)
              .provide([
                [select(entityListSelector), {formName: 'User'}],
                [select(listSelector), {sorting: providedSorting}],
                [matchers.call.fn(rest.deleteUserPreferences)],
                [matchers.call.fn(rest.savePreferences)]
              ])
              .call(rest.deleteUserPreferences, 'User_list.sortingField*')
              .call(rest.deleteUserPreferences, 'User_list.sortingDirection*')
              .call(rest.savePreferences, expectedPreferences)
              .run()
          })
          test('should not save sorting if none exists', () => {
            return expectSaga(sagas.saveSorting)
              .provide([
                [select(entityListSelector), {formName: 'User'}],
                [select(listSelector), {sorting: []}]
              ])
              .not.call.like({fn: rest.savePreferences})
              .not.call.like({fn: rest.deleteUserPreferences})
              .run()
          })
        })

        describe('resetSorting ', () => {
          test('should remove sorting preferences', () => {
            return expectSaga(sagas.resetSorting)
              .provide([
                [select(entityListSelector), {formName: 'User'}],
                [matchers.call.fn(rest.deleteUserPreferences)],
                [matchers.call.fn(listSagas.setSorting)],
                [matchers.call.fn(listSagas.reloadData)]
              ])
              .call(rest.deleteUserPreferences, 'User_list.sortingField*')
              .call(rest.deleteUserPreferences, 'User_list.sortingDirection*')
              .call.like({fn: listSagas.setSorting})
              .call.like({fn: listSagas.reloadData})
              .run()
          })
        })

        describe('resetPreferences ', () => {
          test('should remove all preferences', () => {
            return expectSaga(sagas.resetPreferences)
              .provide([
                [select(entityListSelector), {formName: 'User'}],
                [matchers.call.fn(rest.deleteUserPreferences)],
                [matchers.call.fn(listSagas.setSorting)],
                [matchers.call.fn(listSagas.reloadData)]
              ])
              .call(rest.deleteUserPreferences, 'User_list.*')
              .call.like({fn: listSagas.setSorting})
              .call.like({fn: listSagas.reloadData})
              .run()
          })
        })

        describe('displayColumnModal ', () => {
          test('should open modal', () => {
            const expectedColumns = {first_field: true, second_field: false}
            const expectedPreferences = {
              'Some_list.first_field.hidden': 'false',
              'Some_list.second_field.hidden': 'true'
            }
            return expectSaga(sagas.displayColumnModal)
              .provide([
                [select(listSagas.listSelector), {
                  formDefinition: {
                    id: 'Some_list',
                    children: [{
                      componentType: 'table',
                      children: [
                        {
                          id: 'first_field'
                        },
                        {
                          id: 'second_field'
                        }
                      ]
                    }]
                  }
                }],
                [select(sagas.preferencesSelector), {columns: {first_field: true, second_field: false}}],
                [channel, {}],
                {
                  take() {
                    return expectedColumns
                  }
                },
                [matchers.call.fn(rest.savePreferences)]
              ])
              .put.like({
                action: {
                  type: 'notifier/MODAL_COMPONENT',
                  payload: {
                    id: 'Some_list-column-selection',
                    title: 'client.entity-list.preferences.columns',
                    message: null,
                    closable: true
                  }
                }
              })
              .call.like({fn: channel})
              .put(actions.setColumns(expectedColumns))
              .call(rest.savePreferences, expectedPreferences)
              .put(listActions.refresh())
              .run()
          })
        })
      })
    })
  })
})

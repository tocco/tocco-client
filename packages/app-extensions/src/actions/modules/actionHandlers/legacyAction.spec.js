import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {channel} from 'redux-saga'
import {call, spawn, select} from 'redux-saga/effects'

import * as legacyAction from './legacyAction'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('actionHandler', () => {
        describe('legacyAction', () => {
          describe('initLegacyActionsEnv', () => {
            test('should init if not initialized', () => {
              window.legacyActionsEnvInitialized = undefined
              window.setUpLegacyActionsEnv = () => {}

              testSaga(legacyAction.initLegacyActionsEnv)
                .next()
                .call(legacyAction.loadSequentially, legacyAction.sources)
                .next()
                .call(window.setUpLegacyActionsEnv)
                .next()
                .call(legacyAction.registerRemoteEventsListener)
                .next()
                .isDone()
            })

            test('should not init if already initialized', () => {
              window.legacyActionsEnvInitialized = true

              testSaga(legacyAction.initLegacyActionsEnv)
                .next()
                .call(legacyAction.registerRemoteEventsListener)
                .next()
                .isDone()
            })
          })

          describe('loadSequentially', () => {
            test('should load the required sources sequentially', () => {
              testSaga(legacyAction.loadSequentially, legacyAction.sources).next()
                .call(legacyAction.loadScript, '/nice2/javascript/lang.release.js').next()
                .call(legacyAction.loadScript, '/nice2/javascript/nice2-ext-newclient-actions.debug.js').next()
                .call(legacyAction.loadScript, '/nice2/javascript/nice2-admin.debug.js').next()
                .call(legacyAction.loadScript, '/nice2/javascript/nice2-newclient-actions-setup.debug.js').next()
                .call(legacyAction.loadScript, '/nice2/dwr-all.js').next()
                .call(legacyAction.loadCss, '/css/themes/blue-medium.css').next()
                .call(legacyAction.loadCss, '/css/nice2-admin.css').next()
                .call(legacyAction.loadCss, '/css/nice2-new-client-legacy-actions.css').next()
                .isDone()
            })
          })

          describe('registerRemoteEventsListener', () => {
            test('should register callback in global DataRegistry and start listening', () => {
              const dataRegistry = {
                setNewClientCallback: () => {}
              }
              window.app = {
                getDataRegistry: () => dataRegistry
              }
              const fakeChannel = {}
              const callback = () => {}
              return expectSaga(legacyAction.registerRemoteEventsListener)
                .provide([
                  [call(channel), fakeChannel],
                  [call(legacyAction.entityEventCallback, fakeChannel), callback],
                  [spawn(legacyAction.readRemoteEvents, fakeChannel)]
                ])
                .call([dataRegistry, dataRegistry.setNewClientCallback], callback)
                .spawn(legacyAction.readRemoteEvents, fakeChannel)
                .run()
            })
          })

          describe('getSelection', () => {
            window.nice2 = {
              netui: {
                ManualQuery: class {
                }
              }
            }
            window.form = {
              FormIdentifier: class {}
            }

            test('should return keys for ID selection', () => {
              const selection = {
                entityName: 'User',
                type: 'ID',
                ids: ['5', '18', '3']
              }
              return expectSaga(legacyAction.getSelection, selection)
                .returns({
                  entityName: 'User',
                  selectionType: 'SELECTION',
                  selectedEntities: ['5', '18', '3']
                })
                .run()
            })

            test('should return search params for QUERY selection', () => {
              const selection = {
                entityName: 'User',
                type: 'QUERY',
                query: {
                  tql: 'firstname == "Hans"',
                  filter: ['active_persons']
                }
              }

              const listState = {
                formDefinition: {
                  id: 'User_list'
                },
                sorting: [
                  {field: 'firstname', order: 'desc'},
                  {field: 'lastname', order: 'asc'}
                ]
              }

              const expectedManualQuery = {
                ...new window.nice2.netui.ManualQuery(),
                entityName: 'User',
                queryWhere: 'firstname == "Hans"',
                queryOrderBy: 'firstname desc, lastname asc'
              }

              const expectedListForm = {
                ...new window.form.FormIdentifier(),
                scope: 'list',
                formName: 'User_list'
              }

              return expectSaga(legacyAction.getSelection, selection)
                .provide([
                  [select(legacyAction.listSelector), listState]
                ])
                .returns({
                  entityName: 'User',
                  selectionType: 'NEW_CLIENT_QUERY',
                  manualQuery: expectedManualQuery,
                  listForm: expectedListForm,
                  searchFilter: 'active_persons'
                })
                .run()
            })

            test('should throw error if more than one search filter', () => {
              const selection = {
                type: 'QUERY',
                query: {
                  filter: ['active_persons', 'employees']
                }
              }

              const listState = {
                formDefinition: {
                  id: 'User_list'
                }
              }

              return expectSaga(legacyAction.getSelection, selection)
                .provide([
                  [select(legacyAction.listSelector), listState]
                ])
                .run()
                .catch(e => {
                  expect(e.message).to.equal('Multiple search filters not supported for legacy actions')
                })
            })

            test('should throw error if unsupported selection type', () => {
              const selection = {
                type: 'UNKNOWN_SELECTION_TYPE'
              }
              return expectSaga(legacyAction.getSelection, selection)
                .run()
                .catch(e => {
                  expect(e.message).to.equal('Unsupported selection type: UNKNOWN_SELECTION_TYPE')
                })
            })
          })
        })
      })
    })
  })
})

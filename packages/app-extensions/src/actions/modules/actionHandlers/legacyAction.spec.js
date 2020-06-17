import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {channel} from 'redux-saga'
import {call, spawn, select} from 'redux-saga/effects'

import notifier from '../../../notifier'
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

              testSaga(legacyAction.initLegacyActionsEnv).next()
                .call(legacyAction.loadSequentially, legacyAction.sources).next()
                .call(window.setUpLegacyActionsEnv).next()
                .call(legacyAction.registerRemoteEventsListener).next()
                .call(legacyAction.registerNotificationsListener).next()
                .isDone()
            })

            test('should not init if already initialized', () => {
              window.legacyActionsEnvInitialized = true

              testSaga(legacyAction.initLegacyActionsEnv).next()
                .call(legacyAction.registerRemoteEventsListener).next()
                .call(legacyAction.registerNotificationsListener).next()
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
                .call(legacyAction.loadScript, '/js/ext-extensions/ckeditor/ckeditor/ckeditor.js').next()
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
                  [call(legacyAction.channelFeedingCallback, fakeChannel), callback],
                  [spawn(legacyAction.readRemoteEvents, fakeChannel)]
                ])
                .call([dataRegistry, dataRegistry.setNewClientCallback], callback)
                .spawn(legacyAction.readRemoteEvents, fakeChannel)
                .run()
            })
          })

          describe('registerNotificationsListener', () => {
            test('should register callback in global Notifier and start listening', () => {
              const notifier = {setNewClientCallback: () => {}}
              const gui = {getNotifier: () => notifier}
              window.app = {getGui: () => gui}
              const fakeChannel = {}
              const callback = () => {}
              return expectSaga(legacyAction.registerNotificationsListener)
                .provide([
                  [call(channel), fakeChannel],
                  [call(legacyAction.channelFeedingCallback, fakeChannel), callback],
                  [spawn(legacyAction.readNotifications, fakeChannel)]
                ])
                .call([notifier, notifier.setNewClientCallback], callback)
                .spawn(legacyAction.readNotifications, fakeChannel)
                .run()
            })
          })

          describe('handleNotification', () => {
            test('should put info notifier action', () => {
              const notification = {
                level: 'INFO',
                message: 'Die Aktion wurde ausgeführt'
              }
              return expectSaga(legacyAction.handleNotification, notification)
                .put(notifier.info('info', null, 'Die Aktion wurde ausgeführt'))
                .run()
            })

            test('should put error notifier action', () => {
              const notification = {
                level: 'ERROR',
                message: 'Die Aktion ist fehlgeschlagen'
              }
              return expectSaga(legacyAction.handleNotification, notification)
                .put(notifier.info('error', null, 'Die Aktion ist fehlgeschlagen'))
                .run()
            })

            test('should throw an error if unsupported notification level', () => {
              const notification = {
                level: 'FOOBAR',
                message: 'My random message'
              }
              return expectSaga(legacyAction.handleNotification, notification)
                .run()
                .catch(e => {
                  expect(e.message).to.equal('Unsupported notification level: FOOBAR')
                })
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
                  searchFilters: ['active_persons']
                })
                .run()
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

          describe('getScope', () => {
            test('should return list scope if entityList in state', () =>
              expectSaga(legacyAction.getScope)
                .provide([
                  [select(legacyAction.entityListSelector), {}],
                  [select(legacyAction.entityDetailSelector), undefined]
                ])
                .returns('list')
                .run()
            )

            test('should return detail scope if entityDetail with mode update in state', () =>
              expectSaga(legacyAction.getScope)
                .provide([
                  [select(legacyAction.entityListSelector), undefined],
                  [select(legacyAction.entityDetailSelector), {mode: 'update'}]
                ])
                .returns('detail')
                .run()
            )

            test('should return create scope if entityDetail with mode create in state', () =>
              expectSaga(legacyAction.getScope)
                .provide([
                  [select(legacyAction.entityListSelector), undefined],
                  [select(legacyAction.entityDetailSelector), {mode: 'create'}]
                ])
                .returns('create')
                .run()
            )

            test('should throw error if unknown mode in entityDetail state', () =>
              expectSaga(legacyAction.getScope)
                .provide([
                  [select(legacyAction.entityListSelector), undefined],
                  [select(legacyAction.entityDetailSelector), {mode: 'foobar'}]
                ])
                .run()
                .catch(e => {
                  expect(e.message)
                    .to.equal('Unable to get form scope. Unexpected detail mode: foobar')
                })
            )

            test('should throw error if entityDetail and entityList in state', () =>
              expectSaga(legacyAction.getScope)
                .provide([
                  [select(legacyAction.entityListSelector), {}],
                  [select(legacyAction.entityDetailSelector), {}]
                ])
                .run()
                .catch(e => {
                  expect(e.message)
                    .to.equal('Unable to get form scope. Unexpected state: entityList and entityDetail exist')
                })
            )

            test('should throw error if whether entityDetail nor entityList in state', () =>
              expectSaga(legacyAction.getScope)
                .provide([
                  [select(legacyAction.entityListSelector), undefined],
                  [select(legacyAction.entityDetailSelector), undefined]
                ])
                .run()
                .catch(e => {
                  expect(e.message)
                    .to.equal('Unable to get form scope. Expected to find either entityList or entityDetail in state')
                })
            )
          })
        })
      })
    })
  })
})

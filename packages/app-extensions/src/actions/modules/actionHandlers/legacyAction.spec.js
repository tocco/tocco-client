import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {channel} from 'redux-saga'
import {call, spawn} from 'redux-saga/effects'

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
        })
      })
    })
  })
})

import {testSaga} from 'redux-saga-test-plan'

import {initLegacyActionsEnv, loadSequentially, sources, loadScript, loadCss} from './legacyAction'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('actionHandler', () => {
        describe('legacyAction', () => {
          describe('initLegacyActionsEnv', () => {
            test('should init if not initialized', () => {
              window.legacyActionsEnvInitialized = undefined
              window.setUpLegacyActionsEnv = () => {}

              testSaga(initLegacyActionsEnv)
                .next()
                .call(loadSequentially, sources)
                .next()
                .call(window.setUpLegacyActionsEnv)
                .next()
                .isDone()
            })

            test('should not init if already initialized', () => {
              window.legacyActionsEnvInitialized = true

              testSaga(initLegacyActionsEnv)
                .next()
                .isDone()
            })
          })

          describe('loadSequentially', () => {
            test('should load the required sources sequentially', () => {
              testSaga(loadSequentially, sources).next()
                .call(loadScript, '/nice2/javascript/lang.release.js').next()
                .call(loadScript, '/nice2/javascript/nice2-ext-newclient-actions.debug.js').next()
                .call(loadScript, '/nice2/javascript/nice2-admin.debug.js').next()
                .call(loadScript, '/nice2/dwr-all.js').next()
                .call(loadScript, '/static/nice_legacy_actions_setup.js').next()
                .call(loadCss, '/css/themes/blue-medium.css').next()
                .call(loadCss, '/css/nice2-admin.css').next()
                .isDone()
            })
          })
        })
      })
    })
  })
})

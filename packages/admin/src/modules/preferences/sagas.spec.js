
import {rest} from 'tocco-app-extensions'
import {takeLatest, all} from 'redux-saga/effects'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import * as actions from './actions'
import mainSaga, * as sagas from './sagas'
import {transformValues} from './preferences'

describe('admin', () => {
  describe('modules', () => {
    describe('preferences', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          test('should fork child sagas', () => {
            const generator = mainSaga()
            expect(generator.next().value).to.deep.equal(all([
              takeLatest(actions.LOAD_SETTINGS_AND_PREFERENCES, sagas.loadSettingsAndPreferences),
              takeLatest(actions.SAVE_USER_PREFERENCES, sagas.saveUserPreferences)
            ]))
            expect(generator.next().done).to.equal(true)
          })
        })

        describe('loadSettingsAndPreferences', () => {
          test('should load settings and preferences', () => {
            const serverSettings = {
              captchaKey: 'xxx',
              niceRevision: 'abcd',
              niceVersion: '3.0'
            }
            const adminPref = {
              'admin.activeMenu': 'main#settings',
              'admin.detail.relationViewCollapsed': 'false'
            }
            const admintreePref = {
              'admintree.address.collapsed': 'false',
              'admintree.groupware.collapsed': 'true',
              'admintree.settings.system.business_unit.collapsed': 'true'
            }
            
            const result = {
              'admin.activeMenu': 'main#settings',
              'admin.detail.relationViewCollapsed': false,
              'admintree.address.collapsed': false,
              'admintree.groupware.collapsed': true,
              'admintree.settings.system.business_unit.collapsed': true
            }

            return expectSaga(sagas.loadSettingsAndPreferences, actions.loadSettingsAndPreferences)
              .provide([
                [matchers.call(rest.fetchServerSettings), serverSettings],
                [matchers.call(rest.fetchUserPreferences, 'admin.*'), adminPref],
                [matchers.call(rest.fetchUserPreferences, 'admintree.*'), admintreePref]
              ])
              .put(actions.setServerSettings(serverSettings))
              .call(transformValues, adminPref)
              .call(transformValues, admintreePref)
              .put(actions.setUserPreferences(result))
              .run()
          })
        })

        describe('saveUserPreferences', () => {
          test('should save key-value preferences', () => {
            const key = 'admintree.address.collapsed'
            const value = false
            return expectSaga(sagas.saveUserPreferences, actions.saveUserPreferences({[key]: value}))
              .provide([
                [matchers.call(rest.savePreferences, {'admintree.address.collapsed': false})]
              ])
              .run()
          })
        })
      })
    })
  })
})

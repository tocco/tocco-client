import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {rest} from 'tocco-app-extensions'

import {saveUserPreferences, setUserPreferences} from '../preferences/actions'
import * as actions from './actions'
import * as sagas from './sagas'

describe('admin', () => {
  describe('navigation', () => {
    describe('sagas', () => {
      describe('loadNavigation', () => {
        test('should load menus', () => {
          const moduleMenu = {menuItems: 'module'}
          const settingsMenu = {menuItems: 'settings'}
          const systemMenu = {menuItems: 'system'}
          const completeMenu = {menuItems: 'complete'}

          return expectSaga(sagas.loadNavigation)
            .provide([
              [matchers.call(rest.requestSaga, 'client/menus/modules'), {body: moduleMenu}],
              [matchers.call(rest.requestSaga, 'client/menus/settings'), {body: settingsMenu}],
              [matchers.call(rest.requestSaga, 'client/menus/system'), {body: systemMenu}],
              [matchers.call(rest.requestSaga, 'client/menus/all'), {body: completeMenu}]
            ])
            .put(actions.setModulesMenuTree('module'))
            .put(actions.setSettingsMenuTree('settings'))
            .put(actions.setSystemMenuTree('system'))
            .put(actions.setCompleteMenuTree('complete'))
            .run()
        })
      })

      describe('setActiveMenuFromPreferences', () => {
        test('should get preferences', () => {
          const userPreferenceAction = setUserPreferences({'admin.activeMenu': 'settings'})

          return expectSaga(sagas.setActiveMenuFromPreferences, userPreferenceAction)
            .provide([[matchers.call.fn(rest.fetchUserPreferences), {'admin.activeMenu': 'settings'}]])
            .put(actions.setActiveMenuTab('settings'))
            .run()
        })
        test('should do nothing without preferences', () => {
          const userPreferenceAction = setUserPreferences({})
          return expectSaga(sagas.setActiveMenuFromPreferences, userPreferenceAction)
            .provide([[matchers.call.fn(rest.fetchUserPreferences), {}]])
            .not.put(actions.setActiveMenuTab('settings'))
            .run()
        })
      })

      describe('saveOpenMenuPreference', () => {
        test('should save opened tab', () => {
          return expectSaga(sagas.saveOpenMenuPreference, {payload: {activeMenuTab: 'settings'}})
            .put(saveUserPreferences({'admin.activeMenu': 'settings'}))
            .run()
        })
      })
    })
  })
})

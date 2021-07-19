import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {rest} from 'tocco-app-extensions'
import {select} from 'redux-saga/effects'

import * as sagas from './sagas'
import * as actions from './actions'
import {saveUserPreferences, setUserPreferences} from '../preferences/actions'

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
          const userPreferenceAction = setUserPreferences({'admin.activeMenu': 'main#settings'})

          return expectSaga(sagas.setActiveMenuFromPreferences, userPreferenceAction)
            .provide([
              [matchers.call.fn(rest.fetchUserPreferences), {'admin.activeMenu': 'main#settings'}]
            ])
            .put(actions.setVisibleMenus('main'))
            .put(actions.setActiveMenuTab('settings'))
            .run()
        })
        test('should do nothing without preferences', () => {
          const userPreferenceAction = setUserPreferences({})
          return expectSaga(sagas.setActiveMenuFromPreferences, userPreferenceAction)
            .provide([
              [matchers.call.fn(rest.fetchUserPreferences), {}]
            ])
            .not.put(actions.setVisibleMenus('main'))
            .not.put(actions.setActiveMenuTab('settings'))
            .run()
        })
      })

      describe('saveOpenMenuPreference', () => {
        test('should save opened tab', () => {
          return expectSaga(sagas.saveOpenMenuPreference, {payload: {activeMenuTab: 'settings'}})
            .provide([
              [select(sagas.navigationSelector), {visibleMenus: 'main'}]
            ])
            .put(saveUserPreferences('admin.activeMenu', 'main#settings'))
            .run()
        })
      })
    })
  })
})

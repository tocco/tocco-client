import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {select} from 'redux-saga/effects'
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

      describe('setActiveMenuFromShortcut', () => {
        test('should switch to menu tab when menu has items', () => {
          const state = {
            settingsMenuTree: [{}, {}]
          }

          return expectSaga(sagas.setActiveMenuFromShortcut, {payload: {menuTab: 'settings'}})
            .provide([[select(sagas.navigationSelector), state]])
            .put(actions.toggleShortcutMenu('settings'))
            .put(actions.setActiveMenuTab('settings'))
            .run()
        })

        test('should not switch to menu tab when menu has no items', () => {
          const state = {
            settingsMenuTree: []
          }

          return expectSaga(sagas.setActiveMenuFromShortcut, {payload: {menuTab: 'settings'}})
            .provide([[select(sagas.navigationSelector), state]])
            .run()
        })

        test('should map modules menu tree / tabs correctly', () => {
          const state = {
            modulesMenuTree: [{}, {}]
          }

          return expectSaga(sagas.setActiveMenuFromShortcut, {payload: {menuTab: 'modules'}})
            .provide([[select(sagas.navigationSelector), state]])
            .put(actions.toggleShortcutMenu('modules'))
            .put(actions.setActiveMenuTab('modules'))
            .run()
        })

        test('should map system menu tree / tabs correctly', () => {
          const state = {
            systemMenuTree: [{}, {}]
          }

          return expectSaga(sagas.setActiveMenuFromShortcut, {payload: {menuTab: 'system'}})
            .provide([[select(sagas.navigationSelector), state]])
            .put(actions.toggleShortcutMenu('system'))
            .put(actions.setActiveMenuTab('system'))
            .run()
        })

        test('should map complete menu tree / tabs correctly', () => {
          const state = {
            completeMenuTree: [{}, {}]
          }

          return expectSaga(sagas.setActiveMenuFromShortcut, {payload: {menuTab: 'complete'}})
            .provide([[select(sagas.navigationSelector), state]])
            .put(actions.toggleShortcutMenu('complete'))
            .put(actions.setActiveMenuTab('complete'))
            .run()
        })

        test('should handle empty menu', () => {
          const state = {}

          return expectSaga(sagas.setActiveMenuFromShortcut, {payload: {menuTab: 'complete'}})
            .provide([[select(sagas.navigationSelector), state]])
            .run()
        })
      })
    })
  })
})

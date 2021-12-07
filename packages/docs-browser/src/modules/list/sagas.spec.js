import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {takeLatest} from 'redux-saga/effects'
import {externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'
import * as sagas from './sagas'

describe('docs-browser', () => {
  describe('modules', () => {
    describe('list', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(sagas.default)
            saga
              .next()
              .all([
                takeLatest(actions.CHANGE_LIST_PARENT, sagas.changeListParent),
                takeLatest(actions.CHANGE_SELECTION, sagas.changeSelection),
                takeLatest(actions.CHANGE_SEARCH_FORM_COLLAPSED, sagas.changeSearchFormCollapsed)
              ])
          })
        })

        describe('listParentChange', () => {
          test('should fire external onListParentChange event', () => {
            const parent = {model: 'User', key: '1'}
            return expectSaga(sagas.changeListParent, {payload: {parent: parent}})
              .put(externalEvents.fireExternalEvent('onListParentChange', parent))
              .run()
          })
        })

        describe('changeSelection', () => {
          test('should fire external onSelectChange event', () => {
            const selection = ['Resource/1', 'Domain/2']
            return expectSaga(sagas.changeSelection, {payload: {selection}})
              .put(externalEvents.fireExternalEvent('onSelectChange', selection))
              .run()
          })
        })

        describe('changeSearchFormCollapsed', () => {
          test('should fire external changeSearchFormCollapsed event', () => {
            const collapsed = true
            return expectSaga(sagas.changeSearchFormCollapsed, {payload: {collapsed}})
              .put(externalEvents.fireExternalEvent('onSearchFormCollapsedChange', collapsed))
              .run()
          })
        })
      })
    })
  })
})

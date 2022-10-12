import {expectSaga} from 'redux-saga-test-plan'
import {call, takeLatest, all} from 'redux-saga/effects'
import {appFactory} from 'tocco-app-extensions'

import * as actions from './../entityList/actions'
import * as listActions from './../list/actions'
import * as preferenceActions from './../preferences/actions'
import * as searchFormActions from './../searchForm/actions'
import rootSaga, * as sagas from './sagas'

describe('entity-list', () => {
  describe('modules', () => {
    describe('entityList', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(
              all([
                call(sagas.initialize),
                takeLatest(appFactory.INPUT_CHANGED, sagas.inputChanged),
                takeLatest(actions.RELOAD_DATA, sagas.reloadData),
                takeLatest(actions.RELOAD_ALL, sagas.initialize, false),
                takeLatest(actions.SET_SEARCH_FORM_COLLAPSED, sagas.setSearchFormCollapsed)
              ])
            )
            expect(generator.next().done).to.be.true
          })
        })

        describe('initialize', () => {
          test('should coordinate loading of modules and dependencies', () => {
            return expectSaga(sagas.initialize)
              .dispatch({type: appFactory.INPUT_INITIALIZED})
              .put(listActions.initialize())
              .dispatch({type: listActions.SET_INITIALIZED})
              .put(searchFormActions.initialize())
              .dispatch({type: searchFormActions.SET_INITIALIZED})
              .put(preferenceActions.loadPreferences())
              .dispatch({type: preferenceActions.SET_PREFERENCES_LOADED})
              .put(listActions.defineSorting())
              .dispatch({type: listActions.SET_SORTING})
              .put(searchFormActions.executeSearch())
              .run()
          })
        })

        describe('reloadData', () => {
          test('should init search form and trigger search', () => {
            return expectSaga(sagas.reloadData)
              .put(searchFormActions.initialize())
              .dispatch({type: searchFormActions.SET_INITIALIZED})
              .put(searchFormActions.executeSearch())
              .run()
          })
        })
      })
    })
  })
})

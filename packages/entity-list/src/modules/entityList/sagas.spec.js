import {takeLatest, all} from 'redux-saga/effects'
import {appFactory} from 'tocco-app-extensions'
import {expectSaga} from 'redux-saga-test-plan'

import * as actions from './../entityList/actions'
import * as listActions from './../list/actions'
import * as searchFormActions from './../searchForm/actions'
import * as preferenceActions from './../preferences/actions'
import rootSaga, * as sagas from './sagas'

describe('entity-list', () => {
  describe('modules', () => {
    describe('entityList', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              takeLatest(actions.RELOAD_DATA, sagas.reloadData),
              takeLatest(actions.RELOAD_ALL, sagas.initialize)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('initialize', () => {
          test('should coordinate loading of modules and dependencies', () => {
            return expectSaga(sagas.initialize, {payload: {waitForInputDispatch: true}})
              .dispatch({type: appFactory.inputDispatchActionType})
              .put(listActions.setInProgress(true))
              .put(listActions.initialize())
              .put(preferenceActions.loadPreferences())
              .put(searchFormActions.initialize())
              .dispatch({type: listActions.SET_INITIALIZED})
              .dispatch({type: searchFormActions.SET_INITIALIZED})
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

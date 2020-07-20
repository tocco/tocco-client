import {takeLatest, all, select} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import {entityListSelector} from '../list/sagas'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('entity-list', () => {
  describe('modules', () => {
    describe('preferences', () => {
      describe('rootSaga', () => {
        test('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal(all([
            takeLatest(actions.LOAD_PREFERENCES, sagas.loadPreferences),
            takeLatest(actions.CHANGE_POSITION, sagas.changePosition)
          ]))
          expect(generator.next().done).to.be.true
        })
        describe('loadPreferences', () => {
          test('should fetch user preferences and dispatch', () => {
            const preferences = {
              'User_list.firstname.position': '5'
            }

            return expectSaga(sagas.loadPreferences)
              .provide([
                [select(entityListSelector), {formName: 'User'}],
                [matchers.call.fn(rest.fetchUserPreferences), preferences]
              ])
              .put.actionType(actions.SET_POSITIONS)
              .run()
          })
        })

        describe('changePosition ', () => {
          test('should put new position, delete preferences and save new one ', () => {
            return expectSaga(sagas.changePosition, {payload: {field: 'firstname', afterFieldPosition: 'mail'}})
              .provide([
                [select(entityListSelector), {formName: 'User'}],
                [select(sagas.preferencesSelector), {positions: {firstname: 1, mail: 2}}],
                [matchers.call.fn(rest.deleteUserPreferences)],
                [matchers.call.fn(rest.savePreferences)]
              ])
              .put.actionType(actions.SET_POSITIONS)
              .call.like({fn: rest.savePreferences})
              .call.like({fn: rest.deleteUserPreferences})
              .run()
          })
        })
      })
    })
  })
})

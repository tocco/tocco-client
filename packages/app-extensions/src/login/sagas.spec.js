import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {takeLatest} from 'redux-saga/effects'
import {cache} from 'tocco-util'
import * as matchers from 'redux-saga-test-plan/matchers'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import notification from '../notification'

describe('app-extensions', () => {
  describe('login', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        test('should fork sagas', () => {
          const saga = testSaga(rootSaga)
          saga.next().all([
            takeLatest(actions.DO_SESSION_CHECK, sagas.sessionCheck)
          ])
        })
      })
      describe('sessionCheck', () => {
        test('should clear cache on different bu', () => {
          cache.clearAll()

          const sessionResponse = {
            businessUnit: 'm2'
          }
          cache.addShortTerm('session', 'principal', {
            currentBusinessUnit: {
              id: 'm1'
            }
          })
          return expectSaga(sagas.sessionCheck)
            .provide([
              [matchers.call(sagas.doSessionRequest), sessionResponse]
            ])
            .call(cache.clearShortTerm)
            .run()
        })
        test('should not clear cache on same bu', () => {
          cache.clearAll()

          const sessionResponse = {
            businessUnit: 'm1'
          }
          cache.addShortTerm('session', 'principal', {
            currentBusinessUnit: {
              id: 'm1'
            }
          })
          return expectSaga(sagas.sessionCheck)
            .provide([
              [matchers.call(sagas.doSessionRequest), sessionResponse]
            ])
            .not.call(cache.clearShortTerm)
            .run()
        })
        test('should set logged in', () => {
          const sessionResponse = {
            success: false
          }
          return expectSaga(sagas.sessionCheck)
            .provide([
              [matchers.call(sagas.doSessionRequest), sessionResponse]
            ])
            .put(actions.setLoggedIn(false))
            .run()
        })
        test('should not connect socket on failure', () => {
          const sessionResponse = {
            success: false
          }
          return expectSaga(sagas.sessionCheck)
            .provide([
              [matchers.call(sagas.doSessionRequest), sessionResponse]
            ])
            .not.put(notification.connectSocket())
            .run()
        })
        test('should connect socket on success', () => {
          const sessionResponse = {
            success: true
          }
          return expectSaga(sagas.sessionCheck)
            .provide([
              [matchers.call(sagas.doSessionRequest), sessionResponse]
            ])
            .put(notification.connectSocket())
            .run()
        })
        test('should set adminAllowed in', () => {
          const sessionResponse = {
            adminAllowed: true
          }
          return expectSaga(sagas.sessionCheck)
            .provide([
              [matchers.call(sagas.doSessionRequest), sessionResponse]
            ])
            .put(actions.setAdminAllowed(true))
            .run()
        })
      })
    })
  })
})

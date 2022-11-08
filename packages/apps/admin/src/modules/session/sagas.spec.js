import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {select} from 'redux-saga/effects'
import {login, notification, rest} from 'tocco-app-extensions'

import * as actions from './actions'
import * as sagas from './sagas'

describe('admin', () => {
  describe('session', () => {
    describe('sagas', () => {
      describe('isSsoAvailable', () => {
        test('should return true if module available and at least 1 provider', () => {
          return expectSaga(sagas.isSsoAvailable)
            .provide([
              [
                matchers.call(rest.requestSaga, 'modules'),
                {
                  body: {
                    modules: ['nice.optional.address', 'nice.optional.sso']
                  }
                }
              ],
              [matchers.call(rest.fetchEntityCount, 'Openid_provider', {where: 'active == true'}), 1]
            ])
            .returns(true)
            .run()
        })

        test('should return false if module available but no provider', () => {
          return expectSaga(sagas.isSsoAvailable)
            .provide([
              [
                matchers.call(rest.requestSaga, 'modules'),
                {
                  body: {
                    modules: ['nice.optional.address', 'nice.optional.sso']
                  }
                }
              ],
              [matchers.call(rest.fetchEntityCount, 'Openid_provider', {where: 'active == true'}), 0]
            ])
            .returns(false)
            .run()
        })

        test('should return false if module not available', () => {
          return expectSaga(sagas.isSsoAvailable)
            .provide([
              [
                matchers.call(rest.requestSaga, 'modules'),
                {
                  body: {
                    modules: ['nice.optional.address']
                  }
                }
              ]
            ])
            .returns(false)
            .run()
        })
      })
      describe('sessionHeartbeat', () => {
        test('should set flags if user is logged in successfully', () => {
          const sessionResponse = {
            success: true,
            adminAllowed: true
          }

          return expectSaga(sagas.sessionHeartbeat)
            .provide([
              [select(sagas.loginSelector), {loggedIn: false}],
              [matchers.call.fn(login.doSessionRequest), sessionResponse],
              [matchers.call.fn(sagas.sessionHeartbeat)],
              [matchers.call.fn(sagas.delayByTimeout)]
            ])
            .put(login.setLoggedIn(true))
            .put(login.setAdminAllowed(true))
            .put(actions.setInvalidSession(false))
            .call(sagas.sessionHeartbeat)
            .call(sagas.delayByTimeout, sagas.HEARTBEAT_INTERVAL_IN_MS)
            .run()
        })

        test('should set flags if user is already logged in', () => {
          const sessionResponse = {
            success: true,
            adminAllowed: true
          }

          return expectSaga(sagas.sessionHeartbeat)
            .provide([
              [select(sagas.loginSelector), {loggedIn: true}],
              [matchers.call.fn(login.doSessionRequest), sessionResponse],
              [matchers.call.fn(sagas.sessionHeartbeat)],
              [matchers.call.fn(sagas.delayByTimeout)]
            ])
            .put(login.setLoggedIn(true))
            .put(login.setAdminAllowed(true))
            .put(actions.setInvalidSession(false))
            .call(sagas.sessionHeartbeat)
            .call(sagas.delayByTimeout, sagas.HEARTBEAT_INTERVAL_IN_MS)
            .run()
        })

        test('should set invalid session if user is no longer logged in', () => {
          const sessionResponse = {
            success: false
          }

          return expectSaga(sagas.sessionHeartbeat)
            .provide([
              [select(sagas.loginSelector), {loggedIn: true}],
              [matchers.call.fn(login.doSessionRequest), sessionResponse],
              [matchers.call.fn(sagas.sessionHeartbeat)],
              [matchers.call.fn(sagas.delayByTimeout)]
            ])
            .not.put(login.setLoggedIn(false))
            .put(actions.setInvalidSession(true))
            .call(sagas.sessionHeartbeat)
            .call(sagas.delayByTimeout, sagas.HEARTBEAT_INTERVAL_IN_MS)
            .run()
        })
      })

      describe('loginSuccessful', () => {
        test('login and set admin allowed to undefined', () => {
          return expectSaga(sagas.loginSuccessful)
            .provide([
              [select(sagas.sessionSelector), {invalidSession: false}],
              [matchers.call.fn(sagas.doSessionRequest)]
            ])
            .put(login.setAdminAllowed(undefined))
            .put(login.setLoggedIn(true))
            .put(notification.connectSocket())
            .call(sagas.doSessionRequest)
            .run()
        })

        test('relogin after invalid session', () => {
          return expectSaga(sagas.loginSuccessful)
            .provide([
              [select(sagas.sessionSelector), {invalidSession: true}],
              [matchers.call.fn(sagas.doSessionRequest)]
            ])
            .not.put(login.setAdminAllowed(undefined))
            .put(login.setLoggedIn(true))
            .put(notification.connectSocket())
            .call(sagas.doSessionRequest)
            .run()
        })
      })
    })
  })
})

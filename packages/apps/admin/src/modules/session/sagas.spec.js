import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {login, rest} from 'tocco-app-extensions'

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
        test('should set flags and call itself', () => {
          const sessionResponse = {
            success: true,
            adminAllowed: true
          }

          return expectSaga(sagas.sessionHeartbeat)
            .provide([
              [matchers.call.fn(login.doSessionRequest), sessionResponse],
              [matchers.call.fn(sagas.sessionHeartbeat)],
              [matchers.call.fn(sagas.delayByTimeout)]
            ])
            .put(login.setLoggedIn(true))
            .put(login.setAdminAllowed(true))
            .call(sagas.sessionHeartbeat)
            .call(sagas.delayByTimeout, sagas.HEARTBEAT_INTERVAL_IN_MS)
            .run()
        })
      })
    })
  })
})

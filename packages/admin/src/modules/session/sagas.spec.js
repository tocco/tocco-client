import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {rest} from 'tocco-app-extensions'

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
    })
  })
})

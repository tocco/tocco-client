import {externalEvents, rest} from 'tocco-app-extensions'
import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {takeLatest, fork, select} from 'redux-saga/effects'

import * as actions from './actions'
import mainSaga, * as sagas from './sagas'

describe('sso-login', () => {
  describe('modules', () => {
    describe('sagas', () => {
      describe('mainSaga', () => {
        test('should fork sagas', () => {
          const saga = testSaga(mainSaga)
          saga.next().all([
            fork(takeLatest, actions.LOAD_PROVIDERS, sagas.loadProviders),
            fork(takeLatest, actions.LOGIN_COMPLETED, sagas.loginCompleted)
          ])
        })
      })

      describe('loginCompleted', () => {
        test('should call external event with result', () => {
          const result = {successful: true, xy: 2}
          return expectSaga(sagas.loginCompleted, actions.loginCompleted(result))
            .put(externalEvents.fireExternalEvent('loginCompleted', result))
            .run()
        })
      })

      describe('loadProviders', () => {
        test('should call fetchEntities and dispatch result', () => {
          return expectSaga(sagas.loadProviders)
            .provide([
              [select(sagas.intlSelector), {locale: 'de'}],
              [matchers.call.fn(rest.fetchEntities), []]
            ])
            .call.like({fn: rest.fetchEntities})
            .put(actions.setProviders([]))
            .run()
        })
      })
    })
  })
})

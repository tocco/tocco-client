import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {takeLatest, select} from 'redux-saga/effects'
import {externalEvents, rest, cache as cacheHelpers} from 'tocco-app-extensions'
import {cache, request, queryString, env} from 'tocco-util'

import * as actions from './actions'
import mainSaga, * as sagas from './sagas'

describe('sso-login', () => {
  describe('modules', () => {
    describe('sagas', () => {
      describe('mainSaga', () => {
        test('should fork sagas', () => {
          const saga = testSaga(mainSaga)
          saga
            .next()
            .all([
              takeLatest(actions.LOAD_PROVIDERS, sagas.loadProviders),
              takeLatest(actions.LOGIN_COMPLETED, sagas.loginCompleted)
            ])
        })
      })

      describe('loginCompleted', () => {
        test('should call external event with result', () => {
          const result = {successful: true, xy: 2}
          return expectSaga(sagas.loginCompleted, actions.loginCompleted(result))
            .provide([
              [select(sagas.inputSelector), {appContext: {embedType: 'admin'}}],
              [matchers.call.fn(cacheHelpers.hasInvalidCache), false]
            ])
            .call(cache.clearShortTerm)
            .put(externalEvents.fireExternalEvent('loginCompleted', result))
            .run()
        })

        test('should clear cache if cache is invalid after login', () => {
          const result = {successful: true, xy: 2}
          return expectSaga(sagas.loginCompleted, actions.loginCompleted(result))
            .provide([
              [select(sagas.inputSelector), {appContext: {embedType: 'admin'}}],
              [matchers.call.fn(cacheHelpers.hasInvalidCache), true]
            ])
            .call(cache.clearAll)
            .put(externalEvents.fireExternalEvent('loginCompleted', result))
            .run()
        })

        test('should call login request after login', () => {
          const result = {successful: true, xy: 2}
          env.setBusinessUnit('test1')
          return expectSaga(sagas.loginCompleted, actions.loginCompleted(result))
            .provide([
              [select(sagas.inputSelector), {appContext: {embedType: 'widget'}}],
              [matchers.call.fn(cacheHelpers.hasInvalidCache), false],
              [matchers.call.fn(request.executeRequest), {}]
            ])
            .call(sagas.doLoginRequest)
            .run()
        })

        test('should redirect after login', () => {
          const result = {successful: true, xy: 2}
          return expectSaga(sagas.loginCompleted, actions.loginCompleted(result))
            .provide([
              [select(sagas.inputSelector), {appContext: {embedType: 'widget'}}],
              [matchers.call.fn(cacheHelpers.hasInvalidCache), false],
              [matchers.call.fn(request.executeRequest), {}]
            ])
            .call(sagas.handleRedirect)
            .run()
        })
      })

      describe('getRedirectUrl', () => {
        test('should get redirectUrl from querystring', () => {
          const queryRedirectUrl = 'https://tocco.ch'
          const redirectUrl = 'https://google.ch'

          return expectSaga(sagas.getRedirectUrl)
            .provide([
              [select(sagas.inputSelector), {redirectUrl}],
              [matchers.call.fn(queryString.fromQueryString), {_redirect_url: queryRedirectUrl}]
            ])
            .returns(queryRedirectUrl)
            .run()
        })

        test('should get redirectUrl from input when query is not set', () => {
          const redirectUrl = 'https://google.ch'

          return expectSaga(sagas.getRedirectUrl)
            .provide([
              [select(sagas.inputSelector), {redirectUrl}],
              [matchers.call.fn(queryString.fromQueryString), {}]
            ])
            .returns(redirectUrl)
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

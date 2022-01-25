import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {select, takeLatest, all} from 'redux-saga/effects'
import {externalEvents, rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {checkAccessRights, connectPrincipal} from './sagas'

describe('connect-principal', () => {
  describe('modules', () => {
    describe('connectPrincipal', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              takeLatest(actions.CHECK_ACCESS_RIGHTS, checkAccessRights),
              takeLatest(actions.CONNECT_PRINCIPAL, connectPrincipal)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        const input = {
          selection: {
            type: 'ID',
            entityName: 'Principal',
            ids: ['1']
          }
        }

        describe('checkAccessRights', () => {
          const resource = '/sso/action/connectPrincipal/checkAccessRights/1'
          const options = {
            method: 'GET',
            acceptedStatusCodes: [403]
          }

          test('user has access rights', () => {
            return expectSaga(sagas.checkAccessRights)
              .provide([
                [select(sagas.inputSelector), input],
                [matchers.call(rest.requestSaga, resource, options), {status: 204}]
              ])
              .put(actions.setShowSsoLoginApp(true))
              .run()
          })

          test('user has no access rights', () => {
            return expectSaga(sagas.checkAccessRights)
              .provide([
                [select(sagas.inputSelector), input],
                [matchers.call(rest.requestSaga, resource, options), {status: 403}]
              ])
              .put(externalEvents.fireExternalEvent('onError', {
                message: 'client.actions.ConnectPrincipalAction.permission_message'
              }))
              .run()
          })
        })

        describe('connectPrincipal', () => {
          const provider = 'office365'
          const ssoSubject = 'testSsoSubject'
          const resource = '/sso/action/connectPrincipal'
          const options = {
            method: 'POST',
            body: {
              principalKey: '1',
              provider,
              ssoSubject
            }
          }

          test('successful connected', () => {
            const body = {
              success: true,
              message: 'success-text-resource'
            }
            return expectSaga(sagas.connectPrincipal, {payload: {provider, ssoSubject}})
              .provide([
                [select(sagas.inputSelector), input],
                [matchers.call(rest.requestSaga, resource, options), {body}]
              ])
              .put(externalEvents.fireExternalEvent('onSuccess', {
                message: 'success-text-resource'
              }))
              .run()
          })

          test('error during connecting', () => {
            const body = {
              success: false,
              message: 'error-text-resource'
            }
            return expectSaga(sagas.connectPrincipal, {payload: {provider, ssoSubject}})
              .provide([
                [select(sagas.inputSelector), input],
                [matchers.call(rest.requestSaga, resource, options), {body}]
              ])
              .put(externalEvents.fireExternalEvent('onError', {
                message: 'error-text-resource'
              }))
              .run()
          })
        })
      })
    })
  })
})

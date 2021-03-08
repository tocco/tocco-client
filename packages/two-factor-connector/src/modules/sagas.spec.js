import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, select, takeLatest} from 'redux-saga/effects'
import {rest, externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('two-factor-connector', () => {
  describe('modules', () => {
    describe('sagas', () => {
      test('should fork child sagas', () => {
        const generator = rootSaga()
        expect(generator.next().value).to.deep.equal(all([
          takeLatest(actions.REQUEST_SECRET, sagas.requestSecret),
          takeLatest(actions.VERIFY_CODE, sagas.verifyCode),
          takeLatest(actions.INITIALIZE, sagas.initialize),
          takeLatest(actions.SUCCESS, sagas.success),
          takeLatest(actions.GO_TO_START, sagas.fireResize),
          takeLatest(actions.GO_TO_SECRET, sagas.fireResize),
          takeLatest(actions.GO_TO_SECRET_VERIFICATION, sagas.fireResize),
          takeLatest(actions.GO_TO_RESULT, sagas.fireResize)
        ]))
        expect(generator.next().done).to.be.true
      })

      describe('initialize', () => {
        test('should call loadPrincipal2FAInfo', () => {
          return expectSaga(sagas.initialize)
            .provide([
              [matchers.call.fn(sagas.loadPrincipal2FAInfo)],
              [select(sagas.inputSelector), {}]
            ])
            .call(sagas.loadPrincipal2FAInfo)
            .put(actions.goToStart())
            .run()
        })

        test('should set secret if it is in input', () => {
          const secret = {secret: 'text', uri: 'uri'}
          return expectSaga(sagas.initialize)
            .provide([
              [matchers.call.fn(sagas.loadPrincipal2FAInfo)],
              [select(sagas.inputSelector), {secret: secret}]
            ])
            .call(sagas.loadPrincipal2FAInfo)
            .put(actions.setSecret(secret))
            .put(actions.goToStart())
            .run()
        })
      })

      describe('success', () => {
        test('should call external event', () => {
          return expectSaga(sagas.success)
            .put(externalEvents.fireExternalEvent('onSuccess'))
            .run()
        })
      })

      describe('loadPrincipal2FAInfo', () => {
        const username = 'dake'
        const principalFake = {body: {username}}
        const fakePrincipals = twoFAActive =>
          [{paths: {relTwo_step_login_status: {value: {key: twoFAActive ? '1' : '2'}}}}]

        test('should set username and if twoFactor is active', () =>
          expectSaga(sagas.loadPrincipal2FAInfo)
            .provide([
              [matchers.call.fn(rest.requestSaga), principalFake],
              [matchers.call.fn(rest.fetchEntities), fakePrincipals(true)],
              [select(sagas.inputSelector), {}]
            ])
            .put(actions.setUserName(username))
            .put(actions.setTwoFactorActive(true))
            .run()
        )

        test('should set  twoFactor false is is inactive', () =>
          expectSaga(sagas.loadPrincipal2FAInfo)
            .provide([
              [matchers.call.fn(rest.requestSaga), principalFake],
              [matchers.call.fn(rest.fetchEntities), fakePrincipals(false)],
              [select(sagas.inputSelector), {}]
            ])
            .put(actions.setUserName(username))
            .put(actions.setTwoFactorActive(false))
            .run()
        )

        test('should throw error if multiple users found', done => {
          expectSaga(sagas.loadPrincipal2FAInfo)
            .provide([
              [matchers.call.fn(rest.requestSaga), principalFake],
              [matchers.call.fn(rest.fetchEntities), [...fakePrincipals(false), ...fakePrincipals(false)]],
              [select(sagas.inputSelector), {}]
            ])
            .silentRun()
            .catch(error => {
              expect(error.message).to.eql('More than one user found for username dake')
              done()
            })
        })

        test('should use username from input', () => {
          expectSaga(sagas.loadPrincipal2FAInfo)
            .provide([
              [matchers.call.fn(rest.fetchEntities), fakePrincipals(true)],
              [select(sagas.inputSelector), {username: 'inputUser'}]
            ])
            .put(actions.setUserName('inputUser'))
            .put(actions.setTwoFactorActive(true))
            .run()
        })
      })

      describe('requestSecret', () => {
        const secret = {
          secret: '7ad4b588f0774cf19ac518289c751486',
          totpUri: 'otpauth://totp/Tocco?secret=7ad4b588f0774cf19ac518289c751486'
        }
        const FakeTwoFactorResponse = {
          body: {
            ...secret
          }
        }

        test('should call rest endpoint and set secret', () =>
          expectSaga(sagas.requestSecret)
            .provide([
              [select(sagas.inputSelector), {}],
              [select(sagas.usernameSelector), 'dake'],
              [matchers.call.fn(rest.requestSaga), FakeTwoFactorResponse]
            ])
            .put(actions.setSecret({
              secret: secret.secret,
              uri: secret.totpUri
            }))
            .put(actions.goToSecret())
            .run()
        )

        test('should not load secret if it is already set', () =>
          expectSaga(sagas.requestSecret)
            .provide([
              [select(sagas.inputSelector), {secret: 'xxx'}]
            ])
            .put(actions.goToSecret())
            .run()
        )
      })

      describe('verifyCode', () => {
        test('should redirect and set successfully on 204 response', () =>
          expectSaga(sagas.verifyCode, actions.verifyCode('123456'))
            .provide([
              [select(sagas.usernameSelector), 'dake'],
              [select(sagas.secretSelector), {text: '7ad4b588f0774cf19ac518289c751486'}],
              [matchers.call.fn(rest.requestSaga), {status: 204}],
              [select(sagas.inputSelector), {}]
            ])
            .put(actions.setSetupSuccessful(true))
            .put(actions.goToResult())
            .run()
        )

        test('should redirect and set NOT successfully on falsy response', () =>
          expectSaga(sagas.verifyCode, actions.verifyCode('123456'))
            .provide([
              [select(sagas.usernameSelector), 'dake'],
              [select(sagas.secretSelector), {text: '7ad4b588f0774cf19ac518289c751486'}],
              [matchers.call.fn(rest.requestSaga), {status: 400}],
              [select(sagas.inputSelector), {}]
            ])
            .put(actions.setSetupSuccessful(false))
            .put(actions.goToResult())
            .run()
        )

        test('should send login request when forced', () =>
          expectSaga(sagas.verifyCode, actions.verifyCode('123456'))
            .provide([
              [select(sagas.usernameSelector), 'dake'],
              [select(sagas.secretSelector), {secret: '7ad4b588f0774cf19ac518289c751486'}],
              [matchers.call.fn(rest.requestSaga), {body: {TWOSTEPLOGIN_ACTIVATION: {success: true}}}],
              [select(sagas.inputSelector), {password: 'password', forced: true}]
            ])
            .call.like({
              fn: rest.requestSaga,
              args: ['nice2/login']
            })
            .put(actions.setSetupSuccessful(true))
            .put(actions.goToResult())
            .run()
        )
      })

      describe('fireResize', () => {
        test('should call external onResize event', () => {
          return expectSaga(sagas.fireResize)
            .put(externalEvents.fireExternalEvent('onResize'))
            .run()
        })
      })
    })
  })
})

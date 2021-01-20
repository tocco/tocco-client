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
          takeLatest(actions.SUCCESS, sagas.success)
        ]))
        expect(generator.next().done).to.be.true
      })

      describe('initialize', () => {
        test('should call loadPrincipal2FAInfo', () => {
          return expectSaga(sagas.initialize)
            .provide([
              [matchers.call.fn(sagas.loadPrincipal2FAInfo)]
            ])
            .call(sagas.loadPrincipal2FAInfo)
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
              [matchers.call.fn(rest.fetchEntities), fakePrincipals(true)]
            ])
            .put(actions.setUserName(username))
            .put(actions.setTwoFactorActive(true))
            .run()
        )

        test('should set  twoFactor false is is inactive', () =>
          expectSaga(sagas.loadPrincipal2FAInfo)
            .provide([
              [matchers.call.fn(rest.requestSaga), principalFake],
              [matchers.call.fn(rest.fetchEntities), fakePrincipals(false)]
            ])
            .put(actions.setUserName(username))
            .put(actions.setTwoFactorActive(false))
            .run()
        )

        test('should throw error if multiple users found', done => {
          expectSaga(sagas.loadPrincipal2FAInfo)
            .provide([
              [matchers.call.fn(rest.requestSaga), principalFake],
              [matchers.call.fn(rest.fetchEntities), [...fakePrincipals(false), ...fakePrincipals(false)]]
            ])
            .silentRun()
            .catch(error => {
              expect(error.message).to.eql('More than one user found for username dake')
              done()
            })
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
              [select(sagas.usernameSelector), 'dake'],
              [matchers.call.fn(rest.requestSaga), FakeTwoFactorResponse]
            ])
            .put(actions.setSecret({
              text: secret.secret,
              uri: secret.totpUri
            }))
            .run()
        )
      })

      describe('verifyCode', () => {
        test('should redirect and set successfully on 204 response', () =>
          expectSaga(sagas.verifyCode, actions.verifyCode('123456'))
            .provide([
              [select(sagas.usernameSelector), 'dake'],
              [select(sagas.secretSelector), {text: '7ad4b588f0774cf19ac518289c751486'}],
              [matchers.call.fn(rest.requestSaga), {status: 204}]
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
              [matchers.call.fn(rest.requestSaga), {status: 400}]
            ])
            .put(actions.setSetupSuccessful(false))
            .put(actions.goToResult())
            .run()
        )
      })
    })
  })
})

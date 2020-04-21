import {externalEvents} from 'tocco-app-extensions'
import {takeLatest, put, select, call, all} from 'redux-saga/effects'
import {cache} from 'tocco-util'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {changePage, setPassword} from './login/actions'
import {setMessage, setPending} from './loginForm/actions'
import {setRequestedCode} from './twoStepLogin/actions'
import {updateOldPassword} from './passwordUpdate/password/actions'
import {setUsername, setForcedUpdate} from './passwordUpdate/dialog/actions'
import {Pages} from '../types/Pages'

describe('login', () => {
  describe('modules', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        test('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal(all([
            takeLatest(actions.LOGIN, sagas.loginSaga),
            takeLatest(actions.INITIALIZE, sagas.initialize)
          ]))
          expect(generator.next().done).to.equal(true)
        })
      })

      describe('loginSaga', () => {
        const payload = {username: 'test', password: '123'}
        test('should handle successful login', () => {
          const gen = sagas.loginSaga({payload})
          expect(gen.next().value).to.eql(put(setPending(true)))
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, payload))
          const response = {success: true}
          expect(gen.next(response).value).to.eql(call(sagas.handleSuccessfulLogin, response))
          expect(gen.next().done).to.deep.equal(true)
        })

        test('should handle unsuccessful login', () => {
          const gen = sagas.loginSaga({payload})
          expect(gen.next().value).to.eql(put(setPending(true)))
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, payload))
          const response = {success: false}
          expect(gen.next(response).value).to.eql(put(changePage(Pages.LOGIN_FORM)))
          expect(gen.next().value).to.eql(call(sagas.handleFailedResponse))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.deep.equal(true)
        })

        test('should handle two step response', () => {
          const gen = sagas.loginSaga({payload})
          expect(gen.next().value).to.eql(put(setPending(true)))
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, payload))
          const response = {
            success: false,
            TWOSTEPLOGIN: true
          }
          expect(gen.next(response).value).to.eql(put(changePage(Pages.LOGIN_FORM)))
          expect(gen.next().value).to.eql(call(sagas.handleTwoStepLoginResponse, response))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.eql(true)
        })

        test('should handle password reset response', () => {
          const gen = sagas.loginSaga({payload})
          expect(gen.next().value).to.eql(put(setPending(true)))
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, payload))
          const response = {
            success: false,
            RESET_PASSWORD_REQUIRED: true
          }
          expect(gen.next(response).value).to.eql(put(changePage(Pages.LOGIN_FORM)))
          expect(gen.next().value).to.eql(call(sagas.handlePasswordUpdateResponse))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.eql(true)
        })

        test('should handle one till block response', () => {
          const gen = sagas.loginSaga({payload})
          expect(gen.next().value).to.eql(put(setPending(true)))
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, payload))
          const response = {
            success: false,
            ONE_TILL_BLOCK: true
          }
          expect(gen.next(response).value).to.eql(put(changePage(Pages.LOGIN_FORM)))
          expect(gen.next().value).to.eql(call(sagas.handleOneTilLBlockResponse))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.eql(true)
        })

        test('should handle login blocked response', () => {
          const gen = sagas.loginSaga({payload})
          expect(gen.next().value).to.eql(put(setPending(true)))
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, payload))
          const response = {
            success: false,
            LOGIN_BLOCKED: true
          }
          expect(gen.next(response).value).to.eql(put(changePage(Pages.LOGIN_FORM)))
          expect(gen.next().value).to.eql(call(sagas.handleBlockResponse))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.eql(true)
        })
      })

      describe('handleSuccessfulLogin', () => {
        test('should call external event with timeout of reponse body', () => {
          const gen = sagas.handleSuccessfulLogin({timeout: 33})
          expect(gen.next().value).to.eql(put(externalEvents.fireExternalEvent('loginSuccess', {timeout: 33})))
          expect(gen.next().value).to.deep.equal(call(cache.clear))
          expect(gen.next().value).to.deep.equal(put(setPassword('')))
          expect(gen.next().done).to.deep.equal(true)
        })

        test('should call external event with default timeout if none in body', () => {
          const gen = sagas.handleSuccessfulLogin({})
          expect(gen.next().value).to.eql(
            put(externalEvents.fireExternalEvent('loginSuccess', {timeout: sagas.DEFAULT_TIMEOUT}))
          )
          expect(gen.next().value).to.deep.equal(call(cache.clear))
          expect(gen.next().value).to.deep.equal(put(setPassword('')))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleTwoStepLoginResponse', () => {
        test('should dispatch actions `setRequestedCode` and `changePage`', () => {
          const gen = sagas.handleTwoStepLoginResponse({
            REQUESTEDCODE: 'code'
          })
          expect(gen.next().value).to.deep.equal(put(setRequestedCode('code')))
          expect(gen.next().value).to.deep.equal(put(changePage('TWOSTEPLOGIN')))
          expect(gen.next().done).to.deep.equal(true)
        })

        test('should dispatch action changePage', () => {
          const gen = sagas.handlePasswordUpdateResponse()
          expect(gen.next().value).to.deep.equal(select(sagas.loginSelector))

          const login = {
            username: 'user1',
            password: 'pwd1'
          }

          expect(gen.next(login).value).to.deep.equal(put(updateOldPassword(login.password)))
          expect(gen.next().value).to.deep.equal(put(setUsername(login.username)))
          expect(gen.next().value).to.deep.equal(put(setForcedUpdate(true)))
          expect(gen.next().value).to.deep.equal(put(changePage('PASSWORD_UPDATE')))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleOneTilLBlockResponse', () => {
        test('should dispatch action setMessage', () => {
          const gen = sagas.handleOneTilLBlockResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector, 'client.login.form.lastTry'))
          expect(gen.next('msg').value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleBlockResponse', () => {
        test('should dispatch action setMessage', () => {
          const gen = sagas.handleBlockResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector, 'client.login.form.blocked'))
          expect(gen.next('msg').value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleFailedResponse', () => {
        test('should dispatch action setMessage', () => {
          const gen = sagas.handleFailedResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector, 'client.login.form.failed'))
          expect(gen.next('msg').value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('checkSessionSaga', () => {
        test('should call handleSuccessfulLogin on success', () => {
          const gen = sagas.checkSessionSaga()
          expect(gen.next().value).to.deep.equal(call(sagas.doSessionRequest))
          const response = {success: true}
          expect(gen.next(response).value).to.deep.equal(call(sagas.handleSuccessfulLogin, response))
          expect(gen.next().done).to.deep.equal(true)
        })

        test('should do nothing if not success', () => {
          const gen = sagas.checkSessionSaga()
          expect(gen.next().value).to.deep.equal(call(sagas.doSessionRequest))
          const response = {success: false}
          expect(gen.next(response).done).to.deep.equal(true)
        })
      })
    })
  })
})

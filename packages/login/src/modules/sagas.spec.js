import {takeLatest, put, select, call, fork, all} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {externalEvents} from 'tocco-util'

import {changePage, setPassword} from './login/actions'
import {setMessage, setPending} from './loginForm/actions'
import {setRequestedCode} from './twoStepLogin/actions'
import {updateOldPassword} from './passwordUpdate/password/actions'
import {setUsername} from './passwordUpdate/dialog/actions'
import {Pages} from '../types/Pages'

describe('login', () => {
  describe('modules', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        it('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal(all([
            fork(takeLatest, actions.LOGIN, sagas.loginSaga),
            fork(takeLatest, actions.CHECK_SESSION, sagas.checkSessionSaga)
          ]))
          expect(generator.next().done).to.equal(true)
        })
      })

      describe('loginSaga', () => {
        it('should handle successful login', () => {
          const gen = sagas.loginSaga({payload: {}})
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, {}))
          const response = {success: true}
          expect(gen.next(response).value).to.eql(call(sagas.handleSuccessfulLogin, response))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('should handle unsuccessful login', () => {
          const gen = sagas.loginSaga({payload: {}})
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, {}))
          const response = {success: false}
          expect(gen.next(response).value).to.eql(put(changePage(Pages.LOGIN_FORM)))
          expect(gen.next().value).to.eql(call(sagas.handleFailedResponse))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('should handle two step response', () => {
          const gen = sagas.loginSaga({payload: {}})
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, {}))
          const response = {
            success: false,
            TWOSTEPLOGIN: true
          }
          expect(gen.next(response).value).to.eql(put(changePage(Pages.LOGIN_FORM)))
          expect(gen.next().value).to.eql(call(sagas.handleTwoStepLoginResponse, response))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.eql(true)
        })

        it('should handle password reset response', () => {
          const gen = sagas.loginSaga({payload: {}})
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, {}))
          const response = {
            success: false,
            RESET_PASSWORD_REQUIRED: true
          }
          expect(gen.next(response).value).to.eql(put(changePage(Pages.LOGIN_FORM)))
          expect(gen.next().value).to.eql(call(sagas.handlePasswordUpdateResponse))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.eql(true)
        })

        it('should handle one till block response', () => {
          const gen = sagas.loginSaga({payload: {}})
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, {}))
          const response = {
            success: false,
            ONE_TILL_BLOCK: true
          }
          expect(gen.next(response).value).to.eql(put(changePage(Pages.LOGIN_FORM)))
          expect(gen.next().value).to.eql(call(sagas.handleOneTilLBlockResponse))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.eql(true)
        })

        it('should handle login blocked response', () => {
          const gen = sagas.loginSaga({payload: {}})
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, {}))
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
        it('should call external event with timeout of reponse body', () => {
          const gen = sagas.handleSuccessfulLogin({timeout: 33})
          expect(gen.next().value).to.eql(put(externalEvents.fireExternalEvent('loginSuccess', {timeout: 33})))
          expect(gen.next().value).to.deep.equal(put(setPassword('')))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('should call external event with default timeout if none in body', () => {
          const gen = sagas.handleSuccessfulLogin({})
          expect(gen.next().value).to.eql(
            put(externalEvents.fireExternalEvent('loginSuccess', {timeout: sagas.DEFAULT_TIMEOUT}))
          )
          expect(gen.next().value).to.deep.equal(put(setPassword('')))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleTwoStepLoginResponse', () => {
        it('should dispatch actions `setRequestedCode` and `changePage`', () => {
          const gen = sagas.handleTwoStepLoginResponse({
            REQUESTEDCODE: 'code'
          })
          expect(gen.next().value).to.deep.equal(put(setRequestedCode('code')))
          expect(gen.next().value).to.deep.equal(put(changePage('TWOSTEPLOGIN')))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('should dispatch action changePage', () => {
          const gen = sagas.handlePasswordUpdateResponse()
          expect(gen.next().value).to.deep.equal(select(sagas.loginSelector))

          const login = {
            username: 'user1',
            password: 'pwd1'
          }

          expect(gen.next(login).value).to.deep.equal(put(updateOldPassword(login.password)))
          expect(gen.next().value).to.deep.equal(put(setUsername(login.username)))
          expect(gen.next().value).to.deep.equal(put(changePage('PASSWORD_UPDATE')))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleOneTilLBlockResponse', () => {
        it('should dispatch action setMessage', () => {
          const gen = sagas.handleOneTilLBlockResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector, 'client.login.form.lastTry'))
          expect(gen.next('msg').value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleBlockResponse', () => {
        it('should dispatch action setMessage', () => {
          const gen = sagas.handleBlockResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector, 'client.login.form.blocked'))
          expect(gen.next('msg').value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleFailedResponse', () => {
        it('should dispatch action setMessage', () => {
          const gen = sagas.handleFailedResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector, 'client.login.form.failed'))
          expect(gen.next('msg').value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('checkSessionSaga', () => {
        it('should call handleSuccessfulLogin on success', () => {
          const gen = sagas.checkSessionSaga()
          expect(gen.next().value).to.deep.equal(call(sagas.doSessionRequest))
          const response = {success: true}
          expect(gen.next(response).value).to.deep.equal(call(sagas.handleSuccessfulLogin, response))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('should do nothing if not success', () => {
          const gen = sagas.checkSessionSaga()
          expect(gen.next().value).to.deep.equal(call(sagas.doSessionRequest))
          const response = {success: false}
          expect(gen.next(response).done).to.deep.equal(true)
        })
      })
    })
  })
})

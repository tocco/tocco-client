import {takeLatest} from 'redux-saga'
import {put, select, call, fork} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {ExternalEvents} from 'tocco-util'
import {changePage} from './login/actions'
import {setMessage, setPending} from './loginForm/actions'
import {setRequestedCode} from './twoStepLogin/actions'
import {Pages} from '../types/Pages'

describe('login', () => {
  describe('modules', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        it('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal([
            fork(takeLatest, actions.LOGIN, sagas.loginSaga),
            fork(takeLatest, actions.CHECK_SESSION, sagas.checkSessionSaga)
          ])
          expect(generator.next().done).to.equal(true)
        })
      })

      describe('loginSaga', () => {
        it('should handle successful login', () => {
          const gen = sagas.loginSaga({payload: {}})
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, {}))
          expect(gen.next(new Response()).value).to.eql(call(sagas.getBody, new Response()))
          const body = {success: true}
          expect(gen.next(body).value).to.eql(call(sagas.handleSuccessfulLogin, body))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('should handle unsuccessful login', () => {
          const gen = sagas.loginSaga({payload: {}})
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, {}))
          expect(gen.next(new Response()).value).to.eql(call(sagas.getBody, new Response()))
          const body = {success: false}
          expect(gen.next(body).value).to.deep.equal(put(changePage(Pages.LOGIN_FORM)))
          expect(gen.next(new Response()).value).to.eql(call(sagas.handleFailedResponse, body))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleSuccessfulLogin', () => {
        it('should call external event with timeout of reponse body', () => {
          const gen = sagas.handleSuccessfulLogin({timeout: 33})
          expect(gen.next().value).to.eql(call(ExternalEvents.invokeExternalEvent, 'successfullyLogin', {timeout: 33}))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('should call external event with default timeout if none in body', () => {
          const gen = sagas.handleSuccessfulLogin({})
          expect(gen.next().value).to.eql(call(ExternalEvents.invokeExternalEvent, 'successfullyLogin', {timeout: sagas.DEFAULT_TIMEOUT}))
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
          const gen = sagas.handlePasswordUpdateResponse({})
          expect(gen.next().value).to.deep.equal(put(changePage('PASSWORD_UPDATE')))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleOneTilLBlockResponse', () => {
        it('should dispatch action setMessage', () => {
          const gen = sagas.handleOneTilLBlockResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector))
          expect(gen.next({'client.login.form.lastTry': 'msg'}).value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleBlockResponse', () => {
        it('should dispatch action setMessage', () => {
          const gen = sagas.handleBlockResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector))
          expect(gen.next({'client.login.form.blocked': 'msg'}).value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })

      describe('handleFailedResponse', () => {
        it('should dispatch action setMessage', () => {
          const gen = sagas.handleFailedResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector))
          expect(gen.next({'client.login.form.failed': 'msg'}).value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })
    })
  })
})

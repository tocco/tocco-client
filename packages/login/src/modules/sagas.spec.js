import {put, select, call} from 'redux-saga/effects'
import * as sagas from './sagas'
import {changePage} from './login/actions'
import {setMessage, setPending} from './loginForm/actions'
import {setRequestedCode} from './twoStepLogin/actions'

describe('login', () => {
  describe('modules', () => {
    describe('login', () => {
      describe('sagas', () => {
        it('loginSaga: handle successfully login', () => {
          const gen = sagas.loginSaga({payload: {}})
          expect(gen.next().value).to.eql(call(sagas.doLoginRequest, {}))
          expect(gen.next(new Response()).value).to.eql(call(sagas.getBody, new Response()))
          var body = {success: true}
          expect(gen.next(body).value).to.eql(call(sagas.handleSuccessfullLogin))
          expect(gen.next().value).to.eql(put(setPending(false)))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('handleTwoStepLoginResponse: should dispatch actions `setRequestedCode` and `changePage`', () => {
          const gen = sagas.handleTwoStepLoginResponse({
            REQUESTEDCODE: 'code'
          })
          expect(gen.next().value).to.deep.equal(put(setRequestedCode('code')))
          expect(gen.next().value).to.deep.equal(put(changePage('TWOSTEPLOGIN')))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('handlePasswordUpdateResponse: should dispatch action changePage', () => {
          const gen = sagas.handlePasswordUpdateResponse({})
          expect(gen.next().value).to.deep.equal(put(changePage('PASSWORD_UPDATE')))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('handleOneTilLBlockResponse: should dispatch action setMessage', () => {
          const gen = sagas.handleOneTilLBlockResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector))
          expect(gen.next({'client.login.form.lastTry': 'msg'}).value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('handleBlockResponse: should dispatch action setMessage', () => {
          const gen = sagas.handleBlockResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector))
          expect(gen.next({'client.login.form.blocked': 'msg'}).value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })

        it('handleFailedResponse: should dispatch action setMessage', () => {
          const gen = sagas.handleFailedResponse({})
          expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector))
          expect(gen.next({'client.login.form.failed': 'msg'}).value).to.deep.equal(put(setMessage('msg', true)))
          expect(gen.next().done).to.deep.equal(true)
        })
      })
    })
  })
})

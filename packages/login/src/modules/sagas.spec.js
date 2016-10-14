import {put, select} from 'redux-saga/effects'
import * as sagas from './sagas'
import {changePage} from './login/actions'
import {setMessage, setPending} from './loginForm/actions'


describe('action-login', () => {
  describe('module sagas ', () => {
    describe('login', () => {
      it('handleTwoStepLoginResponse: should dispatch action changePage', () => {
        const gen = sagas.handleTwoStepLoginResponse({})
        expect(gen.next().value).to.deep.equal(put(changePage('PASSWORD_REQUEST')))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('handlePasswordUpdateResponse: should dispatch action changePage', () => {
        const gen = sagas.handlePasswordUpdateResponse({})
        expect(gen.next().value).to.deep.equal(put(changePage('PASSWORD_UPDATE')))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('handleOneTilLBlockResponse: should dispatch action setMessage', () => {
        const gen = sagas.handleOneTilLBlockResponse({})
        expect(gen.next().value).to.deep.equal(put(setMessage('1 last try', true)))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('handleBlockResponse: should dispatch action setMessage', () => {
        const gen = sagas.handleBlockResponse({})
        expect(gen.next().value).to.deep.equal(put(setMessage('blocked', true)))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('handleFailedResponse: should dispatch action setMessage', () => {
        const gen = sagas.handleFailedResponse({})
        expect(gen.next().value).to.deep.equal(put(setMessage('FAIL', true)))
        expect(gen.next().done).to.deep.equal(true)
      })
    })
  })
})

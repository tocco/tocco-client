import {rest} from 'tocco-app-extensions'
import {call, put, select, fork, takeLatest, all} from 'redux-saga/effects'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {changePage, setUsername} from '../login/actions'
import {setMessage, setPending} from '../loginForm/actions'
import {Pages} from '../../types/Pages'

export const inputSelector = state => state.input

describe('login', () => {
  describe('modules', () => {
    describe('passwordRequest', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              fork(takeLatest, actions.REQUEST_PASSWORD, sagas.requestPasswordSaga),
              fork(takeLatest, actions.PASSWORD_REQUEST, sagas.passwordRequestSaga)
            ]))
            expect(generator.next().done).to.equal(true)
          })
        })

        describe('requestPasswordSaga', () => {
          test('should request password', () => {
            const generator = sagas.requestPasswordSaga({payload: {username: 'user1'}})
            const textResourceState = {'client.login.from.passwordRequested': 'msg'}
            expect(generator.next().value).to.eql(put(setPending(true)))
            expect(generator.next().value).to.eql(
              call(rest.requestSaga, 'principals/user1/password-reset', {method: 'POST'})
            )
            expect(generator.next().value).to.deep.equal(put(setUsername('user1')))
            expect(generator.next().value).to.deep.equal(select(sagas.textResourceSelector))
            expect(generator.next(textResourceState).value).to.deep.equal(put(setMessage('msg')))
            expect(generator.next().value).to.deep.equal(put(changePage(Pages.LOGIN_FORM)))
            expect(generator.next().value).to.deep.equal(put(setPending(false)))
            expect(generator.next().done).to.equal(true)
          })
        })

        describe('passwordRequestSaga', () => {
          test('should provide username in password request dialog', () => {
            const input = {payload: {passwordRequest: true}}
            const gen = sagas.passwordRequestSaga(input)

            expect(gen.next(input).value).to.eql(put(changePage(Pages.PASSWORD_REQUEST)))
            expect(gen.next().done).to.eql(true)
          })
          test('should do nothing if no usernameRequest is defined', () => {
            const input = {payload: {passwordRequest: false}}
            const gen = sagas.passwordRequestSaga(input)
            expect(gen.next().done).to.eql(true)
          })
        })
      })
    })
  })
})

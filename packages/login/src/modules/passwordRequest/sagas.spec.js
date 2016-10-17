import {call, put} from 'redux-saga/effects'
import * as sagas from './sagas'
import {changePage, setUsername} from '../login/actions'
import {setMessage} from '../loginForm/actions'
import {Pages} from '../../types/Pages'

describe('login', () => {
  describe('modules', () => {
    describe('passwordRequest', () => {
      describe('sagas', () => {
        it('should ...', () => {
          const generator = sagas.requestPasswordSaga({payload: {username: 'user1'}})
          const textResourceState = {'client.login.from.passwordRequested': 'msg'}
          expect(generator.next().value).to.eql(call(sagas.doRequest, 'user1'))
          expect(generator.next().value).to.deep.equal(put(setUsername('user1')))
          expect(generator.next().value).to.deep.equal(select(sagas.textResourceSelector))
          expect(generator.next(textResourceState).value).to.deep.equal(put(setMessage('msg')))
          expect(generator.next().value).to.deep.equal(put(changePage(Pages.LOGIN_FORM)))
          expect(generator.next().done).to.equal(true)
        })
      })
    })
  })
})

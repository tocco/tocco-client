import {takeLatest, put, call, all} from 'redux-saga/effects'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {loginSaga} from '../sagas'
import {setPending} from '../loginForm/actions'

describe('login', () => {
  describe('modules', () => {
    describe('twoStepLogin', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              takeLatest(actions.TWOSTEPLOGIN, sagas.twoStepSaga)
            ]))
            expect(generator.next().done).to.equal(true)
          })
        })

        describe('twoStep saga', () => {
          test('should set pending and call login saga', () => {
            const generator = sagas.twoStepSaga()
            const args = undefined
            expect(generator.next().value).to.eql(put(setPending(true)))
            expect(generator.next().value).to.eql(call(loginSaga, args))
            expect(generator.next().done).to.equal(true)
          })
        })
      })
    })
  })
})

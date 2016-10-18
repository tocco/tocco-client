import {takeLatest} from 'redux-saga'
import {fork} from 'redux-saga/effects'
import * as actions from './actions'
import sagas from './sagas'
import {loginSaga} from '../sagas'

describe('login', () => {
  describe('modules', () => {
    describe('twoStepLogin', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          it('should fork child sagas', () => {
            const generator = sagas()
            expect(generator.next().value).to.deep.equal([fork(takeLatest, actions.TWOSTEPLOGIN, loginSaga)])
            expect(generator.next().done).to.equal(true)
          })
        })
      })
    })
  })
})

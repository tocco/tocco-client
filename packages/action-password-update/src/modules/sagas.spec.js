import {fork, call, take} from 'redux-saga/effects'
import sagas, {initializeWatcher} from './sagas'
import * as actions from './actions'
import {ExternalEvents} from 'tocco-util'


describe('action-password-update', () => {
  describe('sagas', () => {
    describe('root saga', () => {
      it('should fork child sagas', () => {
        const generator = sagas()
        expect(generator.next().value).to.deep.equal([fork(initializeWatcher)])
        expect(generator.next().done).to.equal(true)
      })
    })

    describe('initializeWatcher', () => {
      it('should invoke initialized event', () => {
        const generator = initializeWatcher()
        expect(generator.next().value).to.deep.equal(take(actions.INITIALIZED))
        expect(generator.next().value).to.deep.equal(call(ExternalEvents.invokeExternalEvent, 'initialized'))
        expect(generator.next().done).to.equal(true)
      })
    })
  })
})

import {externalEvents} from 'tocco-util'

import sagas, {initializeWatcher} from './sagas'
import * as actions from './actions'

import {fork, put, take, all} from 'redux-saga/effects'

describe('login', () => {
  describe('modules', () => {
    describe('passwordUpdate', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          it('should fork child sagas', () => {
            const generator = sagas()
            expect(generator.next().value).to.deep.equal(all([fork(initializeWatcher)]))
            expect(generator.next().done).to.equal(true)
          })
        })

        describe('initializeWatcher', () => {
          it('should invoke initialized event', () => {
            const generator = initializeWatcher()
            expect(generator.next().value).to.deep.equal(take(actions.INITIALIZED))
            expect(generator.next().value).to.deep.equal(put(externalEvents.fireExternalEvent('resize')))
            expect(generator.next().done).to.equal(true)
          })
        })
      })
    })
  })
})

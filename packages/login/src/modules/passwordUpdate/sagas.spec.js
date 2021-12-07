import {put, takeLatest, all} from 'redux-saga/effects'
import {externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'
import sagas, {resizeWatcher} from './sagas'

describe('login', () => {
  describe('modules', () => {
    describe('passwordUpdate', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should fork child sagas', () => {
            const generator = sagas()
            expect(generator.next().value).to.deep.equal(all([takeLatest(actions.INITIALIZED, resizeWatcher)]))
            expect(generator.next().done).to.equal(true)
          })
        })

        describe('initializeWatcher', () => {
          test('should invoke initialized event', () => {
            const generator = resizeWatcher()
            expect(generator.next().value).to.deep.equal(put(externalEvents.fireExternalEvent('resize')))
            expect(generator.next().done).to.equal(true)
          })
        })
      })
    })
  })
})

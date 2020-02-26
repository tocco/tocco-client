import {takeEvery, all, call} from 'redux-saga/effects'

import {invokeExternalEvent} from './externalEvents'
import rootSaga, * as sagas from './sagas'
import * as actions from './actions'

describe('app-extensions', () => {
  describe('externalEvents', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        test('should handle fire action', () => {
          const events = {
            a: () => {}
          }

          const generator = rootSaga(events)

          expect(generator.next().value).to.deep.equal(
            all([
              takeEvery(actions.FIRE_EXTERNAL_EVENT, sagas.fireExternalEvent, events)
            ])
          )

          expect(generator.next().done).to.be.true
        })
      })

      describe('fireExternalEvent', () => {
        test('should call parentEmitAction with action', () => {
          const events = {
            a: () => {}
          }
          const fireAction = actions.fireExternalEvent('a', 1)

          const generator = sagas.fireExternalEvent(events, fireAction)
          expect(generator.next().value).to.deep.equal(call(invokeExternalEvent, events, 'a', 1))
          expect(generator.next().done).to.be.true
        })
      })
    })
  })
})

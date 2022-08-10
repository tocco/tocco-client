import {takeEvery, all, call, select} from 'redux-saga/effects'

import * as actions from './actions'
import {invokeExternalEvent} from './externalEvents'
import rootSaga, * as sagas from './sagas'

describe('app-extensions', () => {
  describe('externalEvents', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        test('should handle fire action', () => {
          const configSelector = () => ({
            a: () => {}
          })

          const generator = rootSaga(configSelector)

          expect(generator.next().value).to.deep.equal(
            all([takeEvery(actions.FIRE_EXTERNAL_EVENT, sagas.fireExternalEvent, configSelector)])
          )

          expect(generator.next().done).to.be.true
        })
      })

      describe('fireExternalEvent', () => {
        test('should call parentEmitAction with action', () => {
          const events = {
            a: () => {}
          }
          const configSelector = () => events
          const fireAction = actions.fireExternalEvent('a', 1)

          const generator = sagas.fireExternalEvent(configSelector, fireAction)
          expect(generator.next().value).to.deep.equal(select(configSelector))
          expect(generator.next(events).value).to.deep.equal(call(invokeExternalEvent, events, 'a', 1))
          expect(generator.next().done).to.be.true
        })
      })
    })
  })
})

import {expectSaga} from 'redux-saga-test-plan'
import {takeEvery, all} from 'redux-saga/effects'

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
            all([
              takeEvery(actions.FIRE_EXTERNAL_EVENT, sagas.fireExternalEvent, configSelector),
              takeEvery(actions.FIRE_EXTERNAL_EVENT, sagas.fireMappedExternalEvent, configSelector),
              takeEvery(actions.FIRE_STATE_CHANGE_EVENT, sagas.fireStateChangeEvent)
            ])
          )

          expect(generator.next().done).to.be.true
        })
      })

      describe('selectConfig', () => {
        test('return config object for events only', () => {
          const events = {
            a: () => {}
          }
          const configSelector = () => events

          return expectSaga(sagas.selectConfig, configSelector).select(configSelector).returns({events}).run()
        })

        test('return config object as is for events and eventMap', () => {
          const events = {
            a: () => {}
          }
          const configSelector = () => ({events})

          return expectSaga(sagas.selectConfig, configSelector).select(configSelector).returns({events}).run()
        })
      })

      describe('fireExternalEvent', () => {
        test('should call event with action payload', () => {
          const events = {
            a: () => {}
          }
          const configSelector = () => ({events})
          const fireAction = actions.fireExternalEvent('a', 1)

          return expectSaga(sagas.fireExternalEvent, configSelector, fireAction)
            .call(sagas.selectConfig, configSelector)
            .call(invokeExternalEvent, events, 'a', 1)
            .run()
        })

        test('should handle empty config', () => {
          const configSelector = () => ({})
          const fireAction = actions.fireExternalEvent('a', 1)

          return expectSaga(sagas.fireExternalEvent, configSelector, fireAction)
            .call(sagas.selectConfig, configSelector)
            .run()
        })
      })

      describe('fireMappedExternalEvent', () => {
        test('should call event with same action payload', () => {
          const events = {
            a: () => {},
            b: () => {}
          }
          const eventMap = {
            a: 'b'
          }
          const configSelector = () => ({events, eventMap})
          const fireAction = actions.fireExternalEvent('a', 1)

          return expectSaga(sagas.fireMappedExternalEvent, configSelector, fireAction)
            .call(sagas.selectConfig, configSelector)
            .put(actions.fireExternalEvent('b', 1))
            .run()
        })

        test('should call event with custom action payload', () => {
          const events = {
            a: () => {},
            b: () => {}
          }
          const eventMap = {
            a: {
              name: 'b',
              payload: 3
            }
          }
          const configSelector = () => ({events, eventMap})
          const fireAction = actions.fireExternalEvent('a', 1)

          return expectSaga(sagas.fireMappedExternalEvent, configSelector, fireAction)
            .call(sagas.selectConfig, configSelector)
            .put(actions.fireExternalEvent('b', 3))
            .run()
        })

        test('should call event with inherited action payload', () => {
          const events = {
            a: () => {},
            b: () => {}
          }
          const eventMap = {
            a: payload => ({
              name: 'b',
              payload: payload + 1
            })
          }
          const configSelector = () => ({events, eventMap})
          const fireAction = actions.fireExternalEvent('a', 1)

          return expectSaga(sagas.fireMappedExternalEvent, configSelector, fireAction)
            .call(sagas.selectConfig, configSelector)
            .put(actions.fireExternalEvent('b', 2))
            .run()
        })

        test('should not call event when no mapping exists', () => {
          const events = {
            a: () => {},
            b: () => {}
          }
          const configSelector = () => ({events})
          const fireAction = actions.fireExternalEvent('a', 1)

          return expectSaga(sagas.fireMappedExternalEvent, configSelector, fireAction)
            .call(sagas.selectConfig, configSelector)
            .run()
        })
      })

      describe('fireStateChangeEvent', () => {
        test('should call external `onStateChange` event with states', () => {
          const states = ['list']

          const action = actions.fireStateChangeEvent(states)

          return expectSaga(sagas.fireStateChangeEvent, action)
            .put(actions.fireExternalEvent('onStateChange', {states}))
            .run()
        })
      })
    })
  })
})

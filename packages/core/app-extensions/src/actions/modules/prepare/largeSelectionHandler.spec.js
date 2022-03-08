import {channel} from 'redux-saga'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import {CONFIRM} from '../../../notification/modules/interactive/actions'
import largeSelectionHandler, {promptConfirm} from './largeSelectionHandler'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('prepare', () => {
      describe('largeSelectionHandler', () => {
        test('should prompt a confirm when the selection count exceed a threshold', () => {
          const channelMock = channel()
          const definition = {
            showConfirmation: true,
            confirmationThreshold: 100
          }

          return expectSaga(largeSelectionHandler, {}, null, definition, {count: 200})
            .provide([
              {
                call(effect, next) {
                  return effect.fn === channel ? channelMock : next()
                }
              }
            ])
            .put.like({action: {type: CONFIRM}})
            .dispatch(channelMock.put(true))
            .returns({
              abort: false
            })
            .run()
        })
        test('should return abort true on negative answer', () => {
          const channelMock = channel()
          const definition = {
            showConfirmation: true,
            confirmationThreshold: 100
          }

          return expectSaga(largeSelectionHandler, {}, null, definition, {count: 200})
            .provide([
              {
                call(effect, next) {
                  return effect.fn === channel ? channelMock : next()
                }
              }
            ])
            .put.like({action: {type: CONFIRM}})
            .dispatch(channelMock.put(false))
            .returns({
              abort: true
            })
            .run()
        })

        test('should not prompt a confirm if selection is not exceeding the threshold', () => {
          const definition = {
            showConfirmation: true,
            confirmationThreshold: 100
          }
          return expectSaga(largeSelectionHandler, {}, null, definition, {count: 2})
            .not.put.like({action: {type: CONFIRM}})
            .returns({
              abort: false
            })
            .run()
        })

        // eslint-disable-next-line max-len
        test('should consider definition.showConfirmation and definition.confirmationThreshold and call confirm', () => {
          const definition = {
            showConfirmation: true,
            confirmationThreshold: 5
          }
          const selection = {
            count: 6
          }

          return expectSaga(largeSelectionHandler, {}, null, definition, selection)
            .provide([[matchers.call.fn(promptConfirm), false]])
            .call(promptConfirm, selection.count)
            .run()
        })

        // eslint-disable-next-line max-len
        test('should consider definition.showConfirmation and definition.confirmationThreshold and NOT call confirm', () => {
          const definition = {
            showConfirmation: true,
            confirmationThreshold: 110
          }
          const selection = {
            count: 105
          }

          return expectSaga(largeSelectionHandler, {}, null, definition, selection)
            .provide([[matchers.call.fn(promptConfirm), false]])
            .not.call(promptConfirm, selection.count)
            .run()
        })

        // eslint-disable-next-line max-len
        test('should consider definition.showConfirmation and definition.confirmationThreshold never call confirm', () => {
          const definition = {
            showConfirmation: false
          }
          const selection = {
            count: 100000000000
          }

          return expectSaga(largeSelectionHandler, {}, null, definition, selection)
            .provide([[matchers.call.fn(promptConfirm), false]])
            .not.call(promptConfirm, selection.count)
            .run()
        })

        test('should consider definition.showConfirmation but is undefined so never call confirm', () => {
          const definition = {}
          const selection = {
            count: 100000000000
          }

          return expectSaga(largeSelectionHandler, {}, null, definition, selection)
            .provide([[matchers.call.fn(promptConfirm), false]])
            .not.call(promptConfirm, selection.count)
            .run()
        })
      })
    })
  })
})

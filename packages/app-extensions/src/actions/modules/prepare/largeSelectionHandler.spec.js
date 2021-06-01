
import {expectSaga} from 'redux-saga-test-plan'
import {channel} from 'redux-saga'
import * as matchers from 'redux-saga-test-plan/matchers'

import largeSelectionHandler, {promptConfirm} from './largeSelectionHandler'
import {CONFIRM} from '../../../notifier/modules/actions'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('prepare', () => {
      describe('largeSelectionHandler', () => {
        test('should prompt a confirm when the selection count exceed a threshold',
          () => {
            const channelMock = channel()

            return expectSaga(largeSelectionHandler, {}, null, {}, {count: 200})
              .provide([{
                call(effect, next) {
                  return effect.fn === channel ? channelMock : next()
                }
              }])
              .put.like({action: {type: CONFIRM}})
              .dispatch(channelMock.put(true))
              .returns({
                abort: false
              })
              .run()
          })
        test('should return abort true on negative answer',
          () => {
            const channelMock = channel()

            return expectSaga(largeSelectionHandler, {}, null, {}, {count: 200})
              .provide([{
                call(effect, next) {
                  return effect.fn === channel ? channelMock : next()
                }
              }])
              .put.like({action: {type: CONFIRM}})
              .dispatch(channelMock.put(false))
              .returns({
                abort: true
              })
              .run()
          })

        test('should not prompt a confirm if selection is not exceeding the threshold',
          () => {
            return expectSaga(largeSelectionHandler, {}, null, {}, {count: 2})
              .not.put.like({action: {type: CONFIRM}})
              .returns({
                abort: false
              })
              .run()
          })

        test('should consider definition.confirmationThreshold and call confirm',
          () => {
            const definition = {
              confirmationThreshold: 5
            }
            const selection = {
              count: 6
            }

            return expectSaga(largeSelectionHandler, {}, null, definition, selection)
              .provide([
                [matchers.call.fn(promptConfirm), false]
              ])
              .call(promptConfirm, selection.count)
              .run()
          })

        test('should consider definition.confirmationThreshold and NOT call confirm',
          () => {
            const definition = {
              confirmationThreshold: 110
            }
            const selection = {
              count: 105
            }

            return expectSaga(largeSelectionHandler, {}, null, definition, selection)
              .provide([
                [matchers.call.fn(promptConfirm), false]
              ])
              .not.call(promptConfirm, selection.count)
              .run()
          })

        test('should consider definition.confirmationThreshold never call confirm if value is -1',
          () => {
            const definition = {
              confirmationThreshold: -1
            }
            const selection = {
              count: 100000000000
            }

            return expectSaga(largeSelectionHandler, {}, null, definition, selection)
              .provide([
                [matchers.call.fn(promptConfirm), false]
              ])
              .not.call(promptConfirm, selection.count)
              .run()
          })
      })
    })
  })
})

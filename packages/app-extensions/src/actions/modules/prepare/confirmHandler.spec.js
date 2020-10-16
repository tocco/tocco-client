import {expectSaga} from 'redux-saga-test-plan'
import {channel} from 'redux-saga'

import confirmHandler from './confirmHandler'
import {CONFIRM} from '../../../notifier/modules/actions'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('prepare', () => {
      describe('confirmHandler', () => {
        test('should prompt a confirm and return abort false on positive answer',
          () => {
            const response = {
              preCheck: {
                confirmMessage: 'Are you sure?'
              }
            }

            const channelMock = channel()

            return expectSaga(confirmHandler, response)
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
            const response = {
              preCheck: {
                confirmMessage: 'Are you sure?'
              }
            }

            const channelMock = channel()

            return expectSaga(confirmHandler, response)
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

        test('should not prompt a confirm if not asked for',
          () => {
            const response = {
              preCheck: {
                confirmMessage: null
              }
            }

            return expectSaga(confirmHandler, response)
              .not.put.like({action: {type: CONFIRM}})
              .returns({
                abort: false
              })
              .run()
          })
      })
    })
  })
})

import {channel} from 'redux-saga'

import {expectSaga} from 'redux-saga-test-plan'
import confirm from './confirm'
import {CONFIRM} from '../../../notifier/modules/actions'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('preAction', () => {
      describe('confirm', () => {
        describe('shouldRun', () => {
          it('should return true if attribute is set', () => {
            const ids = ['2123']
            expect(confirm.shouldRun({showConfirmMessage: true}, ids)).to.be.true
          })

          it('should return false if attribute is not set or false', () => {
            const ids = ['2123']
            expect(confirm.shouldRun({showConfirmMessage: false}, ids)).to.be.false
            expect(confirm.shouldRun({}, ids)).to.be.false
          })
        })

        describe('run', () => {
          const params = {}
          const ids = ['2123']
          const definition = {}

          const channelMock = channel()

          it('should dispatch confirm and return abort eql false in case of positive answer', () => {
            return expectSaga(confirm.run, params, definition, ids)
              .provide({
                call(effect, next) {
                  return effect.fn === channel ? channelMock : next()
                }
              })
              .put.like({action: {type: CONFIRM}})
              .dispatch(channelMock.put({answer: true}))
              .returns({abort: false})
              .run()
          })

          it('should return abort in case of negative answer', () => {
            return expectSaga(confirm.run, params, definition, ids)
              .provide({
                call(effect, next) {
                  return effect.fn === channel ? channelMock : next()
                }
              })
              .dispatch(channelMock.put({answer: null}))
              .returns({abort: true})
              .run()
          })
        })
      })
    })
  })
})

import {expectSaga} from 'redux-saga-test-plan'

import preCheckHandler from './preCheckHandler'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('prepare', () => {
      describe('preCheckHandler', () => {
        test('should not abort on undefined preCheck', () => {
          const requestResponse = {preCheck: null}

          return expectSaga(preCheckHandler, requestResponse)
            .returns({
              abort: false
            })
            .run()
        })

        test('should not abort on success preCheck', () => {
          return expectSaga(preCheckHandler, {preCheck: {success: true}})
            .returns({
              abort: false
            })
            .run()
        })

        test('should abort on unsuccessful preCheck', () => {
          return expectSaga(preCheckHandler, {preCheck: {success: false, message: 'test'}})
            .returns({
              abort: true,
              abortMessage: 'test'
            })
            .run()
        })
      })
    })
  })
})

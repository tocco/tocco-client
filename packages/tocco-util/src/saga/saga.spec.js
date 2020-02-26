import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import {checkStatusLoop} from './saga'

describe('tocco-util', () => {
  describe('saga', () => {
    const mockRequest = () => {}
    describe('checkReportStatusLoop', () => {
      test('should return response if status is not in_progress', () => {
        const response = {body: {status: 'done'}}

        return expectSaga(checkStatusLoop, mockRequest, 'http://url', 'in_progress')
          .provide([
            [matchers.call.fn(mockRequest), response]
          ])
          .returns(response)
          .run()
      })

      test('should check the status multiple times if still in progress', async() => {
        const response = {body: {status: 'in_progress'}}
        let counter = 0

        const delay = ms => new Promise(function(resolve) {
          setTimeout(() => {
            resolve()
          }, ms)
        })

        await expectSaga(checkStatusLoop, mockRequest, 'http://url', 'in_progress')
          .provide({
            async call(effect) {
              if (effect.fn.name === 'delayP') {
                await delay(effect.args[0])
                return null
              }
              if (effect.fn === mockRequest) {
                ++counter
                return response
              }
            }
          })
          .silentRun(2000)

        expect(counter).to.eql(3)
      })
    })
  })
})

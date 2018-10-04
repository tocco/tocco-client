import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import {requestSaga} from '../rest'
import {checkStatusLoop} from './sagaHelpers'

describe('tocco-util', () => {
  describe('sagaHelpers', () => {
    describe('checkReportStatusLoop', () => {
      test('should return response if status is not in_progress', () => {
        const response = {body: {status: 'done'}}
        return expectSaga(checkStatusLoop, 'http://url', 'in_progress')
          .provide([
            [matchers.call.fn(requestSaga), response]
          ])
          .returns(response)
          .run()
      })

      test('should check the status multiple times if still in progress', async() => {
        const response = {body: {status: 'in_progress'}}
        let counter = 0

        await expectSaga(checkStatusLoop, 'http://url', 'in_progress')
          .provide({
            call(effect) {
              if (effect.fn === requestSaga) {
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

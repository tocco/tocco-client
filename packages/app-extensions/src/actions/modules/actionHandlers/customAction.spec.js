import {expectSaga} from 'redux-saga-test-plan'

import customActionHandler from './customAction'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('actionHandler', () => {
        describe('customAction', () => {
          test('should call custom action from config', () => {
            const definition = {id: 'new'}
            const newActionSpy = sinon.spy()
            const config = {
              customActions: {
                'new': newActionSpy
              }
            }
            return expectSaga(customActionHandler, definition, {}, {}, {}, {}, config)
              .call(newActionSpy)
              .run()
          })

          test('should call custom action from config', () => {
            const definition = {id: 'new'}
            const newActionSpy = sinon.spy()
            const config = {
              customActions: {
                'new': newActionSpy
              }
            }
            return expectSaga(customActionHandler, definition, {}, {}, {}, {}, config)
              .call(newActionSpy)
              .run()
          })
        })
      })
    })
  })
})

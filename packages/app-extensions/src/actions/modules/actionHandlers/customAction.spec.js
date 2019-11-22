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
            const selection = {}
            const parent = {}
            const params = {}
            const config = {
              customActions: {
                new: newActionSpy
              }
            }
            return expectSaga(customActionHandler, definition, selection, parent, params, config)
              .call(newActionSpy, definition, selection, parent, params, config)
              .run()
          })

          test('should run without exception if custom action type is not configured', () => {
            const definition = {id: 'something'}
            const config = {}
            return expectSaga(customActionHandler, definition, {}, {}, {}, config)
              .run()
          })
        })
      })
    })
  })
})

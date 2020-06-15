import React from 'react'
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

          test('should handle custom action with appId and open modal', () => {
            const definition = {id: 'merge', appId: 'merge', fullscreen: false}

            const AppComponent = () => <div>App</div>

            const selection = {}
            const parent = {}
            const params = {}
            const config = {
              appComponent: AppComponent
            }
            return expectSaga(customActionHandler, definition, selection, parent, params, config)
              .put.actionType('notifier/MODAL_COMPONENT')
              .run()
          })

          test('should handle custom action with appId and no componenten ', () => {
            const definition = {id: 'merge', appId: 'merge', fullscreen: false}

            const selection = {}
            const parent = {}
            const params = {}
            const config = {
              appComponent: null
            }
            return expectSaga(customActionHandler, definition, selection, parent, params, config)
              .not.put.actionType('notifier/MODAL_COMPONENT')
              .run()
          })

          test('should handle fullscreen custom action', () => {
            const definition = {id: 'merge', appId: 'merge', fullscreen: true}

            const fullscreenSpy = sinon.spy()
            const selection = {}
            const parent = {}
            const params = {}
            const config = {
              customActions: {
                fullscreen: fullscreenSpy
              }
            }
            return expectSaga(customActionHandler, definition, selection, parent, params, config)
              .call(fullscreenSpy, definition, selection)
              .run()
          })
        })
      })
    })
  })
})

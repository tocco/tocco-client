import {expectSaga} from 'redux-saga-test-plan'
import {consoleLogger} from 'tocco-util'
import * as matchers from 'redux-saga-test-plan/matchers'
import {channel} from 'redux-saga'

import customActionHandler, {
  handleAppActionsFallback,
  handleCustomActionModal,
  handleFullScreenActions
} from './customAction'
import notification from '../../../notification'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      const parent = {}
      const params = {}

      const config = {}
      const selection = {type: 'ID', ids: ['1']}

      describe('actionHandler', () => {
        describe('customAction', () => {
          test('should handleAppActionsFallback if no appId provided', () => {
            const definition = {
              id: 'new',
              appId: null,
              fullscreen: false,
              type: 'custom'
            }

            const handler = () => {}
            const config = {
              customActions: {
                new: handler
              }
            }

            return expectSaga(customActionHandler, definition, selection, parent, params, config)
              .provide([
                [matchers.call.fn(handleAppActionsFallback)]
              ])
              .call(handleAppActionsFallback, {definition, selection, parent, params, config, handler})
              .run()
          })

          test('should logError if app action handler provided', () => {
            const definition = {
              id: 'someAction',
              appId: null,
              fullscreen: false,
              type: 'custom'
            }

            return expectSaga(customActionHandler, definition, selection, parent, params, config)
              .provide([
                [matchers.call.fn(consoleLogger.logError)]
              ])
              .call.like({fn: consoleLogger.logError})
              .run()
          })

          describe('handleAppActionsFallback', () => {
            const definition = {
              id: 'new',
              appId: null,
              fullscreen: false,
              type: 'custom'
            }

            const handler = () => {}
            const config = {
              customActions: {
                new: handler
              }
            }

            test('should return successful true if action returns ok', () => {
              return expectSaga(handleAppActionsFallback, {definition, selection, config, handler})
                .provide([
                  [channel, {}],
                  {
                    take({channel}, next) {
                      return {status: 'ok', message: 'msg'}
                    }
                  }
                ])
                .put.actionType('notification/TOASTER')
                .returns({success: true, remoteEvents: undefined})
                .run()
            })

            test('should skip notification if message not set', () => {
              return expectSaga(handleAppActionsFallback, {definition, selection, config, handler})
                .provide([
                  [channel, {}],
                  {
                    take({channel}, next) {
                      return {status: 'ok', message: null}
                    }
                  }
                ])
                .not.put.actionType('notification/TOASTER')
                .run()
            })

            test('should display default notification if message is "default"', () => {
              return expectSaga(handleAppActionsFallback, {definition, selection, config, handler})
                .provide([
                  [channel, {}],
                  {
                    take({channel}, next) {
                      return {status: 'ok', message: 'default'}
                    }
                  }
                ])
                .put(notification.toaster({type: 'success', title: 'client.component.actions.successDefault'}))
                .run()
            })

            test('should return successful false if action returns not_ok', () => {
              return expectSaga(handleAppActionsFallback, {definition, selection, config, handler})
                .provide([
                  [channel, {}],
                  {
                    take({channel}, next) {
                      return {status: 'not_ok', message: 'msg'}
                    }
                  }
                ])
                .put.actionType('notification/TOASTER')
                .returns({success: false, remoteEvents: undefined})
                .run()
            })

            test('should return null if action was canceled', () => {
              return expectSaga(handleAppActionsFallback, {definition, selection, config, handler})
                .provide([
                  [channel, {}],
                  {
                    take({channel}, next) {
                      return {status: 'cancel', message: 'msg'}
                    }
                  }
                ])
                .not.put.actionType('notification/TOASTER')
                .returns(null)
                .run()
            })
          })

          test('should call handleFullScreenActions for fullscreen apps', () => {
            const definition = {
              id: 'ac1',
              appId: 'delete',
              fullscreen: true,
              type: 'custom'
            }

            const config = {
              customActions: {
                fullscreen: () => {}
              }
            }

            return expectSaga(customActionHandler, definition, selection, parent, params, config)
              .provide([
                [matchers.call.fn(handleFullScreenActions)]
              ])
              .call(handleFullScreenActions, {definition, selection, config})
              .run()
          })

          test('should call handleFullScreenActions for fullscreen apps', () => {
            const definition = {
              id: 'ac1',
              appId: 'delete',
              fullscreen: false,
              type: 'custom'
            }

            const config = {
              appComponent: {
                fullscreen: () => {}
              }
            }

            return expectSaga(customActionHandler, definition, selection, parent, params, config)
              .provide([
                [matchers.call.fn(handleCustomActionModal)]
              ])
              .call(handleCustomActionModal, {definition, selection, config})
              .run()
          })
        })

        describe('handleCustomActionModal', () => {
          const definition = {
            id: 'new',
            appId: null,
            fullscreen: false,
            type: 'custom'
          }

          const handler = () => {}
          const config = {
            customActions: {
              new: handler
            }
          }

          test('should show a INFO if message is set to null', () => {
            return expectSaga(handleCustomActionModal, {definition, selection, config})
              .provide([
                [channel, {}],
                {
                  take({channel}, next) {
                    return {status: 'ok', message: null}
                  }
                }
              ])
              .not.put.actionType('notifier/INFO')
              .returns({success: true, remoteEvents: undefined})
              .run()
          })

          test('should return successful true if modal return ok', () => {
            return expectSaga(handleCustomActionModal, {definition, selection, config})
              .provide([
                [channel, {}],
                {
                  take({channel}, next) {
                    return {status: 'ok', message: 'msg'}
                  }
                }
              ])
              .put.actionType('notification/MODAL')
              .returns({success: true, remoteEvents: undefined})
              .run()
          })

          test('should return successful false if modal return not_ok', () => {
            return expectSaga(handleCustomActionModal, {definition, selection, config})
              .provide([
                [channel, {}],
                {
                  take({channel}, next) {
                    return {status: 'not_ok', message: 'msg'}
                  }
                }
              ])
              .put.actionType('notification/MODAL')
              .returns({success: false, remoteEvents: undefined})
              .run()
          })

          test('should return null if action was canceled', () => {
            return expectSaga(handleCustomActionModal, {definition, selection, config})
              .provide([
                [channel, {}],
                {
                  take({channel}, next) {
                    return {status: 'cancel', message: 'msg'}
                  }
                }
              ])
              .put.actionType('notification/MODAL')
              .returns(null)
              .run()
          })
        })
      })
    })
  })
})

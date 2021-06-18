import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {call, takeEvery} from 'redux-saga/effects'
import * as matchers from 'redux-saga-test-plan/matchers'

import * as sagas from './sagas'
import * as actions from './actions'
import {fetchEntities} from '../../../rest/helpers'
import {loadInitialUnreadNotificationKeys, loadNotifications, markAsRead} from './sagas'
import rest from '../../../rest'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('center', () => {
        describe('sagas', () => {
          describe('main saga', () => {
            test('should fork sagas', () => {
              const saga = testSaga(sagas.default)
              saga.next().all([
                call(loadInitialUnreadNotificationKeys),
                takeEvery(actions.LOAD_NOTIFICATIONS, loadNotifications),
                takeEvery(actions.MARK_AS_READ, markAsRead)
              ])
            })
          })

          describe('loadInitialUnreadNotificationKeys', () => {
            test('loadInitialUnreadNotificationKeys', () => {
              const keys = Array(105).fill().map((_, idx) => idx + 1)
              const resultPage1 = Array(100).fill().map((_, idx) => ({key: idx + 1}))
              const resultPage2 = Array(5).fill().map((_, idx) => ({key: idx + 101}))

              return expectSaga(sagas.loadInitialUnreadNotificationKeys)
                .provide([{
                  call(effect, next) {
                    if (effect.fn === fetchEntities) {
                      if (effect.args[1].page === 1) {
                        return resultPage1
                      } else {
                        return resultPage2
                      }
                    }
                    return next()
                  }
                }])
                .put(actions.setUnreadNotificationKeys(keys))
                .run()
            })
          })

          describe('loadNotifications', () => {
            test('loadNotifications', () => {
              const key = '393'
              const timestamp = '2021-05-05T12:10:02.221Z'
              const originId = 'client__69376f9c-dcc3-4251-bda2-f85702d66fcf'
              const message = 'Die Aktion wurde erfolgreich ausgeführt'
              const type = 'success'
              const username = 'swuersten@tocco.ch'
              const read = true

              const body = {
                data: [{
                  key,
                  timestamp,
                  originId,
                  message,
                  result: '{"type":"ENTITIES","content":[{"key":"13229","model":"User","display":"display"}]}',
                  type,
                  username,
                  read,
                  taskProgress: null
                }]
              }

              const notifications = {
                [key]: {
                  key,
                  timestamp,
                  originId,
                  message,
                  result: {
                    type: 'ENTITIES',
                    content: [{key: '13229', model: 'User', display: 'display'}]
                  },
                  type,
                  username,
                  read,
                  taskProgress: null
                }
              }

              return expectSaga(sagas.loadNotifications, actions.loadNotifications(10))
                .provide([
                  [matchers.call.fn(rest.requestSaga), {body}]
                ])
                .put(actions.isLoadingMoreNotifications(true))
                .put(actions.setMoreNotificationsAvailable(false))
                .put(actions.setNotifications(notifications))
                .run()
            })
          })
        })
      })
    })
  })
})

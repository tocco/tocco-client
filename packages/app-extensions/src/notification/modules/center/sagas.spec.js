import {expectSaga, testSaga} from 'redux-saga-test-plan'
import {call, takeEvery} from 'redux-saga/effects'

import * as sagas from './sagas'
import * as actions from './actions'
import {fetchEntities} from '../../../rest/helpers'
import {loadInitialUnreadNotificationKeys, loadNotifications, markAsRead} from './sagas'

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
        })
      })
    })
  })
})

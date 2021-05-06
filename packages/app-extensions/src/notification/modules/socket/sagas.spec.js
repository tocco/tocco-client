import {expectSaga} from 'redux-saga-test-plan'
import {takeEvery, all, call, select} from 'redux-saga/effects'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import * as toasterActions from '../toaster/actions'
import {notificationToToaster, TOASTER_KEY_PREFIX} from './socket'
import {notificationTransform} from '../../api'
import {updateNotification, updateUnreadNotification} from '../center/actions'
import {TOASTER} from '../toaster/actions'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('socket', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('do nothing if accept is false', () => {
            const accept = false
            const generator = rootSaga(accept)

            expect(generator.next().done).to.be.true
          })

          test('should fork child sagas', () => {
            const accept = true
            const generator = rootSaga(accept)

            expect(generator.next().value).to.deep.equal(
              all([
                takeEvery(actions.SOCKET_MESSAGE_RECEIVED, sagas.messageReceived),
                takeEvery(toasterActions.REMOVE_TOASTER, sagas.toasterRemoved),
                call(sagas.connectSocket)
              ])
            )

            expect(generator.next().done).to.be.true
          })
        })
      })

      describe('messageReceived', () => {
        const originId = 'test'
        const data = {
          key: '1',
          read: true,
          originId
        }
        const notification = {
          key: '1',
          read: true,
          type: 'info',
          result: null,
          taskProgress: null,
          originId
        }

        test('same originId', () => {
          return expectSaga(sagas.messageReceived, {payload: {data: data}})
            .provide([
              [select(sagas.notificationSocketSelector), {originId, ignoredToasters: []}]
            ])
            .call(notificationTransform, data)
            .call(notificationToToaster, notification)
            .put.like({action: {type: TOASTER}})
            .put(updateNotification(notification))
            .run()
        })

        test('other originId', () => {
          return expectSaga(sagas.messageReceived, {payload: {data: data}})
            .provide([
              [select(sagas.notificationSocketSelector), {originId: 'other', ignoredToasters: []}]
            ])
            .call(notificationTransform, data)
            .put(updateUnreadNotification(notification.key, notification.read))
            .put(updateNotification(notification))
            .run()
        })
      })

      describe('toasterRemoved', () => {
        test('toasterRemoved', () => {
          const key = `${TOASTER_KEY_PREFIX}1`
          return expectSaga(sagas.toasterRemoved, {payload: {key, manually: true}})
            .put(actions.addIgnoreToaster(key))
            .run()
        })
      })
    })
  })
})

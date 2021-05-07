import {expectSaga} from 'redux-saga-test-plan'
import {takeEvery, all, select} from 'redux-saga/effects'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import actionEmitter from '../../../actionEmitter'
import {emit, removeToaster} from './sagas'
import {TOASTER_KEY_PREFIX} from '../socket/socket'
import {markAsRead} from '../center/actions'
import {notificationsSelector} from '../center/sagas'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('toaster', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should emit actions if not accepted', () => {
            const accept = false
            const generator = rootSaga(accept)

            expect(generator.next().value).to.deep.equal(
              all([
                takeEvery(actions.TOASTER, emit),
                takeEvery(actions.REMOVE_TOASTER, emit)
              ])
            )

            expect(generator.next().done).to.be.true
          })

          test('should removeToaster actions if accepted', () => {
            const accept = true
            const generator = rootSaga(accept)

            expect(generator.next().value).to.deep.equal(
              all([
                takeEvery(actions.REMOVE_TOASTER, removeToaster)
              ])
            )

            expect(generator.next().done).to.be.true
          })
        })
      })

      describe('emit', () => {
        test('should call emitAction', () => {
          const action = actions.removeToaster('1', true)

          return expectSaga(sagas.emit, action)
            .put(actionEmitter.emitAction(action))
            .run()
        })
      })

      describe('removeToaster', () => {
        test('should call markAsRead', () => {
          const key = '1'
          const input = {1: {type: 'success'}}
          return expectSaga(sagas.removeToaster, {payload: {key: `${TOASTER_KEY_PREFIX}${key}`, manually: true}})
            .provide([
              [select(notificationsSelector), input]
            ])
            .put(markAsRead(key))
            .run()
        })
      })
    })
  })
})

import {expectSaga} from 'redux-saga-test-plan'
import {takeEvery, all} from 'redux-saga/effects'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import actionEmitter from '../../../actionEmitter'
import {emit, removeToaster} from './sagas'

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
          return expectSaga(sagas.removeToaster, {payload: {key, manually: true}})
            .put(actions.removeToasterFromStore(key))
            .run()
        })
      })
    })
  })
})

import {expectSaga} from 'redux-saga-test-plan'
import {takeEvery, all} from 'redux-saga/effects'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import actionEmitter from '../../../actionEmitter'
import {emit} from './sagas'

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
                takeEvery(actions.TOASTER, emit)
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
    })
  })
})

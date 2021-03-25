
import {expectSaga} from 'redux-saga-test-plan'
import {takeEvery, all} from 'redux-saga/effects'
import {v4 as uuid} from 'uuid'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import actionEmitter from '../../../actionEmitter'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('blocking', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should emit actions if not accepted', () => {
            const accept = false
            const generator = rootSaga(accept)

            expect(generator.next().value).to.deep.equal(
              all([
                takeEvery(actions.BLOCKING_INFO, sagas.emit),
                takeEvery(actions.REMOVE_BLOCKING_INFO, sagas.emit)
              ])
            )

            expect(generator.next().done).to.be.true
          })
        })
      })
      describe('emit', () => {
        test('should call emitAction', () => {
          const action = actions.removeBlockingInfo(uuid())

          return expectSaga(sagas.emit, action)
            .put(actionEmitter.emitAction(action))
            .run()
        })
      })
    })
  })
})

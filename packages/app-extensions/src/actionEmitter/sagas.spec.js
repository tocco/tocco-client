import {takeEvery, all, call, put} from 'redux-saga/effects'

import rootSaga, * as sagas from './sagas'
import * as actions from './actions'

describe('app-extensions', () => {
  describe('actionEmitter', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        test('should handle emit and dispatch actions', () => {
          const parentEmitAction = () => {}

          const generator = rootSaga(parentEmitAction)

          expect(generator.next().value).to.deep.equal(
            all([
              takeEvery(actions.EMIT_ACTION, sagas.emitAction, parentEmitAction),
              takeEvery(actions.DISPATCH_EMITTED_ACTION, sagas.dispatchAction)
            ])
          )

          expect(generator.next().done).to.be.true
        })
      })

      describe('emitAction', () => {
        test('should call parentEmitAction with action', () => {
          const parentEmitAction = () => {}
          const action = {TYPE: 'ANY_ACTION'}
          const emitAction = actions.emitAction(action)

          const generator = sagas.emitAction(parentEmitAction, emitAction)
          expect(generator.next().value).to.deep.equal(call(parentEmitAction, action))
          expect(generator.next().done).to.be.true
        })

        test('should do nothing if parentEmitAction is undefined', () => {
          const parentEmitAction = undefined
          const action = {TYPE: 'ANY_ACTION'}
          const emitAction = actions.emitAction(action)

          const generator = sagas.emitAction(parentEmitAction, emitAction)
          expect(generator.next().done).to.be.true
        })
      })

      describe('dispatchAction', () => {
        test('should dispatch the action', () => {
          const action = {TYPE: 'ANY_ACTION'}
          const dispatchAction = actions.dispatchEmittedAction(action)

          const generator = sagas.dispatchAction(dispatchAction)
          expect(generator.next().value).to.deep.equal(put(action))
          expect(generator.next().done).to.be.true
        })
      })
    })
  })
})

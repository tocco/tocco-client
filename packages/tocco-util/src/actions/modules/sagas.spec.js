
import {takeEvery, fork, all} from 'redux-saga/effects'
import * as actions from './actions'
import actionHandlers from './actionHandlers'
import preAction from './preActions'

import rootSaga, * as sagas from './sagas'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          it('should handle invokeAction', () => {
            const config = {}
            const generator = rootSaga(config)

            expect(generator.next().value).to.deep.equal(
              all([
                fork(takeEvery, actions.ACTION_INVOKE, sagas.invokeAction, config)
              ])
            )

            expect(generator.next().done).to.be.true
          })
        })

        const config = {}
        const payload = {
          definition: {
            actionType: 'simple',
            componentType: 'action',
            config: {}
          },
          entity: 'User',
          ids: ['2123']
        }

        describe('invokeAction', () => {
          it('should call preAction and call actionHandler if not abort', () => {
            return expectSaga(sagas.invokeAction, config, {payload})
              .provide([
                [matchers.call.fn(preAction.run), {abort: false}]
              ])
              .call.like({ fn: actionHandlers['simple'] })
              .run()
          })
        })

        describe('invokeAction', () => {
          it('should call preAction and call actionHandler if abort returned', () => {
            return expectSaga(sagas.invokeAction, config, {payload})
              .provide([
                [matchers.call.fn(preAction.run), {abort: true}]
              ])
              .not.call.like({ fn: actionHandlers['simple'] })
              .run()
          })
        })
      })
    })
  })
})

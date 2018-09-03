
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import * as actions from './actions'
import actionHandlers from './actionHandlers'
import preAction from './preActions'
import rootSaga, * as sagas from './sagas'

import {takeEvery, fork, all} from 'redux-saga/effects'

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
              .call.like({fn: actionHandlers['simple']})
              .run()
          })

          it('should call preAction and call actionHandler if abort returned', () => {
            return expectSaga(sagas.invokeAction, config, {payload})
              .provide([
                [matchers.call.fn(preAction.run), {abort: true}]
              ])
              .not.call.like({fn: actionHandlers['simple']})
              .run()
          })

          it('should call invoked action after successfull handled action call', () => {
            return expectSaga(sagas.invokeAction, config, {payload})
              .provide([
                [matchers.call.fn(preAction.run), {abort: false}],
                [matchers.call.fn(actionHandlers[payload.definition.actionType]), {success: true}]
              ])
              .put.like({action: {type: actions.ACTION_INVOKED}})
              .run()
          })

          it('should call invoked action after successfull handled action call', () => {
            return expectSaga(sagas.invokeAction, config, {payload})
              .provide([
                [matchers.call.fn(preAction.run), {abort: false}],
                [matchers.call.fn(actionHandlers[payload.definition.actionType]), {success: false}]
              ])
              .not.put.like({action: {type: actions.ACTION_INVOKED}})
              .run()
          })
        })
      })
    })
  })
})

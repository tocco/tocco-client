import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, takeEvery} from 'redux-saga/effects'

import remoteEvents from '../../remoteEvents'
import actionHandlers from './actionHandlers'
import * as actions from './actions'
import prepare from './prepare'
import rootSaga, * as sagas from './sagas'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should handle invokeAction', () => {
            const configSelector = () => {}
            const generator = rootSaga(configSelector)

            expect(generator.next().value).to.deep.equal(
              all([takeEvery(actions.ACTION_INVOKE, sagas.invokeAction, configSelector)])
            )

            expect(generator.next().done).to.be.true
          })
        })

        const configSelector = () => {}
        const payload = {
          definition: {
            actionType: 'simple',
            componentType: 'action',
            config: {}
          },
          selection: {
            type: 'ID',
            ids: ['1', '2']
          }
        }

        describe('invokeAction', () => {
          test('should call preAction and call actionHandler if not abort', () => {
            return expectSaga(sagas.invokeAction, configSelector, {payload})
              .provide([[matchers.call.fn(prepare), {abort: false}]])
              .call.like({fn: actionHandlers.simple})
              .run()
          })

          test('should call preAction and call actionHandler with new selection', () => {
            const newSelection = {
              type: 'ID',
              ids: ['1', '2', '3']
            }
            return expectSaga(sagas.invokeAction, configSelector, {payload})
              .provide([[matchers.call.fn(prepare), {abort: false, selection: newSelection}]])
              .call(actionHandlers.simple, payload.definition, newSelection, undefined, undefined, configSelector())
              .run()
          })

          test('should call preAction and call actionHandler if abort returned', () => {
            return expectSaga(sagas.invokeAction, configSelector, {payload})
              .provide([[matchers.call.fn(prepare), {abort: true}]])
              .not.call.like({fn: actionHandlers.simple})
              .run()
          })

          test('should call invoked action after successfull handled action call', () => {
            return expectSaga(sagas.invokeAction, configSelector, {payload})
              .provide([
                [matchers.call.fn(prepare), {abort: false}],
                [matchers.call.fn(actionHandlers[payload.definition.actionType]), {success: true}]
              ])
              .put.like({action: {type: actions.ACTION_INVOKED}})
              .run()
          })

          test('should call invoked action after successfull handled action call', () => {
            return expectSaga(sagas.invokeAction, configSelector, {payload})
              .provide([
                [matchers.call.fn(prepare), {abort: false}],
                [matchers.call.fn(actionHandlers[payload.definition.actionType]), {success: false}]
              ])
              .not.put.like({action: {type: actions.ACTION_INVOKED}})
              .run()
          })

          test('should dispatch remote events', () => {
            const remoteEvent1 = {
              type: 'entity-create-event',
              payload: {entities: [{entityName: 'User', key: '2332'}]}
            }
            const remoteEvent2 = {
              type: 'entity-update-event',
              payload: {entities: [{entityName: 'User', key: '1'}]}
            }

            const actionResponse = {
              success: true,
              remoteEvents: [remoteEvent1, remoteEvent2]
            }
            return expectSaga(sagas.invokeAction, configSelector, {payload})
              .provide([
                [matchers.call.fn(prepare), {abort: false}],
                [matchers.call.fn(actionHandlers[payload.definition.actionType]), actionResponse]
              ])
              .put(remoteEvents.remoteEvent(remoteEvent1))
              .put(remoteEvents.remoteEvent(remoteEvent2))
              .run()
          })
        })
      })
    })
  })
})

import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {takeEvery, all} from 'redux-saga/effects'

import * as actions from './actions'
import actionHandlers from './actionHandlers'
import preAction from './preActions'
import rootSaga, * as sagas from './sagas'
import remoteEvents from '../../remoteEvents'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should handle invokeAction', () => {
            const config = {}
            const generator = rootSaga(config)

            expect(generator.next().value).to.deep.equal(
              all([
                takeEvery(actions.ACTION_INVOKE, sagas.invokeAction, config)
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
          test('should call preAction and call actionHandler if not abort', () => {
            return expectSaga(sagas.invokeAction, config, {payload})
              .provide([
                [matchers.call.fn(preAction.run), {abort: false}]
              ])
              .call.like({fn: actionHandlers.simple})
              .run()
          })

          test('should call preAction and call actionHandler if abort returned', () => {
            return expectSaga(sagas.invokeAction, config, {payload})
              .provide([
                [matchers.call.fn(preAction.run), {abort: true}]
              ])
              .not.call.like({fn: actionHandlers.simple})
              .run()
          })

          test(
            'should call invoked action after successfull handled action call',
            () => {
              return expectSaga(sagas.invokeAction, config, {payload})
                .provide([
                  [matchers.call.fn(preAction.run), {abort: false}],
                  [matchers.call.fn(actionHandlers[payload.definition.actionType]), {success: true}]
                ])
                .put.like({action: {type: actions.ACTION_INVOKED}})
                .run()
            }
          )

          test(
            'should call invoked action after successfull handled action call',
            () => {
              return expectSaga(sagas.invokeAction, config, {payload})
                .provide([
                  [matchers.call.fn(preAction.run), {abort: false}],
                  [matchers.call.fn(actionHandlers[payload.definition.actionType]), {success: false}]
                ])
                .not.put.like({action: {type: actions.ACTION_INVOKED}})
                .run()
            }
          )

          test(
            'should dispatch remote events',
            () => {
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
              return expectSaga(sagas.invokeAction, config, {payload})
                .provide([
                  [matchers.call.fn(preAction.run), {abort: false}],
                  [matchers.call.fn(actionHandlers[payload.definition.actionType]), actionResponse]
                ])
                .put(remoteEvents.remoteEvent(remoteEvent1))
                .put(remoteEvents.remoteEvent(remoteEvent2))
                .run()
            }
          )
        })
      })
    })
  })
})

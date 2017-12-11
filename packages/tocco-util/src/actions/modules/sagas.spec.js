import {fork, takeEvery, all} from 'redux-saga/effects'
import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import {expectSaga} from 'redux-saga-test-plan'
import {BLOCKING_INFO, REMOVE_BLOCKING_INFO, CONFIRM} from '../../notifier/actions'

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

        describe('invokeAction', () => {
          it('should call notifier and invoke simple action', () => {
            const config = {}
            const payload = {
              definition: {
                type: 'ch.tocco.nice2.model.form.components.action.SimpleAction',
                config: {}
              },
              entity: 'User',
              ids: ['2123']
            }

            return expectSaga(sagas.invokeAction, config, {payload})
              .put.like({action: {type: BLOCKING_INFO}})
              .call.fn(sagas.invokeSimpleAction)
              .put.like({action: {type: REMOVE_BLOCKING_INFO}})
              .run()
          })
        })

        describe('handleConfirm', () => {
          it('should call confirm if true', () => {
            const ids = ['2123']
            const definition = {
              config: {
                confirm: true
              }
            }

            return expectSaga(sagas.handleConfirm, definition, ids)
              .put.like({action: {type: CONFIRM}})
              .run()
          })

          it('should NOT call confirm if absent', () => {
            const ids = ['2123']
            const definition = {
              config: {
              }
            }

            return expectSaga(sagas.handleConfirm, definition, ids)
              .not.put.like({action: {type: CONFIRM}})
              .run()
          })
        })
      })
    })
  })
})

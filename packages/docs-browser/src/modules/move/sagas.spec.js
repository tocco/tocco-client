import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {takeLatest, select} from 'redux-saga/effects'
import {notifier, rest} from 'tocco-app-extensions'

import * as sagas from './sagas'
import * as actions from './actions'

describe('admin', () => {
  describe('routes', () => {
    describe('docs', () => {
      describe('modules', () => {
        describe('move', () => {
          describe('sagas', () => {
            describe('main saga', () => {
              test('should fork sagas', () => {
                const saga = testSaga(sagas.default)
                saga.next().all([
                  takeLatest(actions.MOVE_ELEMENTS, sagas.moveElements)
                ])
              })
            })

            describe('moveElements', () => {
              const payload = {
                target: 'Folder/1',
                selected: [
                  'Folder/2',
                  'Resource/1'
                ]
              }

              const body = {
                targetEntityKey: 'Folder/1',
                selectedEntityKeys: [
                  'Folder/2',
                  'Resource/1'
                ]
              }

              test('moveElements successful', () => {
                return expectSaga(sagas.moveElements, {payload: payload})
                  .provide([
                    [matchers.call.fn(rest.requestSaga), {status: 204}],
                    [matchers.call.fn(sagas.setDone), {}]
                  ])
                  .put(actions.setWaiting(true))
                  .call(rest.requestSaga, 'documents/move', {method: 'POST', acceptedStatusCodes: [400], body: body})
                  .run()
              })

              test('moveElements failed', () => {
                return expectSaga(sagas.moveElements, {payload: payload})
                  .provide([
                    [matchers.call.fn(rest.requestSaga), {status: 400, body: {errorCode: null}}]
                  ])
                  .put(actions.setWaiting(true))
                  .call(rest.requestSaga, 'documents/move', {method: 'POST', acceptedStatusCodes: [400], body: body})
                  .put(actions.setWaiting(false))
                  .put(notifier.info('error',
                    'client.actions.dms-move.failed.title',
                    'client.actions.dms-move.failed.message',
                    'exclamation'))
                  .run()
              })

              test('moveElements failed validation', () => {
                const msg = 'message'
                const response = {
                  errorCode: 'VALIDATION_FAILED',
                  errors: [{model: 'User', entityValidatorErrors: {firstname: [msg, 'message2']}}]
                }
                return expectSaga(sagas.moveElements, {payload: payload})
                  .provide([
                    [matchers.call.fn(rest.requestSaga), {status: 400, body: response}]
                  ])
                  .put(actions.setWaiting(true))
                  .call(rest.requestSaga, 'documents/move', {method: 'POST', acceptedStatusCodes: [400], body: body})
                  .put(actions.setWaiting(false))
                  .put(notifier.info('error', 'client.actions.dms-move.failed.title', msg, 'exclamation'))
                  .run()
              })
            })

            describe('setDone', () => {
              test('setDone', () => {
                const selection = {type: 'IDS', ids: ['1', '3'], entityName: 'Docs_list_item'}
                const onSuccess = jest.fn()
                return expectSaga(sagas.setDone)
                  .provide([
                    [select(sagas.inputSelector), {selection, onSuccess}],
                    [select(sagas.textResourceSelector, 'client.docs-browser.moveSuccessful'), 'move successful']
                  ])
                  .put(actions.close())
                  .run()
                  .then(() => {
                    expect(onSuccess.mock.calls.length).to.eql(1)
                  })
              })
            })
          })
        })
      })
    })
  })
})

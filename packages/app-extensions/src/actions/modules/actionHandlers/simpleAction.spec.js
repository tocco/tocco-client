import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import simpleAction, {validationErrorCompact, invokeRequest} from './simpleAction'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('actionHandler', () => {
        describe('simpleAction', () => {
          describe('simpleAction', () => {
            test('should call notifier and return an remote event', async() => {
              const definition = {}
              const selection = {entityName: 'User'}
              const {returnValue} = await expectSaga(simpleAction, definition, selection)
                .provide([
                  [matchers.call.fn(invokeRequest), {success: true}]
                ])
                .put.actionType('notifier/BLOCKING_INFO')
                .run()

              expect(returnValue.success).to.be.true
              expect(returnValue.remoteEvents).to.have.length(1)
              expect(returnValue.remoteEvents[0]).to.eql(
                {type: 'entity-update-event', payload: {entities: [{entityName: 'User'}]}}
              )
            })
          })

          describe('validationErrorCompact', () => {
            test('should return null on empty array', () => {
              expect(validationErrorCompact([])).to.be.null
            })

            test('should first path error', () => {
              const msg = 'message'
              expect(validationErrorCompact([{model: 'User', paths: {firstname: {firstname: [msg, 'message2']}}}]))
                .to.be.eql(msg)
            })

            test('should return first validator error', () => {
              const msg = 'message'
              expect(validationErrorCompact([{model: 'User', entityValidatorErrors: {firstname: [msg, 'message2']}}]))
                .to.be.eql(msg)
            })

            test('should return first validator error', () => {
              const msg = 'message'
              expect(validationErrorCompact([{model: 'User', entityValidatorErrors: {firstname: [msg, 'message2']}}]))
                .to.be.eql(msg)
            })
          })
        })
      })
    })
  })
})

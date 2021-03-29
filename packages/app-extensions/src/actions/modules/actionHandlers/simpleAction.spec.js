import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {download} from 'tocco-util'

import simpleAction, {invokeRequest} from './simpleAction'
import rest from '../../../rest'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('actionHandler', () => {
        describe('simpleAction', () => {
          describe('simpleAction', () => {
            test('should call notifier and return an remote event', async() => {
              const definition = {}
              const selection = {entityName: 'User'}
              const parent = {}
              const {returnValue} = await expectSaga(simpleAction, definition, selection, parent)
                .provide([
                  [matchers.call.fn(invokeRequest), {success: true}]
                ])
                .put.actionType('notifier/BLOCKING_INFO')
                .run()

              expect(returnValue.success).to.be.true
              expect(returnValue.remoteEvents).to.have.length(1)
              expect(returnValue.remoteEvents[0]).to.eql(
                {type: 'entity-update-event', payload: {entities: [{entityName: 'User'}], parent}}
              )
            })
          })

          test('should try downloading', async() => {
            const definition = {}
            const selection = {entityName: 'User'}
            const parent = {}
            await expectSaga(invokeRequest, definition, selection, parent)
              .provide([
                [matchers.call.fn(rest.requestSaga), {body: {params: {downloadUrl: 'download'}}}],
                [matchers.call.fn(rest.requestBytesSaga), {body: new Blob(['data'])}]
              ])
              .call.like({fn: download.downloadReadableStream})
              .run()
          })
        })
      })
    })
  })
})

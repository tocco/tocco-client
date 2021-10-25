import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {download} from 'tocco-util'

import simpleAction, {invokeRequest, showToaster} from './simpleAction'
import rest from '../../../rest'
import {TOASTER_KEY_PREFIX} from '../../../notification/modules/socket/socket'
import {TOASTER} from '../../../notification/modules/toaster/actions'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('actionHandler', () => {
        describe('simpleAction', () => {
          describe('simpleAction', () => {
            test('should call notification and return an remote event', async() => {
              const definition = {}
              const selection = {entityName: 'User'}
              const parent = {}
              const {returnValue} = await expectSaga(simpleAction, definition, selection, parent)
                .provide([
                  [matchers.call.fn(invokeRequest), {success: true}]
                ])
                .put.actionType('notification/BLOCKING_INFO')
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

          test('showToaster', () => {
            const title = 'rest.action.task.scheduled'
            const notificationKey = '1'
            const key = `${TOASTER_KEY_PREFIX}${notificationKey}`
            const response = {body: {title, notificationKey}}
            const type = 'info'
            return expectSaga(showToaster, response, type)
              .put.like({
                action: {
                  type: TOASTER,
                  payload: {
                    toaster: {
                      type,
                      title,
                      key
                    }
                  }
                }
              })
              .run()
          })
        })
      })
    })
  })
})

import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {channel} from 'redux-saga'
import {v4 as uuid} from 'uuid'

import rest from '../../../rest'
import {MODAL} from '../../../notification/modules/modal/actions'
import reportSaga, {
  awaitSettingsSubmit,
  displayReportSettings
} from './report'
import {invokeActionAsync} from './simpleAction'
import notification from '../../../notification'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('actionHandler', () => {
        describe('report', () => {
          const mockData = {
            definition: {
              reportId: 'test_report'
            },
            entity: 'User',
            ids: [1, 2, 33],
            settingsDefinition: {
              description: {
                name: 'Sample Report'
              },
              customSettings: {
                entity: {
                  name: 'SessionOnlyEntity'
                }
              }
            },
            formValues: {
              customSettings: {someBool: false}
            }
          }

          describe('handler', () => {
            test('should call displayReportSettings and AwaitSettingsSubmit', () => {
              return expectSaga(reportSaga, mockData.definition, mockData.entity, mockData.ids)
                .provide([
                  [matchers.call.fn(displayReportSettings), undefined],
                  [matchers.call.fn(awaitSettingsSubmit), undefined]
                ])
                .call.like({fn: awaitSettingsSubmit})
                .run()
            })
          })

          describe('displayReportSettings', () => {
            test('should open a modal component and returns an id', () => {
              const id = '04d39342-5e87-40eb-bd76-832435ccb147'
              return expectSaga(displayReportSettings, mockData.definition, 'User', ['1', '2'], null)
                .provide([
                  [matchers.call.fn(rest.requestSaga), {body: mockData.settingsDefinition}],
                  [matchers.call.fn(uuid), id]
                ])
                .put.like({action: {type: MODAL}})
                .returns(id)
                .run()
            })
          })

          describe('awaitSettingsSubmit', () => {
            test('should listen to channel and call handleReportGenerations on successful generation response', () => {
              const channelMock = channel()
              const modalId = '04d39342-5e87-40eb-bd76-832435ccb147'
              const definition = {
                reportId: 'test_report',
                endpoint: 'report/generations'
              }
              const params = {
                params: {
                  reportParams: {
                    reportId: mockData.definition.reportId,
                    generalSettings: undefined,
                    recipientSettings: undefined
                  }
                },
                formData: {
                  model: 'SessionOnlyEntity',
                  key: undefined,
                  version: undefined,
                  paths: {
                    someBool: false
                  }
                }
              }

              return expectSaga(awaitSettingsSubmit, mockData.definition, channelMock, modalId, mockData.ids)
                .provide([
                  [matchers.call.fn(rest.requestSaga), {status: 200}]
                ])
                .dispatch(channelMock.put(
                  {formValues: mockData.formValues, settingsDefinition: mockData.settingsDefinition})
                )
                .call(invokeActionAsync, definition, mockData.ids, null, params)
                .put(notification.removeModal(modalId))
                .run()
            })
          })
        })
      })
    })
  })
})

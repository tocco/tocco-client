import {channel} from 'redux-saga'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {v4 as uuid} from 'uuid'

import notification from '../../../notification'
import {MODAL} from '../../../notification/modules/modal/actions'
import rest from '../../../rest'
import reportSaga, {awaitSettingsSubmit, displayReportSettings, generateReportWithoutSettings} from './report'
import {invokeActionAsync} from './simpleAction'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('actionHandler', () => {
        describe('report', () => {
          const mockData = {
            definition: {
              reportId: 'test_report'
            },
            selection: {
              entity: 'User',
              ids: [1, 2, 33]
            },
            settingsDefinition: {
              description: {
                name: 'Sample Report'
              },
              customSettings: {
                entity: {
                  name: 'SessionOnlyEntity'
                }
              },
              generalSettings: [
                {
                  id: 'filename',
                  defaultValue: 'Name'
                },
                {
                  id: 'corporateDesign',
                  defaultValue: {
                    key: '1'
                  }
                }
              ]
            },
            formValues: {
              customSettings: {someBool: false}
            }
          }

          describe('handler', () => {
            test('should call displayReportSettings and AwaitSettingsSubmit', () => {
              return expectSaga(reportSaga, mockData.definition, mockData.selection)
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

          describe('generateReportWithoutSettings', () => {
            test('generate a report without opening the modal', () => {
              const definition = {
                reportId: 'test_report',
                endpoint: 'report/generations'
              }
              const params = {
                additionalProperties: {
                  reportId: mockData.definition.reportId,
                  generalSettings: {
                    filename: 'Name',
                    corporateDesign: '1'
                  },
                  recipientSettings: {}
                },
                formData: null
              }

              return expectSaga(generateReportWithoutSettings, mockData.definition, mockData.selection)
                .provide([
                  [matchers.call.fn(rest.requestSaga), {body: mockData.settingsDefinition}],
                  [matchers.call.fn(rest.requestSaga), {status: 200, body: {}}]
                ])
                .call(invokeActionAsync, definition, mockData.selection, null, params)
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
                additionalProperties: {
                  reportId: mockData.definition.reportId,
                  generalSettings: undefined,
                  recipientSettings: undefined
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

              return expectSaga(awaitSettingsSubmit, mockData.definition, channelMock, modalId, mockData.selection)
                .provide([[matchers.call.fn(rest.requestSaga), {status: 200, body: {}}]])
                .dispatch(
                  channelMock.put({formValues: mockData.formValues, settingsDefinition: mockData.settingsDefinition})
                )
                .call(invokeActionAsync, definition, mockData.selection, null, params)
                .put(notification.removeModal(modalId))
                .run()
            })
          })
        })
      })
    })
  })
})

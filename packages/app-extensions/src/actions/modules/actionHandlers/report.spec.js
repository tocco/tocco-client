import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {channel} from 'redux-saga'
import uuid from 'uuid/v4'
import {download, saga as sagaUtil} from 'tocco-util'

import rest from '../../../rest'
import {
  MODAL_COMPONENT,
  REMOVE_MODAL_COMPONENT,
  BLOCKING_INFO,
  REMOVE_BLOCKING_INFO,
  INFO
} from '../../../notifier/modules/actions'
import reportSaga, {
  awaitSettingsSubmit,
  displayReportSettings,
  handleFailedGenerationsRequest, handleFailedReport,
  handleReportGenerations, handleSuccessfulReport
} from './report'
import {submitActions} from '../../utils/report'

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
              }
            },
            settings: {}
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
                .put.like({action: {type: MODAL_COMPONENT}})
                .returns(id)
                .run()
            })
          })

          describe('awaitSettingsSubmit', () => {
            test('should listen to channel and call handleReportGenerations on successful generation response', () => {
              const channelMock = channel()
              const modalId = '04d39342-5e87-40eb-bd76-832435ccb147'
              const generationResponse = {status: 202}
              const submitAction = submitActions.DISPLAY

              return expectSaga(
                awaitSettingsSubmit, mockData.definition, channelMock, modalId, mockData.entity, mockData.ids
              )
                .provide([
                  [matchers.call.fn(rest.requestSaga), generationResponse],
                  [matchers.call.fn(handleReportGenerations), undefined]

                ])
                .dispatch(channelMock.put({values: mockData.settings, submitAction}))
                .call(handleReportGenerations, modalId, generationResponse, submitAction)
                .silentRun()
            })

            test('should call handleFailedGenerationsRequest on 404 response', () => {
              const channelMock = channel()
              const modalId = '04d39342-5e87-40eb-bd76-832435ccb147'
              const generationResponse = {status: 400, body: {message: 'error message'}}
              const submitAction = submitActions.DISPLAY
              return expectSaga(
                awaitSettingsSubmit, mockData.definition, channelMock, modalId, mockData.entity, mockData.ids
              )
                .provide([
                  [matchers.call.fn(rest.requestSaga), generationResponse],
                  [matchers.call.fn(handleReportGenerations), undefined]

                ])
                .dispatch(channelMock.put({values: mockData.settings, submitAction}))
                .call(handleFailedGenerationsRequest, modalId, generationResponse)
                .silentRun()
            })
          })

          describe('handleReportGenerations', () => {
            test('should show blocking info and call handleSuccessfulReport on completed response', () => {
              const modalId = '123'
              const pollUrl = 'http://someurltopoll.ch/'
              const generationResponse = {
                headers: {get: () => pollUrl}
              }
              const submitAction = submitActions.DISPLAY
              const reportStatusResp = {body: {status: 'completed'}}

              return expectSaga(handleReportGenerations, modalId, generationResponse, submitAction)
                .provide([
                  [matchers.call(sagaUtil.checkStatusLoop, rest.requestSaga, pollUrl, 'in_progress'), reportStatusResp],
                  [matchers.call.fn(handleSuccessfulReport), undefined]
                ])
                .put.like({action: {type: REMOVE_MODAL_COMPONENT}})
                .put.like({action: {type: BLOCKING_INFO}})
                .put.like({action: {type: REMOVE_BLOCKING_INFO}})
                .call(handleSuccessfulReport, reportStatusResp, submitAction)
                .run()
            })

            test('should show blocking info and call handleFailedReport on error response', () => {
              const modalId = '123'
              const pollUrl = 'http://someurltopoll.ch/'
              const generationResponse = {
                headers: {get: () => pollUrl}
              }
              const reportStatusResp = {body: {reportStatus: 'error'}}

              return expectSaga(handleReportGenerations, modalId, generationResponse)
                .provide([
                  [matchers.call(sagaUtil.checkStatusLoop, rest.requestSaga, pollUrl, 'in_progress'), reportStatusResp],
                  [matchers.call.fn(handleFailedReport), undefined]
                ])
                .put.like({action: {type: BLOCKING_INFO}})
                .put.like({action: {type: REMOVE_BLOCKING_INFO}})
                .call(handleFailedReport)
                .run()
            })
          })

          describe('handleSuccessfulReport', () => {
            const completedResponse = {body: {outputJobId: '33'}}
            const binaryLink = 'http://linktofile/report.pdf'
            const fileName = 'report.pdf'

            const outputJob = {
              paths: {
                document: {
                  value: {
                    value: {
                      fileName,
                      binaryLink
                    }
                  }
                }
              }
            }

            test('should retrieve output job and call downloadUrl with download query param', () => {
              return expectSaga(handleSuccessfulReport, completedResponse, submitActions.DOWNLOAD)
                .provide([
                  [matchers.call.fn(rest.fetchEntity), outputJob]
                ])
                .call(download.downloadUrl, binaryLink + '?download=true', fileName)
                .run()
            })

            test('should retrieve output job and call display', () => {
              return expectSaga(handleSuccessfulReport, completedResponse, submitActions.DISPLAY)
                .provide([
                  [matchers.call.fn(rest.fetchEntity), outputJob]
                ])
                .call(download.openUrl, binaryLink)
                .run()
            })
          })

          describe('handleFailedReport', () => {
            test('should show info', () => {
              return expectSaga(handleFailedReport)
                .put.like({action: {type: INFO}})
                .run()
            })
          })

          describe('handleFailedGenerationsRequest', () => {
            test('should show a warning', () => {
              const modalId = '123'
              const generationsResponse = {
                body: {
                  message: 'message'
                }
              }
              return expectSaga(handleFailedGenerationsRequest, modalId, generationsResponse)
                .put.like({action: {type: INFO}})
                .run()
            })
          })
        })
      })
    })
  })
})

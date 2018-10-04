import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {channel} from 'redux-saga'
import uuid from 'uuid/v4'

import {requestSaga} from '../../../rest'
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
import download from '../../../download'
import sagaHelpers from '../../../sagaHelpers'

describe('tocco-util', () => {
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
              return expectSaga(displayReportSettings, mockData.definition, null)
                .provide([
                  [matchers.call.fn(requestSaga), {body: mockData.settingsDefinition}],
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

              return expectSaga(
                awaitSettingsSubmit, mockData.definition, channelMock, modalId, mockData.entity, mockData.ids
              )
                .provide([
                  [matchers.call.fn(requestSaga), generationResponse],
                  [matchers.call.fn(handleReportGenerations), undefined]

                ])
                .dispatch(channelMock.put(mockData.settings))
                .call(handleReportGenerations, modalId, generationResponse)
                .silentRun()
            })

            test('should call handleFailedGenerationsRequest on 404 response', () => {
              const channelMock = channel()
              const modalId = '04d39342-5e87-40eb-bd76-832435ccb147'
              const generationResponse = {status: 400, body: {message: 'error message'}}

              return expectSaga(
                awaitSettingsSubmit, mockData.definition, channelMock, modalId, mockData.entity, mockData.ids
              )
                .provide([
                  [matchers.call.fn(requestSaga), generationResponse],
                  [matchers.call.fn(handleReportGenerations), undefined]

                ])
                .dispatch(channelMock.put(mockData.settings))
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
              const reportStatusResponse = {body: {status: 'completed'}}

              return expectSaga(handleReportGenerations, modalId, generationResponse)
                .provide([
                  [matchers.call(sagaHelpers.checkStatusLoop, pollUrl, 'in_progress'), reportStatusResponse],
                  [matchers.call.fn(handleSuccessfulReport), undefined]
                ])
                .put.like({action: {type: REMOVE_MODAL_COMPONENT}})
                .put.like({action: {type: BLOCKING_INFO}})
                .put.like({action: {type: REMOVE_BLOCKING_INFO}})
                .call(handleSuccessfulReport, reportStatusResponse)
                .run()
            })

            test('should show blocking info and call handleFailedReport on error response', () => {
              const modalId = '123'
              const pollUrl = 'http://someurltopoll.ch/'
              const generationResponse = {
                headers: {get: () => pollUrl}
              }
              const reportStatusResponse = {body: {reportStatus: 'error'}}

              return expectSaga(handleReportGenerations, modalId, generationResponse)
                .provide([
                  [matchers.call(sagaHelpers.checkStatusLoop, pollUrl, 'in_progress'), reportStatusResponse],
                  [matchers.call.fn(handleFailedReport), undefined]
                ])
                .put.like({action: {type: BLOCKING_INFO}})
                .put.like({action: {type: REMOVE_BLOCKING_INFO}})
                .call(handleFailedReport)
                .run()
            })
          })

          describe('handleSuccessfulReport', () => {
            test('should retrieve output job and call downloadUrl', () => {
              const completedResponse = {body: {_links: {result: 'http://someurltogetresult.ch/'}}}
              const binaryLink = 'http://linktofile/report.pdf'
              const fileName = 'report.pdf'

              const outputJob = {
                body: {
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
              }

              return expectSaga(handleSuccessfulReport, completedResponse)
                .provide([
                  [matchers.call.fn(requestSaga), outputJob]
                ])
                .call(download.downloadUrl, binaryLink, fileName)
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

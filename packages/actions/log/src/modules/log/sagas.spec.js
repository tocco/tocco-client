import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {rest, notification} from 'tocco-app-extensions'

import * as actions from './actions'
import * as sagas from './sagas'

describe('log', () => {
  describe('modules', () => {
    describe('log', () => {
      describe('sagas', () => {
        describe('fetchData', () => {
          test('should read FileNames from rest-API', () => {
            const resultData = ['einRichtigLangerName.log', 'nice.log']
            const response = {
              body: {
                fileNames: ['einRichtigLangerName.log', 'nice.log']
              }
            }

            return expectSaga(sagas.fetchData)
              .provide([[matchers.call.fn(rest.simpleRequest), response]])
              .put(actions.setData(resultData))
              .run()
          })

          test('should handle error', () => {
            return expectSaga(sagas.fetchData)
              .provide([[matchers.call.fn(rest.simpleRequest), throwError(new Error('Failed to fetch data'))]])
              .put(actions.setData(null))
              .put(
                notification.toaster({
                  type: 'error',
                  title: 'client.actions.log.error-fetchFileNames.header',
                  body: 'client.actions.log.error-fetchFileNames.body'
                })
              )
              .run()
          })
        })

        describe('fetchFileContent', () => {
          test('should read FileContent from ConditionalString', () => {
            const response = {
              body: {
                fileContent: "Checking index for entity-manager: 'Membership'",
                hostName: 'loho'
              }
            }
            const resultData = {fileContent: "Checking index for entity-manager: 'Membership'", hostName: 'loho'}
            const conditionalString = 'nice.log/1'

            return expectSaga(sagas.fetchFileContent, {payload: {conditionalString}})
              .provide([[matchers.call.fn(rest.simpleRequest), response]])
              .put(actions.setFileContent(resultData))
              .run()
          })

          test('should read FileContent with 0 lines', () => {
            const response = {
              body: {
                fileContent: '',
                hostName: 'loho'
              }
            }
            const resultData = {fileContent: '', hostName: 'loho'}
            const conditionalString = 'nice.log/0'

            return expectSaga(sagas.fetchFileContent, {payload: {conditionalString}})
              .provide([[matchers.call.fn(rest.simpleRequest), response]])
              .put(actions.setFileContent(resultData))
              .run()
          })

          test('should handle error', () => {
            const conditionalString = '/'

            return expectSaga(sagas.fetchFileContent, {payload: {conditionalString}})
              .provide([[matchers.call.fn(rest.simpleRequest), throwError(new Error('Failed to fetch fileContent'))]])
              .put(actions.setFileContent(null))
              .put(
                notification.toaster({
                  type: 'error',
                  title: 'client.actions.log.error.loading-fetchFileContent.header',
                  body: 'client.actions.log.error-fetchFileContent.body'
                })
              )
              .run()
          })
        })
      })
    })
  })
})

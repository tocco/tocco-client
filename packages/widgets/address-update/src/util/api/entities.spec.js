import {SubmissionError} from 'redux-form/es/SubmissionError'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {rest} from 'tocco-app-extensions'

import {fetchAddress, updateAddress} from './entities'

describe('address-updat', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entites', () => {
        describe('updateAddress', () => {
          test('should patch address', () => {
            const widgetConfigKey = '12'
            const entity = {}
            const fieldDefinitions = {}

            const expectedOptions = {
              method: 'PATCH',
              queryParams: {
                _widget_key: widgetConfigKey
              },
              body: entity,
              acceptedErrorCodes: ['VALIDATION_FAILED'],
              acceptedStatusCodes: [409]
            }

            const response = {body: {test: 'hi'}}

            return expectSaga(updateAddress, widgetConfigKey, entity, fieldDefinitions)
              .provide([[matchers.call.fn(rest.requestSaga), response]])
              .call(rest.requestSaga, 'widget/addressUpdate', expectedOptions)
              .returns(response.body)
              .run()
          })

          test('should handle information error', () => {
            const widgetConfigKey = '12'
            const entity = {}
            const fieldDefinitions = {}

            const expectedOptions = {
              method: 'PATCH',
              queryParams: {
                _widget_key: widgetConfigKey
              },
              body: entity,
              acceptedErrorCodes: ['VALIDATION_FAILED'],
              acceptedStatusCodes: [409]
            }

            const response = {status: 409, body: {information: 'not good'}}

            return expectSaga(updateAddress, widgetConfigKey, entity, fieldDefinitions)
              .provide([[matchers.call.fn(rest.requestSaga), response]])
              .call(rest.requestSaga, 'widget/addressUpdate', expectedOptions)
              .throws(rest.InformationError)
              .run()
          })

          test('should handle validation error', () => {
            const widgetConfigKey = '12'
            const entity = {model: 'Address', key: '2'}
            const fieldDefinitions = [{id: 'zip', componentType: 'field', dataType: 'text'}]

            const expectedOptions = {
              method: 'PATCH',
              queryParams: {
                _widget_key: widgetConfigKey
              },
              body: entity,
              acceptedErrorCodes: ['VALIDATION_FAILED'],
              acceptedStatusCodes: [409]
            }

            const response = {
              body: {
                errorCode: 'VALIDATION_FAILED',
                errors: [{model: 'Address', key: '2', paths: {zip: {mandatory: 'mandatory'}}}]
              }
            }

            const expectedErrors = {
              _error: {relatedEntityErrors: []},
              zip: {mandatory: 'mandatory'}
            }

            return expectSaga(updateAddress, widgetConfigKey, entity, fieldDefinitions)
              .provide([[matchers.call.fn(rest.requestSaga), response]])
              .call(rest.requestSaga, 'widget/addressUpdate', expectedOptions)
              .throws(new SubmissionError(expectedErrors))
              .run()
          })
        })

        describe('fetchAddress', () => {
          test('should append widgetConfigKey as query param', () => {
            const widgetConfigKey = '12'
            const query = {
              sorting: [{field: 'firstname', order: 'desc'}]
            }
            const requestQuery = {sort: 'firstname desc'}
            const queryParamQuery = {_sort: 'firstname desc'}

            const expectedOptions = {
              method: 'GET',
              queryParams: {
                ...queryParamQuery,
                _permissions: true,
                _omitLinks: true,
                _widget_key: widgetConfigKey
              }
            }

            const response = {body: {test: 'hi'}}

            return expectSaga(fetchAddress, widgetConfigKey, query)
              .provide([
                [matchers.call(rest.buildRequestQuery, query), requestQuery],
                [matchers.call(rest.requestQueryToUrlParams, requestQuery), queryParamQuery],
                [matchers.call.fn(rest.requestSaga), response]
              ])
              .call(rest.buildRequestQuery, query)
              .call(rest.requestSaga, 'widget/addressUpdate', expectedOptions)
              .returns(response.body)
              .run()
          })
        })
      })
    })
  })
})

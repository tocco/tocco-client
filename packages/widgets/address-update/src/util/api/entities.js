import {SubmissionError} from 'redux-form/es/SubmissionError'
import {call} from 'redux-saga/effects'
import {form, rest} from 'tocco-app-extensions'

export function* updateAddress(widgetConfigKey, entity, fieldDefinitions) {
  const options = {
    method: 'PATCH',
    queryParams: {
      _widget_key: widgetConfigKey
    },
    body: entity,
    acceptedErrorCodes: ['VALIDATION_FAILED'],
    acceptedStatusCodes: [409]
  }

  const resp = yield call(rest.requestSaga, 'widget/addressUpdate', options)

  if (resp.body.errorCode === 'VALIDATION_FAILED') {
    throw new SubmissionError(form.validationErrorToFormError(entity, fieldDefinitions, resp.body.errors))
  }

  if (resp.status === 409 && resp.body.information) {
    throw new rest.InformationError(resp.body.information)
  }

  return resp.body
}

/**
 * Helper to fetch a address of logged in user
 *
 * @param widgetConfigKey {String} key of the widget config
 * @param query {Object} see 'buildRequestQuery' function
 */
export function* fetchAddress(widgetConfigKey, query) {
  const requestQuery = yield call(rest.buildRequestQuery, query)
  const options = {
    method: 'GET',
    queryParams: {
      ...rest.requestQueryToUrlParams(requestQuery),
      _permissions: true,
      _omitLinks: true,
      _widget_key: widgetConfigKey
    }
  }

  const resp = yield call(rest.requestSaga, 'widget/addressUpdate', options)
  return resp.body
}

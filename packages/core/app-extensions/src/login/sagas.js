import {call} from 'redux-saga/effects'
import {consoleLogger, request} from 'tocco-util'

export function doRequest(url, options) {
  return request
    .executeRequest(url, options)
    .then(request.extractBody)
    .catch(e => {
      consoleLogger.logError('Failed to execute request', e)
      return {success: false}
    })
}

export function* doSessionRequest() {
  return yield call(doRequest, 'session', {method: 'POST'})
}

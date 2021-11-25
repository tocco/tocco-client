import {call, put} from 'redux-saga/effects'
import {env, request} from 'tocco-util'

import {sendByteRequest, sendRequest} from './request'
import {handleClientQuestion} from './clientQuestions'
import InformationError from './InformationError'
import notification from '../notification'

export const getParameterString = params => {
  const paramString = Object.keys(params || {})
    .filter(k => !!params[k])
    .sort()
    .map(k => {
      if (Array.isArray(params[k])) {
        const arrayParams = params[k].map(ak => `${encodeURIComponent(k)}=${encodeURIComponent(ak)}`)
        return arrayParams.join('&')
      }
      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
    })
    .join('&')
  if (paramString) {
    return `?${paramString}`
  }
  return ''
}

function* runInformationErrorFallback(error) {
  if (error instanceof InformationError) {
    yield put(notification.toaster({
      type: 'info',
      title: 'client.common.information',
      body: error.message
    }))
  } else {
    throw error
  }
}

/**
 * Fetch a resource.
 *
 * @param resource {String} The URL to fetch.
 * @param options {Object} An object which can contain the following options:
 * - queryParams {Object}
 * - method {String}
 * - body {Object}
 * - acceptedErrorCodes {Array}
 * - acceptedStatusCodes {Array}
 * - backendUrl {String}
 */
export function* requestSaga(resource, options = {}) {
  const requestData = yield call(prepareRequest, resource, options)
  try {
    let response = yield call(
      sendRequest,
      requestData.url,
      requestData.options,
      options.acceptedErrorCodes,
      options.acceptedStatusCodes
    )
    response = yield call(handleClientQuestion, response, requestData, options)
    return response
  } catch (error) {
    yield runInformationErrorFallback(error)
    return {}
  }
}

/**
 * fetches e given url and returns the response as a byte stream, useful for file handling
 *
 * @param resource {String} The URL to fetch.
 * @param options {Object} An object which can contain the following options:
 * - queryParams {Object}
 * - method {String}
 * - body {Object}
 * - acceptedErrorCodes {Array}
 * - acceptedStatusCodes {Array}
 * - backendUrl {String}
 */
export function* requestBytesSaga(resource, options = {}) {
  const requestData = yield call(prepareRequest, resource, options)
  try {
    return yield call(
      sendByteRequest,
      requestData.url,
      requestData.options,
      options.acceptedErrorCodes,
      options.acceptedStatusCodes
    )
  } catch (error) {
    yield runInformationErrorFallback(error)
    return {}
  }
}

/**
 * Send a simple REST request.
 *
 * Caution: Only prefer this function over `requestSaga`, if you can't
 * use the saga. Note that this simple request function does not support
 * things like client questions.
 *
 * @param resource {String} The URL to fetch.
 * @param options {Object} An object which can contain the following options:
 * - queryParams {Object}
 * - method {String}
 * - body {Object}
 * - acceptedErrorCodes {Array}
 * - acceptedStatusCodes {Array}
 * - backendUrl {String}
 *
 * @see requestSaga
 */
export const simpleRequest = (resource, options = {}) => {
  const requestData = prepareRequest(resource, options)
  return sendRequest(requestData.url, requestData.options, options.acceptedErrorCodes, options.acceptedStatusCodes)
}

function prepareRestUrl(backendUrl, resource) {
  if (resource.startsWith('/')) {
    resource = resource.substring(1)
  }

  if (!resource.startsWith('http') && !resource.startsWith('nice2')) {
    return `${backendUrl}/nice2/rest/${resource}`
  }

  return request.prepareUrl(backendUrl, resource)
}

export function prepareRequest(resource, options = {}) {
  const {
    queryParams = {},
    method = 'GET',
    backendUrl = env.getBackendUrl()
  } = options

  const headers = request.prepareHeaders(options)
  if (!headers.has('X-Client-Questions')) {
    headers.set('X-Client-Questions', 'true')
  }
  
  let body = options.body
  if (body && !(body instanceof FormData) && typeof body !== 'string') {
    body = JSON.stringify(body)
  }

  const fetchOptions = {
    method,
    headers,
    credentials: 'include',
    ...(body ? {body} : {})
  }

  const paramString = getParameterString(queryParams)
  const baseUrl = prepareRestUrl(backendUrl, resource)
  const url = `${baseUrl}${paramString}`

  return {
    url,
    options: fetchOptions
  }
}

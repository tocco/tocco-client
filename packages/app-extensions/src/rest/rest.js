import {call, put} from 'redux-saga/effects'
import {originId} from 'tocco-util'

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

export const NULL_BUSINESS_UNIT = '__n-u-l-l__'

let businessUnit = null

export const setBusinessUnit = value => {
  businessUnit = value
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

function getOrCreateHeaders(optionsHeader) {
  if (optionsHeader) {
    if (optionsHeader instanceof Headers) {
      return optionsHeader
    } else if (typeof optionsHeader === 'object') {
      return new Headers(optionsHeader)
    }
  }
  return new Headers()
}

function getBaseUrl(backendUrl, resource) {
  if (resource.startsWith('/')) {
    resource = resource.substring(1)
  }
  if (resource.startsWith('http')) {
    return resource
  } else if (resource.startsWith('nice2')) {
    return `${backendUrl}/${resource}`
  } else {
    return `${backendUrl}/nice2/rest/${resource}`
  }
}

export function prepareRequest(resource, options = {}) {
  const {
    queryParams = {},
    method = 'GET',
    backendUrl = `${__BACKEND_URL__}`
  } = options

  let body = options.body
  const headers = getOrCreateHeaders(options.headers)

  if (!headers.has('Content-Type') && body && !(body instanceof FormData)) {
    if (typeof body === 'string') {
      headers.set('Content-Type', 'text/plain')
    } else {
      headers.set('Content-Type', 'application/json')
      body = JSON.stringify(body)
    }
  }

  if (businessUnit) {
    headers.set('X-Business-Unit', businessUnit)
  }

  headers.set('X-Origin-Id', originId.getOriginId())
  if (!headers.has('X-Client')) {
    headers.set('X-Client', 'client')
  }

  if (!headers.has('X-Client-Questions')) {
    headers.set('X-Client-Questions', 'true')
  }

  const fetchOptions = {
    method,
    headers,
    credentials: 'include',
    ...(body ? {body} : {})
  }

  const paramString = getParameterString(queryParams)
  const baseUrl = getBaseUrl(backendUrl, resource)
  const url = `${baseUrl}${paramString}`

  return {
    url,
    options: fetchOptions
  }
}

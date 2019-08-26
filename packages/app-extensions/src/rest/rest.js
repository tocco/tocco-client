import {call} from 'redux-saga/effects'

import {sendRequest} from './request'
import {handleClientQuestion} from './clientQuestions'

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

let nullBusinessUnit = false

export const setNullBusinessUnit = value => {
  nullBusinessUnit = value
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
  let response = yield call(
    sendRequest,
    requestData.url,
    requestData.options,
    options.acceptedErrorCodes,
    options.acceptedStatusCodes
  )
  response = yield call(handleClientQuestion, response, requestData, options)
  return response
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

export function prepareRequest(resource, options = {}) {
  const {
    queryParams = {},
    method = 'GET',
    backendUrl = `${__BACKEND_URL__}`
  } = options

  let body = options.body
  const headers = {}

  if (body) {
    if (typeof body === 'string') {
      headers['Content-Type'] = 'text/plain'
    } else {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(body)
    }
  }

  if (nullBusinessUnit) {
    headers['X-Business-Unit'] = '__n-u-l-l__'
  }

  const fetchOptions = {
    method,
    headers: new Headers(headers),
    credentials: 'include',
    ...(body ? {body} : {})
  }

  const paramString = getParameterString(queryParams)

  const baseUrl = resource.startsWith('http')
    ? resource : `${backendUrl}/nice2/rest/${resource}`

  const url = `${baseUrl}${paramString}`

  return {
    url,
    options: fetchOptions
  }
}

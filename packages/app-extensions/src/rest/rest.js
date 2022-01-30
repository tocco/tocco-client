import {call, put, select} from 'redux-saga/effects'
import {v4 as uuid} from 'uuid'
import {intl} from 'tocco-util'

import {sendRequest, sendByteRequest} from './request'
import {handleClientQuestion} from './clientQuestions'
import InformationError from './InformationError'
import notifier from '../notifier'

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
    yield put(notifier.info(
      'info',
      'client.common.information',
      error.message,
      null,
      5000
    ))
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
  yield call(setLocale, options)
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
  yield call(setLocale, options)
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

export function* setLocale(options) {
  if (!options.queryParams?.locale) {
    const locale = yield select(intl.localeSelector)
    options.queryParams = {
      ...options.queryParams,
      locale
    }
  }
  return options
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

const originIdName = 'originId'
const originIdPrefix = 'client_'
const getOriginId = () => {
  if (sessionStorage.getItem(originIdName)) {
    return sessionStorage.getItem(originIdName)
  }
  const id = `${originIdPrefix}_${uuid()}`
  sessionStorage.setItem(originIdName, id)
  return id
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
  if (resource.startsWith('http')) {
    return resource
  } else
  if (resource.startsWith('nice2')) {
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

  headers.set('X-Origin-Id', getOriginId())

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

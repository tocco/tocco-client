import {call} from 'redux-saga/effects'

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

const handleError = (response, acceptedErrorCodes, acceptedStatusCodes) => {
  if (!response.ok
    && !acceptedStatusCodes.includes(response.status)
    && !acceptedErrorCodes.includes(response.body.errorCode)) {
    throw new Error(response.statusText)
  }

  return response
}

const extractBody = response => (
  response.json().then(body => {
    const {ok, headers, status, statusText} = response
    return {ok, headers, status, statusText, body: body || {}}
  })
)

/**
 * @deprecated #getRequestSaga should be used, since it allows to put actions or to call other sagas
 */
export const getRequest = (resource, params, acceptedErrorCodes = []) => {
  return request(resource, params, 'GET', undefined, acceptedErrorCodes)
}

export function* getRequestSaga(resource, queryParams, acceptedErrorCodes = []) {
  const options = {
    method: 'GET',
    queryParams,
    acceptedErrorCodes
  }
  return yield call(requestSaga, resource, options)
}

let nullBusinessUnit = false

export const setNullBusinessUnit = value => {
  nullBusinessUnit = value
}

/**
 * @deprecated #requestSaga should be used, since it allows to put actions or to call other sagas
 */
export const request = (resource, queryParams, method, body, acceptedErrorCodes = [], acceptedStatusCodes = []) => {
  const options = {
    queryParams,
    method,
    body,
    acceptedErrorCodes,
    acceptedStatusCodes
  }
  const requestData = prepareRequest(resource, options)
  return sendRequest(requestData.url, requestData.options, options.acceptedErrorCodes, options.acceptedStatusCodes)
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
 */
export function* requestSaga(resource, options = {}) {
  const requestData = yield call(prepareRequest, resource, options)
  return yield call(
    sendRequest,
    requestData.url,
    requestData.options,
    options.acceptedErrorCodes,
    options.acceptedStatusCodes
  )
}

export function prepareRequest(resource, options = {}) {
  const {
    queryParams = {},
    method = 'GET',
    body
  } = options

  const headers = {
    'Content-Type': 'application/json'
  }

  if (nullBusinessUnit) {
    headers['X-Business-Unit'] = '__n-u-l-l__'
  }

  const fetchOptions = {
    method,
    headers: new Headers(headers),
    credentials: 'include'
  }

  if (body) {
    fetchOptions.body = JSON.stringify(body)
  }

  const paramString = getParameterString(queryParams)

  const url = `${__BACKEND_URL__}/nice2/rest/${resource}${paramString}`

  return {
    url,
    options: fetchOptions
  }
}

export function sendRequest(url, options, acceptedErrorCodes, acceptedStatusCodes) {
  return fetch(url, options)
    .then(response => (extractBody(response)))
    .then(response => (handleError(response, acceptedErrorCodes, acceptedStatusCodes)))
    .catch(error => {
      error.message = `REST request error: ${error.message} \n url: ${url}, options: ${JSON.stringify(options)}`
      throw error
    })
}

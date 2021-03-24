import InformationError from './InformationError'

const PRECONDITION_FAILED_STATUS_CODE = 412

const handleError = (response, acceptedErrorCodes = [], acceptedStatusCodes = []) => {
  if (!response.ok
    && !acceptedStatusCodes.includes(response.status)
    && !(response.body && acceptedErrorCodes.includes(response.body.errorCode))) {
    if (response.status === 409 && response.body.information) {
      throw new InformationError(response.body.information)
    } else {
      const msg = `${response.statusText} ${response.body ? response.body.message : ''}`
      throw new Error(msg)
    }
  }

  return response
}

const extractBody = response => {
  const {ok, headers, status, statusText} = response
  const filteredResponse = {ok, headers, status, statusText}
  if (status === 204) {
    return {...filteredResponse, body: null}
  }
  return response.json()
    .then(body => ({...filteredResponse, body}))
    .catch(exception => {
      return {...filteredResponse, body: null}
    })
}

const extractBlobBody = response => {
  const {ok, headers, status, statusText} = response
  const filteredResponse = {ok, headers, status, statusText}
  if (status === 204) {
    return {...filteredResponse, body: null}
  }
  return response.blob()
    .then(body => ({...filteredResponse, body}))
    .catch(() => {
      return {...filteredResponse, body: null}
    })
}

export function sendRequest(url, options, acceptedErrorCodes = [], acceptedStatusCodes = []) {
  if (options.headers
    && options.headers.has('X-Client-Questions')
    && options.headers.get('X-Client-Questions') === 'true') {
    acceptedStatusCodes.push(PRECONDITION_FAILED_STATUS_CODE)
  }

  return fetch(url, options)
    .then(response => (extractBody(response)))
    .then(response => (handleError(response, acceptedErrorCodes, acceptedStatusCodes)))
}

export function sendByteRequest(url, options, acceptedErrorCodes, acceptedStatusCodes) {
  return fetch(url, options)
    .then(response => (extractBlobBody(response)))
    .then(response => (handleError(response, acceptedErrorCodes, acceptedStatusCodes)))
}

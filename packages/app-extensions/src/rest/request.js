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

/**
 * extract the content of a response
 *
 * @param response the response to extract from
 * @param extractor a function that reads the body from a response, json by default
 * @returns an object with the content in the 'body' field and additional status fields
 */
const extractBody = (response, extractor = r => r.json()) => {
  const {ok, headers, status, statusText} = response
  const filteredResponse = {ok, headers, status, statusText}
  if (status === 204) {
    return {...filteredResponse, body: null}
  }
  return extractor(response)
    .then(body => ({...filteredResponse, body}))
    .catch(exception => {
      return {...filteredResponse, body: null}
    })
}

/**
 * reads the content of a response as a Blob
 *
 * @see extractBody
 */
const extractBlobBody = response => {
  return extractBody(response, r => r.blob())
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
    .then(response => extractBlobBody(response))
    .then(response => handleError(response, acceptedErrorCodes, acceptedStatusCodes))
}

import {consoleLogger} from 'tocco-util'

const handleError = (response, acceptedErrorCodes = [], acceptedStatusCodes = []) => {
  if (!response.ok
    && !acceptedStatusCodes.includes(response.status)
    && !(response.body && acceptedErrorCodes.includes(response.body.errorCode))) {
    const msg = `${response.statusText} ${response.body ? response.body.message : ''}`
    throw new Error(msg)
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
      consoleLogger.log('Unable to extract request body', exception, response)
      return {...filteredResponse}
    })
}

export function sendRequest(url, options, acceptedErrorCodes, acceptedStatusCodes) {
  return fetch(url, options)
    .then(response => (extractBody(response)))
    .then(response => (handleError(response, acceptedErrorCodes, acceptedStatusCodes)))
}

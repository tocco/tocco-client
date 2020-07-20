import {consoleLogger} from 'tocco-util'

const handleError = (response, acceptedErrorCodes = [], acceptedStatusCodes = []) => {
  if (!response.ok
    && !acceptedStatusCodes.includes(response.status)
    && !(response.body && acceptedErrorCodes.includes(response.body.errorCode))) {
    throw new Error(response.statusText)
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
    .catch(error => {
      error.message = `REST request error: ${error.message} \n url: ${url}, options: ${JSON.stringify(options)}`
      throw error
    })
}

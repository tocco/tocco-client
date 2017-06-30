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

export function sendRequest(url, options, acceptedErrorCodes, acceptedStatusCodes) {
  return fetch(url, options)
    .then(response => (extractBody(response)))
    .then(response => (handleError(response, acceptedErrorCodes, acceptedStatusCodes)))
    .catch(error => {
      error.message = `REST request error: ${error.message} \n url: ${url}, options: ${JSON.stringify(options)}`
      throw error
    })
}

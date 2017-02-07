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

const handleError = (response, acceptedErrorCodes) => {
  if (!response.ok && !acceptedErrorCodes.includes(response.body.errorCode)) {
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

export const getRequest = (resource, params, acceptedErrorCodes = []) => {
  return request(resource, params, 'GET', undefined, acceptedErrorCodes)
}

export const request = (resource, params, method = 'GET', body, acceptedErrorCodes = []) => {
  const options = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: 'include'
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const paramString = getParameterString(params)

  const url = `${__BACKEND_URL__}/nice2/rest/${resource}${paramString}`
  return fetch(url, options)
    .then(response => (extractBody(response)))
    .then(response => (handleError(response, acceptedErrorCodes)))
    .catch(error => {
      error.message = `REST request error: ${error.message} \n url: ${url}, options: ${JSON.stringify(options)}`
      throw error
    })
}

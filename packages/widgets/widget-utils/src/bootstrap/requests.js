export const executeRequest = (url, options = {}) => {
  const headers = new Headers()
  headers.set('Content-Type', 'application/json')

  const fetchOptions = {
    headers,
    method: 'GET',
    credentials: 'include',
    ...options
  }

  return fetch(url, fetchOptions)
}

export const enhanceExtractedBody = response => {
  const {ok, status} = response
  return response.json().then(body => ({ok, status, body}))
}

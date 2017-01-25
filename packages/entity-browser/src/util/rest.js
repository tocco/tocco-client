export const getParameterString = params => {
  const paramString = Object.keys(params || [])
    .filter(k => !!params[k])
    .sort()
    .map(k => {
      if (Array.isArray(params[k])) {
        const arrayParams = []
        params[k].forEach(ak => {
          arrayParams.push(`${encodeURIComponent(k)}=${encodeURIComponent(ak)}`)
        })
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

export const fetchRequest = (resource, params, method = 'GET', body) => {
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

  return fetch(`${__BACKEND_URL__}/nice2/rest/${resource}${paramString}`, options)
}

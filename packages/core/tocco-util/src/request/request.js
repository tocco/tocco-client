import env from '../env'
import originId from '../originId'

const defaultOptions = {
  method: 'GET',
  credentials: 'include'
}

const getOrCreateHeaders = optionsHeader => {
  if (optionsHeader) {
    if (optionsHeader instanceof Headers) {
      return optionsHeader
    } else if (typeof optionsHeader === 'object') {
      return new Headers(optionsHeader)
    }
  }
  return new Headers()
}

export const prepareHeaders = options => {
  const headers = getOrCreateHeaders(options.headers)
  const body = options.body

  if (!headers.has('Content-Type')) {
    if (typeof body === 'string') {
      headers.set('Content-Type', 'text/plain')
    } else if (!(body instanceof FormData)) {
      headers.set('Content-Type', 'application/json')
    }
  }

  if (!headers.has('X-Origin-Id')) {
    headers.set('X-Origin-Id', originId.getOriginId())
  }

  if (!headers.has('X-Business-Unit') && env.getBusinessUnit()) {
    headers.set('X-Business-Unit', env.getBusinessUnit())
  }

  if (!headers.has('X-Client')) {
    headers.set('X-Client', env.getEmbedType() === 'admin' ? 'client' : 'widget')
  }

  return headers
}

export const prepareUrl = (backendUrl, resource) => {
  if (resource.startsWith('/')) {
    resource = resource.substring(1)
  }

  if (resource.startsWith('http')) {
    return resource
  } else if (resource.startsWith('nice2')) {
    return `${backendUrl}/${resource}`
  } else {
    return `${backendUrl}/nice2/${resource}`
  }
}

export const prepareOptions = options => ({
  ...defaultOptions,
  ...options,
  headers: prepareHeaders(options)
})

export const executeRequest = (resource, options = {}) => {
  const fetchOptions = prepareOptions(options)
  const backendUrl = env.getBackendUrl()
  const url = prepareUrl(backendUrl, resource)

  return fetch(url, fetchOptions)
}

export const extractBody = response => response.json()

export const downloadUrl = (url, fileName) => {
  const a = document.createElement('a')
  a.href = url
  a.download = fileName || url.split('/').pop()
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  if (window.URL.revokeObjectURL) { window.URL.revokeObjectURL(url) }
  if (a.remove) { a.remove() }
}

export const openUrl = url => {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  if (window.URL.revokeObjectURL) { window.URL.revokeObjectURL(url) }
  if (a.remove) { a.remove() }
}

export const downloadSupportedByBrowser = () => {
  const a = document.createElement('a')
  const result = typeof a.download !== 'undefined'
  if (a.remove) { a.remove() }
  return result
}

export const addParameterToURL = (url, param, value) =>
  `${url}${url.indexOf('?') >= 0 ? '&' : '?'}${param}=${value}`

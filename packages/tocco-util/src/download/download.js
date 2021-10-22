export const downloadUrl = (url, fileName) => {
  const a = document.createElement('a')
  a.href = url
  a.download = fileName || url.split('/').pop()
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  if (window.URL.revokeObjectURL) {
    window.URL.revokeObjectURL(url)
  }
  if (a.remove) {
    a.remove()
  }
}

/**
 * download a byte stream as a file with a given filename
 * an example when to use this is an action that streams a file as a response
 *
 * @param readableStream the stream to download
 * @param fileName the filename to use for the downloaded file
 */
export const downloadReadableStream = (readableStream, fileName) => {
  const a = document.createElement('a')
  const url = URL.createObjectURL(readableStream)
  a.href = url
  a.download = fileName
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  if (window.URL.revokeObjectURL) {
    window.URL.revokeObjectURL(url)
  }
  if (a.remove) {
    a.remove()
  }
}

export const openUrl = url => {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  if (window.URL.revokeObjectURL) {
    window.URL.revokeObjectURL(url)
  }
  if (a.remove) {
    a.remove()
  }
}

export const downloadSupportedByBrowser = () => {
  const a = document.createElement('a')
  const result = typeof a.download !== 'undefined'
  if (a.remove) {
    a.remove()
  }
  return result
}

export const getDownloadUrl = binaryLink =>
  addParameterToURL(binaryLink, 'download', true)

export const addParameterToURL = (url, param, value) =>
  `${url}${url && url.indexOf('?') >= 0 ? '&' : '?'}${param}=${value}`

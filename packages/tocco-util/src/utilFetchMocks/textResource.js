export default (fetchMock, textResourceKeys = []) => {
  const result = {}
  textResourceKeys.forEach(key => {
    result[key] = transformKeyToReadableText(key)
  })
  fetchMock.get(new RegExp('^.*?/nice2/textresource'), result)
}

const transformKeyToReadableText = key => {
  const parts = key.split('.')
  const lastPart = parts[parts.length - 1]

  return lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}

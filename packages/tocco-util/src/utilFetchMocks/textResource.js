const textResources = {}

export default (fetchMock, textResourceKeys = []) => {
  textResourceKeys.forEach(key => {
    textResources[key] = transformKeyToReadableText(key)
  })
  fetchMock.get(new RegExp('^.*?/nice2/textresource'), textResources)
}

const transformKeyToReadableText = key => {
  const parts = key.split('.')
  const lastPart = parts[parts.length - 1]

  return lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}

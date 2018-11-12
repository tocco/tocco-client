export const setupTextResources = (packageName, fetchMock, textResourceKeys = []) => {
  textResourceKeys = [...textResourceKeys, ...require('./data/textResources.json')]
  const textResources = {}
  textResourceKeys.forEach(key => {
    textResources[key] = transformKeyToReadableText(key)
  })
  fetchMock.get(new RegExp(`^.*?/nice2/textresource.*\\(${packageName}.*`), textResources)
}

const transformKeyToReadableText = key => {
  const parts = key.split('.')
  const lastPart = parts[parts.length - 1]

  return lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}

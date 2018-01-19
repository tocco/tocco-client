import mockData from '../mockData'

export default (packageName, fetchMock, textResourceKeys = []) => {
  textResourceKeys = [...textResourceKeys, ...mockData.data.textResources]
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

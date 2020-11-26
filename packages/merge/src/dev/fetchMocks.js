import {mockData, consoleLogger} from 'tocco-util'

export default function setupFetchMock(packageName, fetchMock) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/merge/sourceData'),
    (url, opts) => sleep(1000).then(() => {
      consoleLogger.log('called merge/sourceData', url, opts)
      return require('./data/sourceResponse.json')
    })
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/merge/merge'),
    (url, opts) => sleep(1000).then(() => {
      consoleLogger.log('called merge/merge', url, opts)
      return require('./data/mergeResponse.json')
    })
  )

  fetchMock.spy()
}

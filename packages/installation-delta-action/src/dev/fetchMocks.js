import {mockData} from 'tocco-util'

export default function setupFetchMock(packageName, fetchMock) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/tocco/installationDelta(\\?.*)?'),
    require('./test-data/delta')
  )

  fetchMock.spy()
}

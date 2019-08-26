import {mockData} from 'tocco-util'

export default function setupFetchMock(packageName, fetchMock) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Openid_provider.*$'),
    require('./data/openid_provider.json')
  )

  fetchMock.spy()
}

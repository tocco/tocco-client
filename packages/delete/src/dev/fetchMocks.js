import {mockData} from 'tocco-util'

import dialogResponse from './data/dialogResponse.json'

export default function setupFetchMock(packageName, fetchMock) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/client/delete/dialog.*'),
    () => mockData.sleep(2000).then(() => dialogResponse)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/client/delete'),
    () => mockData.sleep(2000).then(() => ({}))
  )

  fetchMock.spy()
}

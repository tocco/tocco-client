import {mockData} from 'tocco-util'
const delay = new Promise(resolve => setTimeout(resolve, 1000))

export default function setupFetchMock(packageName, fetchMock) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  fetchMock.get(
    new RegExp('^.*/nice2/rest/tocco/commit-info/installation/.*'),
    delay.then(() => require('./test-data/delta'))
  )

  fetchMock.spy()
}

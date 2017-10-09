import {utilFetchMocks} from 'tocco-util'

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(fetchMock, require('./textResources.json'))

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/calendarTypes$'),
    require('./data/calendarTypes')
  )

  fetchMock.spy()
}

module.exports = setupFetchMock

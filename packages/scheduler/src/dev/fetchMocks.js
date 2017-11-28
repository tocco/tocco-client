import {utilFetchMocks} from 'tocco-util'

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(fetchMock, require('./textResources.json'))

  fetchMock.spy()
}

module.exports = setupFetchMock

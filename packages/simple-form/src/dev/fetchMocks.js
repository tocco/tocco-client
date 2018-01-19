import {utilFetchMocks, mockData} from 'tocco-util'

const defaultStore = {
  Dummy_entity: mockData.createDummyEntities(100)
}

export default function setupFetchMock(packageName, fetchMock, entityStore = defaultStore) {
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(packageName, fetchMock, require('./textResources.json'))
  mockData.setupFetchMock(fetchMock, entityStore)
  fetchMock.spy()
}

module.exports = setupFetchMock

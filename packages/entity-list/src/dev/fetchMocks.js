import {utilFetchMocks, mockData} from 'tocco-util'

const defaultStore = {
  User: mockData.createUsers(1001),
  Dummy_entity: mockData.createDummyEntities(100)
}

export default function setupFetchMock(packageName, fetchMock, entityStore = defaultStore) {
  utilFetchMocks.log(fetchMock)
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(packageName, fetchMock, require('./textResources.json'))

  mockData.setupFetchMock(fetchMock, entityStore)
}

module.exports = setupFetchMock

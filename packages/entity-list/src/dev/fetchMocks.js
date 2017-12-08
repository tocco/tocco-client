import {utilFetchMocks, mockData, actions} from 'tocco-util'

const defaultStore = {
  User: mockData.createUsers(1001),
  Dummy_entity: mockData.createDummyEntities(100)
}

export default function setupFetchMock(fetchMock, entityStore = defaultStore) {
  utilFetchMocks.log(fetchMock)
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(fetchMock, require('./textResources.json'))
  actions.mock(fetchMock)

  mockData.setupFetchMock(fetchMock, entityStore)
}

module.exports = setupFetchMock

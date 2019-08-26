import {mockData} from 'tocco-util'

const defaultStore = {
  User: mockData.createUsers(1001),
  Dummy_entity: mockData.createDummyEntities(100)
}

export default function setupFetchMock(packageName, fetchMock, entityStore = defaultStore) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))
  mockData.setupFetchMock(fetchMock, entityStore)
}

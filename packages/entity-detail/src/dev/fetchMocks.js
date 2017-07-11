import {utilFetchMocks, mockData} from 'tocco-util'
import {
  createEntityUpdateResponse,
  createValidateResponse
} from './fetchMockHelpers'

const defaultStore = {
  User: mockData.createUsers(1001),
  Dummy_entity: mockData.createDummyEntities(100)
}

export default function setupFetchMock(fetchMock, entityStore = defaultStore) {
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(fetchMock, require('./textResources.json'))

  mockData.setupFetchMock(fetchMock, entityStore)

  fetchMock.patch(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9]+\\?_validate=true'),
    createValidateResponse(entityStore)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9]+(\\?.*)?'),
    createEntityUpdateResponse(entityStore)
  )

  fetchMock.patch(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9]+(\\?.*)?'),
    createEntityUpdateResponse(entityStore)
  )
}

module.exports = setupFetchMock

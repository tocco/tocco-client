import {utilFetchMocks, mockData, actions} from 'tocco-util'
import {
  userUpdateResponse,
  userCreateResponse,
  userValidateResponse,
  dummyEntityValidateResponse,
  dummyEntityCreateResponse,
  documentUploadResponse
} from './fetchMockHelpers'

const defaultStore = {
  User: mockData.createUsers(1001),
  Dummy_entity: mockData.createDummyEntities(100)
}

export default function setupFetchMock(fetchMock, entityStore = defaultStore) {
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(fetchMock, require('./textResources.json'))
  actions.setupFetchMock(fetchMock)
  mockData.setupFetchMock(fetchMock, entityStore)

  fetchMock.patch(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9]+\\?_validate=true'),
    userValidateResponse(entityStore)
  )

  fetchMock.patch(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9]+(\\?.*)?'),
    userUpdateResponse(entityStore)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/User\\?_validate=true'),
    userValidateResponse(entityStore)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/User(\\?.*)?'),
    userCreateResponse(entityStore)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity\\?_validate=true'),
    dummyEntityValidateResponse(entityStore)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity(\\?.*)?'),
    dummyEntityCreateResponse(entityStore)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/upload.*'),
    documentUploadResponse()
  )
}

module.exports = setupFetchMock

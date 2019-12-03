import {mockData} from 'tocco-util'

import {
  userUpdateResponse,
  userCreateResponse,
  userValidateResponse,
  dummyEntityValidateResponse,
  dummyEntityCreateResponse
} from './fetchMockHelpers'

const defaultStore = {
  User: mockData.createUsers(1001),
  Dummy_entity: mockData.createDummyEntities(100)
}

export default function setupFetchMock(packageName, fetchMock, entityStore = defaultStore) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  fetchMock.patch(
    new RegExp('^.*?/nice2/rest/entities/2.0/User/[0-9]+\\?_validate=true'),
    userValidateResponse(entityStore)
  )

  fetchMock.patch(
    new RegExp('^.*?/nice2/rest/entities/2.0/User/[0-9]+(\\?.*)?'),
    userUpdateResponse(entityStore)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/2.0/User\\?_validate=true'),
    userValidateResponse(entityStore)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/2.0/User(\\?.*)?'),
    userCreateResponse(entityStore)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/2.0/Dummy_entity\\?_validate=true'),
    dummyEntityValidateResponse(entityStore)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/2.0/Dummy_entity(\\?.*)?'),
    dummyEntityCreateResponse(entityStore)
  )
}

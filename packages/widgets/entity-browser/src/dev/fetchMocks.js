import _union from 'lodash/union'
import {mockData} from 'tocco-util'

export default function setupFetchMock(packageName, fetchMock) {
  const entityStore = {
    User: mockData.createUsers(909),
    Dummy_entity: mockData.createDummyEntities(90)
  }

  const listFetchMocks = require('tocco-entity-list/src/dev/fetchMocks').default
  listFetchMocks('entity-list', fetchMock, entityStore)

  const detailFetchMocks = require('tocco-entity-detail/src/dev/fetchMocks').default
  detailFetchMocks('entity-detail', fetchMock, entityStore)

  const simpleFormFetchMocks = require('../../../../core/simple-form/src/dev/fetchMocks').default
  simpleFormFetchMocks('simple-form', fetchMock, entityStore)

  mockData.setupSystemMock(
    packageName,
    fetchMock,
    _union(
      require('./textResources.json'),
      require('tocco-entity-detail/src/dev/textResources.json'),
      require('tocco-entity-list/src/dev/textResources.json'),
      require('../../../../core/simple-form/src/dev/textResources.json')
    )
  )
}

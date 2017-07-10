import {utilFetchMocks, mockData} from 'tocco-util'

export default function setupFetchMock(fetchMock) {
  const entityStore = {
    User: mockData.createUsers(909),
    Dummy_entity: mockData.createDummyEntities(90)
  }

  const listFetchMocks = require('tocco-entity-list/src/dev/fetchMocks')
  listFetchMocks(fetchMock, entityStore)

  const detailFetchMocks = require('tocco-entity-detail/src/dev/fetchMocks')
  detailFetchMocks(fetchMock, entityStore)

  utilFetchMocks.textResource(fetchMock, require('./textResources.json'))
}

module.exports = setupFetchMock

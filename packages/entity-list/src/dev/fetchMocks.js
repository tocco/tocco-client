import {utilFetchMocks} from 'tocco-util'

import {
  createEntitiesResponse,
  createCountResponse
} from './fetchMockHelpers'

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.log(fetchMock)
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(fetchMock, require('./textResources.json'))

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_search$'),
    require('./rest-responses/form_user_search.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_list$'),
    require('./rest-responses/form_user_list.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity(\\?.*)?'),
    require('./rest-responses/dummy_entity.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/model$'),
    require('./rest-responses/model_user.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/count(\\?.*)?'),
    createCountResponse
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User(\\?.*)?'),
    createEntitiesResponse
  )

  fetchMock.spy()
}

module.exports = setupFetchMock

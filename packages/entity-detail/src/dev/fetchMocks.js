import {utilFetchMocks} from 'tocco-util'
import {
  createEntityResponse,
  createCountResponse,
  createEntitiesResponse,
  createEntityUpdateResponse,
  createValidateResponse
} from './fetchMockHelpers'

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(fetchMock, require('./textResources.json'))

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/model$'),
    require('./rest-responses/model_user.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity/model$'),
    require('./rest-responses/model_user.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_detail$'),
    require('./rest-responses/form_user_detail.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_detail_relDummySubGrid_list$'),
    require('./rest-responses/form_user_detail_relDummySubGrid_list.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_detail_relDummySubGrid_search$'),
    require('./rest-responses/form_user_detail_relDummySubGrid_search.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9](\\?.*)?'),
    createEntityResponse('user')
  )
  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9](\\?.*)?'),
    createEntityUpdateResponse
  )
  fetchMock.patch(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9]\\?_validate=true'),
    createValidateResponse
  )
  fetchMock.patch(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9](\\?.*)?'),
    createEntityUpdateResponse
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User?.*'),
    createEntitiesResponse('user')
   )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity/count?.*'),
    createCountResponse('dummy')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity/[0-9]?.*'),
    createEntityResponse('dummy')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity?.*'),
    createEntitiesResponse('dummy')
  )

  fetchMock.spy()
}

module.exports = setupFetchMock

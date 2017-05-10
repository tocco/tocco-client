import {utilFetchMocks} from 'tocco-util'

import {
  createValidateResponse,
  createEntitiesResponse,
  createCountResponse,
  createEntityResponse,
  createEntityUpdateResponse
} from './fetchMockHelpers'

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.log(fetchMock)
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(fetchMock, require('./textResources.json'))

  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/User_search'), require('./rest-responses/form_user_search.json'))
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/UserSearch_search'), require('./rest-responses/form_user_search.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/UserSearch_detail'), require('./rest-responses/form_user_detail.json')
  )
  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/User_detail'), require('./rest-responses/form_user_detail.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/User_list'), require('./rest-responses/form_user_list.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/forms/UserSearch_list'), require('./rest-responses/form_user_list.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/Affiliation.*'), require('./rest-responses/affiliation.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User_code1.*'), require('./rest-responses/user_code1.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/Dummy_entity.*'), require('./rest-responses/dummy_entity.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/Gender.*'), require('./rest-responses/gender.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/model.*'), require('./rest-responses/model_user.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/count?.*'), createCountResponse)
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/[0-9]?.*'), createEntityResponse)
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User?.*'), createEntitiesResponse)

  fetchMock.post(new RegExp('^.*?/nice2/rest/entities/User/[0-9]'), createEntityUpdateResponse)
  fetchMock.patch(new RegExp('^.*?/nice2/rest/entities/User/[0-9]\\?_validate=true'), createValidateResponse)
  fetchMock.patch(new RegExp('^.*?/nice2/rest/entities/User/[0-9]'), createEntityUpdateResponse)

  fetchMock.spy()
}

module.exports = setupFetchMock

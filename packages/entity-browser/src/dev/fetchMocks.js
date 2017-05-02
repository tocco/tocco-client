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
  utilFetchMocks.textResource(fetchMock, require('./rest-responses/messages.json'))

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
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/UserSearch_Dummy_entity_detail'),
    require('./rest-responses/form_dummy_entity_detail.json')
  )
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User_code1.*'), require('./rest-responses/user_code1.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/model.*'), require('./rest-responses/model_user.json'))

  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/count?.*'), createCountResponse('user'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/[0-9]?.*'), createEntityResponse('user'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User?.*'), createEntitiesResponse('user'))

  fetchMock.post(new RegExp('^.*?/nice2/rest/entities/User/[0-9]'), createEntityUpdateResponse)
  fetchMock.patch(new RegExp('^.*?/nice2/rest/entities/User/[0-9]\\?_validate=true'), createValidateResponse)
  fetchMock.patch(new RegExp('^.*?/nice2/rest/entities/User/[0-9]'), createEntityUpdateResponse)

  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/Dummy_entity/model.*'),
    require('./rest-responses/model_user.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/Dummy_entity/count?.*'), createCountResponse('dummy'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/Dummy_entity/[0-9]?.*'), createEntityResponse('dummy'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/Dummy_entity?.*'), createEntitiesResponse('dummy'))

  fetchMock.spy()
}

module.exports = setupFetchMock

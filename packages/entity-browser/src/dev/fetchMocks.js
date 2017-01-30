import {utilFetchMocks} from 'tocco-util/dev'

import {
  createValidateResponse,
  createEntitiesReponse,
  createCountReponse,
  createEntityResponse,
  createEntityUpdateResponse
} from './fetchMockHelpers'

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.sessionFetchMock(fetchMock)
  utilFetchMocks.textResourceFetchMock(fetchMock, require('./rest-responses/messages.json'))

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
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User_code1.*'), require('./rest-responses/user_code1.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/Dummy_entity.*'), require('./rest-responses/dummy_entity.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/Gender.*'), require('./rest-responses/gender.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/model.*'), require('./rest-responses/model_user.json'))
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/count?.*'), createCountReponse)
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User/[0-9]?.*'), createEntityResponse)
  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/User?.*'), createEntitiesReponse)

  fetchMock.post(new RegExp('^.*?/nice2/rest/entities/User/[0-9]/validate.*'), createValidateResponse)
  fetchMock.post(new RegExp('^.*?/nice2/rest/entities/User/[0-9]'), createEntityUpdateResponse)
  fetchMock.patch(new RegExp('^.*?/nice2/rest/entities/User/[0-9]'), createEntityUpdateResponse)

  fetchMock.spy()
}

module.exports = setupFetchMock

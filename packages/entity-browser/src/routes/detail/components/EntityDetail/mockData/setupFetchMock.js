
export const setupFetchMock = fetchMock => {
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/model$'),
    require('./data/user_model.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/username$'),
    require('./data/username.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/textresource?.*$'),
    {'client.entity-detail.loadingText': '.'}
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User/update$'),
    require('./data/user_form.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/User/1.*$'),
    require('./data/user_entity.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/client/markings/User/1$'),
    {}
  )
}

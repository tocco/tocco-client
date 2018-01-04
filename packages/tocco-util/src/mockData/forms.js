export const setupForms = fetchMock => {
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_list$'),
    require('./data/user_list_form.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_search$'),
    require('./data/user_search_form.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_detail$'),
    require('./data/user_detail_form.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_create$'),
    require('./data/user_detail_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_detail_relDummySubGrid_list$'),
    require('./data/dummy_entity_list_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_detail_relDummySubGrid_search$'),
    require('./data/dummy_entity_search_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/Dummy_entity_list$'),
    require('./data/dummy_entity_list_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/Dummy_entity_search$'),
    require('./data/dummy_entity_search_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_Dummy_entity_detail$'),
    require('./data/dummy_entity_detail_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_Dummy_entity_create$'),
    require('./data/dummy_entity_create_form.json')
  )
}

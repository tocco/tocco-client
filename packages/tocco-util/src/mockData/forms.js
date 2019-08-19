export const setupForms = fetchMock => {
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_(list|remotefield)$'),
    require('./data/user_list_form.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_withconstriction_(list|remotefield)'),
    require('./data/user_list_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_search$'),
    require('./data/user_search_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_withconstriction_search'),
    404
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
    new RegExp('^.*?/nice2/rest/forms/User_small_(list|remotefield)$'),
    require('./data/user_list_small_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_small_search$'),
    404
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/Dummy_entity_(list|remotefield)$'),
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

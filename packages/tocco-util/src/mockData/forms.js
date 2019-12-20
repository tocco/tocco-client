import {evaluateINQuery, getParameterValue} from './utils'

export const setupForms = fetchMock => {
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/(.*)/display-expressions.*$'),
    createDisplayExpressionResponse()
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User/(list|remotefield)$'),
    require('./data/user_list_form.json')
  )
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_withconstriction/(list|remotefield)'),
    require('./data/user_list_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User/search$'),
    require('./data/user_search_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_withconstriction/search'),
    404
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User/(update|create)$'),
    require('./data/user_detail_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_detail_relDummySubGrid/list$'),
    require('./data/dummy_entity_list_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_detail_relDummySubGrid/search$'),
    require('./data/dummy_entity_search_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_small/(list|remotefield)$'),
    require('./data/user_list_small_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_small/search$'),
    404
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/Dummy_entity/(list|remotefield)$'),
    require('./data/dummy_entity_list_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/Dummy_entity/search$'),
    require('./data/dummy_entity_search_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_Dummy_entity/update'),
    require('./data/dummy_entity_detail_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_Dummy_entity/create$'),
    require('./data/dummy_entity_create_form.json')
  )
}

const createDisplayExpressionResponse = () =>
  (url, opts) => {
    const paths = getParameterValue('_paths', url).split(',')
    const where = getParameterValue('_where', url)

    const keys = evaluateINQuery(where)

    const formName = url.match(/.*forms\/(.*)\/display-expressions.*/)[1]
    return {
      formName,
      displayExpressions: keys.map(key => (
        {
          key: key.toString(),
          displayExpressions: paths.reduce((acc, path) => (
            {...acc, [path]: `<i class="far fa-check"></i><b>bold</b> <i>${key}</i>`}
          ), {})
        }))
    }
  }

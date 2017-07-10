import consoleLogger from '../consoleLogger'

export const setupFetchMock = (fetchMock, entityStore) => {
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
    new RegExp('^.*?/nice2/rest/forms/User_detail_relDummySubGrid_list$'),
    require('./data/user_detail_relDummySubGrid_list_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_detail_relDummySubGrid_search$'),
    require('./data/user_detail_relDummySubGrid_search_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/User_Dummy_entity_detail$'),
    require('./data/dummy_entity_detail_form.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/model$'),
    require('./data/user_model.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity/model$'),
    require('./data/dummy_entity_model.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity/count(\\?.*)?'),
    () => ({'count': entityStore['Dummy_entity'].length})
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/count(\\?.*)?'),
    () => ({'count': entityStore['User'].length})
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9]+(\\?.*)?'),
    createEntityResponse('User', entityStore)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity/[0-9]+\\?.*'),
    createEntityResponse('Dummy_entity', entityStore)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User(\\?.*)?$'),
    createEntitiesResponse('User', entityStore)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity(\\?.*)?$'),
    createEntitiesResponse('Dummy_entity', entityStore)
  )
}

const createEntityResponse = (entityName, entityStore) => {
  const entities = entityStore[entityName]

  return (url, opts) => {
    consoleLogger.log('fetchMock: called fetch entity', url, opts)
    const id = url.match(/^.*\/[A-Z][A-Za-z0-9_]*\/(\d+)/)[1]
    return entities[id]
  }
}

const createEntitiesResponse = (entityName, entityStore) => {
  const entities = entityStore[entityName]

  return (url, opts) => {
    consoleLogger.log('fetchMock: called fetch entities', url)
    const limit = parseInt(getParameterValue('_limit', url)) || 25
    const offset = parseInt(getParameterValue('_offset', url)) || 0
    const orderBy = getParameterValue('_sort', url)
    const searchTerm = getParameterValue('_search', url)

    if (orderBy) {
      const parts = orderBy.split(' ')
      const fieldName = parts[0]
      const direction = parts[1]
      entities.sort((a, b) => {
        const A = a.paths[fieldName].value.value || 0
        const B = b.paths[fieldName].value.value || 0
        return ((A < B) ? -1 : ((A > B) ? 1 : 0))
      })
      if (direction === 'desc') {
        entities.reverse()
      }
    }

    let result
    if (searchTerm === 'few') {
      result = wrapEntitiesResponse(entityName, entities.slice(0, 5))
    } else {
      result = wrapEntitiesResponse(entityName, entities.slice(offset, offset + limit))
    }

    return sleep(1000).then(() => result)
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getParameterValue = (name, url) => {
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const wrapEntitiesResponse = (entityName, entities) => ({
  metaData: {
    modelName: entityName,
    label: entityName
  },
  data: entities
})

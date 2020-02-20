import _get from 'lodash/get'

import consoleLogger from '../consoleLogger'
import {sleep} from './mockData'
import {getParameterValue, evaluateFulltext} from './utils'

const evenFilter = (value, idx) => idx % 2 === 0

export const setupEntities = (fetchMock, entityStore, timeout) => {
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/model$'),
    require('./data/user_model.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity/model$'),
    require('./data/dummy_entity_model.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/MySessionOnly/model$'),
    require('./data/my_session_only_model.json')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entity/User/[0-9]+/display/tooltip(\\?.*)?'),
    createToolTipResponse('User', entityStore)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entity/Dummy_entity/[0-9]+/display/tooltip(\\?.*)?'),
    createToolTipResponse('Dummy_entity', entityStore)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/Dummy_entity/count(\\?.*)?'),
    () => ({count: entityStore.Dummy_entity.length})
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/2.0/Dummy_entity/count$'),
    () => ({count: entityStore.Dummy_entity.length})
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/User/count(\\?.*)?'),
    () => sleep(timeout).then(() => ({count: entityStore.User.length}))
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/2.0/User/count$'),
    () => sleep(timeout).then(() => ({count: entityStore.User.length}))
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/User/[0-9]+/entitydocs/count(\\?.*)?'),
    () => sleep(timeout).then(() => ({count: -1}))
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/User/[0-9]+/entitydocs(\\?.*)?'),
    createEntitiesResponse('Dummy_entity', entityStore, timeout, evenFilter)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/2.0/User/[0-9]+/entitydocs(\\?.*)?'),
    createEntitiesResponse('Dummy_entity', entityStore, timeout, evenFilter)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/User/[0-9]+(\\?.*)?'),
    createEntityResponse('User', entityStore)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/Dummy_entity/[0-9]+\\?.*'),
    createEntityResponse('Dummy_entity', entityStore)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/User(\\?.*)?$'),
    createEntitiesResponse('User', entityStore, timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/2.0/User/search.*$'),
    createEntitiesResponse('User', entityStore, timeout)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/Dummy_entity(\\?.*)?$'),
    createEntitiesResponse('Dummy_entity', entityStore, timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/2.0/Dummy_entity/search.*$'),
    createEntitiesResponse('Dummy_entity', entityStore, timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/2.0/displays.*$'),
    createEntitiesDisplayResponse(entityStore, timeout)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/Search_filter(\\?.*)?$'),
    createSearchFilterResponse(timeout)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/Country/[0-9]+\\?.*'),
    require('./data/countries.json').data[1]
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/Country(\\?.*)?$'),
    require('./data/countries.json')
  )
}

const createToolTipResponse = (entityName, entityStore) => {
  const entities = entityStore[entityName]
  return (url, opts) => {
    consoleLogger.log('fetchMock: called fetch tooltip', url, opts)
    const id = url.match(/^.*\/[A-Z][A-Za-z0-9_]*\/(\d+)/)[1]
    const entity = entities[id]
    return {
      display: `<b>${entity.display}</b>
                  <table style="border: none; text-align: left; width: 100%;" border="0">
                      <tbody>
                      <tr>
                          <td align="left" valign="top">Some field</td>
                          <td align="left" valign="top">Some value</td>
                      </tr>
                      </tbody>
                  </table>
                  <img src="https://picsum.photos/64/64" width="64" height="64"/>`
    }
  }
}

const createEntityResponse = (entityName, entityStore) => {
  const entities = entityStore[entityName]

  return (url, opts) => {
    consoleLogger.log('fetchMock: called fetch entity', url, opts)
    const id = url.match(/^.*\/[A-Z][A-Za-z0-9_]*\/(\d+)/)[1]
    return entities[id]
  }
}

const extractUrlParams = url => () => (
  {
    limit: parseInt(getParameterValue('_limit', url)) || 25,
    offset: parseInt(getParameterValue('_offset', url)) || 0,
    sort: getParameterValue('_sort', url),
    search: getParameterValue('_search', url),
    where: getParameterValue('_where', url),
    keys: getParameterValue('_keys', url)
  }
)

const extractBodyParams = body => () => {
  const {limit = 25, offset = 0, sort, search, where, keys} = body
  return {limit, offset, sort, search, where, keys}
}

const createEntitiesDisplayResponse = (entityStore, timeout) =>
  (url, opts) =>
    sleep(timeout).then(() => ({
      data: JSON.parse(opts.body).data.map(val => ({
        model: val.model,
        values: val.keys.map(key => ({key, display: `${val.model} (${key})`}))
      }))
    }))

const entityListMutaters = [
  {
    doRun: params => !!params.sort,
    mutate: (entities, params) => {
      const sortedEntities = [...entities]
      const parts = params.sort.split(' ')
      const fieldName = parts[0]
      const direction = parts[1]
      sortedEntities.sort((a, b) => {
        const path = 'paths.' + [fieldName] + '.value.value'
        const A = _get(a, path, 0)
        const B = _get(b, path, 0)
        return ((A < B) ? -1 : ((A > B) ? 1 : 0))
      })
      if (direction === 'desc') {
        sortedEntities.reverse()
      }

      return sortedEntities
    }
  },
  {
    doRun: params => !!params.keys,
    mutate: (entities, params) => [...entities].filter(e => params.keys.includes(e.key))
  },
  {
    doRun: params => !!params.filter,
    mutate: (entities, params) => [...entities].filter(params.filter)
  },
  {
    doRun: params => !!params.search || !!params.where,
    mutate: (entities, params) => {
      const searchTerm = params.search || evaluateFulltext(params.where)
      return searchTerm === 'few' ? entities.slice(0, 3) : searchTerm === 'none' ? [] : entities
    }
  },
  {
    doRun: params => params.offset !== undefined && params.limit !== undefined,
    mutate: (entities, params) => entities.slice(params.offset, params.offset + params.limit)
  }
]

const createEntitiesResponse = (entityName, entityStore, timeout, filter) => {
  const entities = entityStore[entityName]

  return (url, opts) => {
    consoleLogger.log('fetchMock: called fetch entities', url, opts)

    const extractFunction = opts.method === 'POST' ? extractBodyParams(JSON.parse(opts.body)) : extractUrlParams(url)

    const params = extractFunction()
    const mutatedEntities = entityListMutaters.reduce((acc, mutater) => {
      return mutater.doRun(params) ? mutater.mutate(acc, params) : acc
    }, entities)

    return sleep(timeout).then(() => wrapEntitiesResponse(entityName, mutatedEntities))
  }
}

const createSearchFilterResponse = () =>
  url => {
    consoleLogger.log('fetchMock: called fetch search filter', url)
    const requestedGroup = getParameterValue('relSearch_filter_group.unique_id', url)
    if (requestedGroup) {
      const filters = require('./data/search_filters.json')
      return {
        data: filters.data.filter(f =>
          f.paths.relSearch_filter_group && f.paths.relSearch_filter_group.value[0].display.includes(requestedGroup)
        )
      }
    } else {
      return require('./data/search_filters.json')
    }
  }

const wrapEntitiesResponse = (entityName, entities) => ({
  metaData: {
    modelName: entityName,
    label: entityName
  },
  data: entities
})

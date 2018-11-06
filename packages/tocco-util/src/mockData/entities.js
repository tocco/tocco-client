import _get from 'lodash/get'

import consoleLogger from '../consoleLogger'
import {sleep} from './mockData'

const evenFilter = (value, idx) => idx % 2 === 0

export const setupEntities = (fetchMock, entityStore, timeout) => {
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
    new RegExp('^.*?/nice2/rest/forms/MySessionOnly_detail$'),
    require('./data/my_session_only_detail_form.json')
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
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity/count(\\?.*)?'),
    () => ({'count': entityStore['Dummy_entity'].length})
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/count(\\?.*)?'),
    () => sleep(timeout).then(() => ({'count': entityStore['User'].length}))
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9]+/entitydocs/count(\\?.*)?'),
    () => sleep(timeout).then(() => ({'count': -1}))
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9]+/entitydocs(\\?.*)?'),
    createEntitiesResponse('Dummy_entity', entityStore, timeout, evenFilter)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9]+(\\?.*)?'),
    createEntityResponse('User', entityStore)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity/[0-9]+\\?.*'),
    createEntityResponse('Dummy_entity', entityStore)
  )

  fetchMock.delete(
    new RegExp('^.*?/nice2/rest/entities/User/[0-9](\\?.*)?'),
    deleteEntityResponse('User', entityStore, timeout)
  )

  fetchMock.delete(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity/[0-9](\\?.*)?'),
    deleteEntityResponse('Dummy_entity', entityStore, timeout)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/User(\\?.*)?$'),
    createEntitiesResponse('User', entityStore, timeout)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Dummy_entity(\\?.*)?$'),
    createEntitiesResponse('Dummy_entity', entityStore, timeout)
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Search_filter(\\?.*)?$'),
    createSearchFilterResponse(timeout)
  )
}

const createToolTipResponse = (entityName, entityStore) =>
  (url, opts) => {
    const entities = entityStore[entityName]
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

const createEntityResponse = (entityName, entityStore) =>
  (url, opts) => {
    const entities = entityStore[entityName]
    consoleLogger.log('fetchMock: called fetch entity', url, opts)
    const id = url.match(/^.*\/[A-Z][A-Za-z0-9_]*\/(\d+)/)[1]
    return entities[id]
  }

const deleteEntityResponse = (entityName, entityStore, timeout) =>
  url => {
    const id = url.match(/^.*\/[A-Z][A-Za-z0-9_]*\/(\d+)/)[1]
    consoleLogger.log('fetchMock: called delete entitiy', entityName, id)

    const succeed = Math.random() < 0.5

    const resonse = succeed ? 200 : {
      body: {
        errorCode: 'CASCADING_DELETE_DENIED',
        message: 'Cascading delete aborted',
        referencedFrom: [{href: `${__BACKEND_URL__}/rest/entities/Newsletter_dispatch/405`}]
      },
      status: 409
    }

    if (succeed) {
      entityStore[entityName] = entityStore[entityName].filter(e => e.key !== id)
    }

    return sleep(timeout).then(() => resonse)
  }

const createEntitiesResponse = (entityName, entityStore, timeout, filter) =>
  (url, opts) => {
    const entities = entityStore[entityName]
    consoleLogger.log('fetchMock: called fetch entities', url)
    const limit = parseInt(getParameterValue('_limit', url)) || 25
    const offset = parseInt(getParameterValue('_offset', url)) || 0
    const orderBy = getParameterValue('_sort', url)
    const searchTerm = getParameterValue('_search', url)
    const query = getParameterValue('_where', url)

    if (orderBy) {
      const parts = orderBy.split(' ')
      const fieldName = parts[0]
      const direction = parts[1]
      entities.sort((a, b) => {
        const path = 'paths.' + [fieldName] + '.value.value'
        const A = _get(a, path, 0)
        const B = _get(b, path, 0)
        return ((A < B) ? -1 : ((A > B) ? 1 : 0))
      })
      if (direction === 'desc') {
        entities.reverse()
      }
    }

    const filteredEntities = filter ? entities.filter(filter) : entities

    let result
    if (query) {
      result = wrapEntitiesResponse(entityName, handleQueryResult(query, filteredEntities))
    } else if (searchTerm === 'few') {
      result = wrapEntitiesResponse(entityName, filteredEntities.slice(0, 3))
    } else if (searchTerm === 'none') {
      result = wrapEntitiesResponse(entityName, [])
    } else {
      result = wrapEntitiesResponse(entityName, filteredEntities.slice(offset, offset + limit))
    }

    return sleep(timeout).then(() => result)
  }

const handleQueryResult = (query, entities) => {
  const matchIN = query.match(/IN\(pk,(.*)\)/)
  if (matchIN) {
    const ids = matchIN[1].split(',')
    entities = entities.filter(e => ids.includes(e.key))
  }

  return entities
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

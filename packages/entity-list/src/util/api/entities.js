import {call} from 'redux-saga/effects'
import {requestSaga} from 'tocco-util/src/rest'
import _get from 'lodash/get'

const getCreatePermission = json => {
  if (json.createPermission && typeof json.createPermission === 'boolean') {
    return json.createPermission
  }

  return false
}

export const defaultModelTransformer = json => {
  const model = {}
  json.fields.forEach(field => {
    model[field.fieldName] = {
      ...field
    }
  })

  json.relations.forEach(relation => {
    model[relation.relationName] = {
      type: 'relation',
      targetEntity: relation.targetEntity
    }
  })

  const createPermission = getCreatePermission(json)
  return {model, createPermission}
}

export function* fetchModel(entityName, transformer = defaultModelTransformer) {
  const resp = yield call(requestSaga, `entities/${entityName}/model`)
  return transformer(resp.body)
}

export const entitiesListTransformer = json => {
  return json.data.map(entity => {
    const result = {
      __key: entity.key,
      __model: entity.model
    }

    const paths = entity.paths
    for (const path in paths) {
      const type = paths[path].type
      if (type === 'field') {
        result[path] = paths[path].value
      } else if (type === 'entity') {
        result[path] = {
          type: 'string',
          value: paths[path].value ? paths[path].value.display : ''
        }
      } else if (type === 'entity-list') {
        result[path] = {
          type: 'string',
          value: paths[path].value ? paths[path].value.map(v => v.display).join(', ') : ''
        }
      } else if (type === 'display-expression') {
        result[path] = {
          type: 'html',
          value: paths[path].value
        }
      }
    }
    return result
  })
}

export const defaultEntitiesTransformer = json => (json)
export const selectEntitiesTransformer = json => (json.data.map(e => ({display: e.display, key: e.key})))
export const searchFilterTransformer = json =>
  (json.data.map(e => ({display: e.display, key: e.key, uniqueId: _get(e, 'paths.unique_id.value.value', null)})))

const getSortString = sorting => {
  if (Array.isArray(sorting) && sorting.length >= 1) {
    return sorting.map(sort => `${sort.field} ${sort.order}`).join(', ')
  }

  return null
}

const buildParams = ({
  page = undefined,
  sorting = [],
  limit = undefined,
  fields = [],
  searchFilters = [],
  searchInputs = {},
  formName = undefined
} = {}) => {
  const params = {
    '_sort': getSortString(sorting),
    '_paths': fields.join(','),
    '_filter': searchFilters.join(','),
    '_form': formName,
    ...searchInputs
  }

  if (limit) {
    params._limit = limit
    if (page) {
      params._offset = (page - 1) * limit
    }
  }
  return params
}

export function* fetchEntities(entityName, searchInputs, transformer = defaultEntitiesTransformer) {
  const queryParams = buildParams(searchInputs)
  const response = yield call(requestSaga, `entities/${entityName}`, {
    queryParams
  })
  return yield call(transformer, response.body)
}

export function* fetchEntityCount(entityName, searchInputs) {
  const queryParams = buildParams(searchInputs)
  const response = yield call(requestSaga, `entities/${entityName}/count`, {
    queryParams
  })
  return response.body.count
}

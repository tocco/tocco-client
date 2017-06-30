import {call} from 'redux-saga/effects'
import {requestSaga, getRequestSaga} from 'tocco-util/src/rest'

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
  return model
}

export function* fetchModel(entityName, transformer = defaultModelTransformer) {
  const resp = yield call(requestSaga, `entities/${entityName}/model`)
  return transformer(resp.body)
}

export const entitiesListTransformer = json => {
  return json.data.map(entity => {
    const result = {
      __key: entity.key
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

const defaultEntitiesTransformer = json => (json)
export const selectEntitiesTransformer = json => (json.data.map(e => ({display: e.display, key: e.key})))

function buildParams({
  page = undefined,
  orderBy = {},
  limit = undefined,
  fields = [],
  searchFilters = [],
  searchInputs = {},
  formName = undefined
} = {}) {
  const params = {
    '_sort': Object.keys(orderBy || {}).length === 2 ? `${orderBy.name} ${orderBy.direction}` : undefined,
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

export function* fetchEntities(entityName, searchInputs,
                               transformer = defaultEntitiesTransformer) {
  const params = buildParams(searchInputs)
  const response = yield call(getRequestSaga, `entities/${entityName}`, params, [])
  return transformer(response.body)
}

export function* fetchEntityCount(entityName, searchInputs) {
  const params = buildParams(searchInputs)
  const response = yield call(getRequestSaga, `entities/${entityName}/count`, params, [])
  return response.body.count
}

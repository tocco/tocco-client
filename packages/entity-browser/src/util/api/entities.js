import {request, getRequest} from 'tocco-util/src/rest'
import {SubmissionError} from 'redux-form'
import {validationErrorToFormError} from '../detailView/reduxForm'

export function fetchEntity(entityName, id, fields) {
  const params = {
    '_paths': fields.join(',')
  }

  return request(`entities/${entityName}/${id}`, params)
    .then(resp => resp.body)
}

export function updateEntity(entity, fields) {
  const params = {
    '_paths': fields.join(',')
  }
  return request(`entities/${entity.model}/${entity.key}`, params, 'PATCH', entity, ['VALIDATION_FAILED'])
    .then(resp => {
      if (resp.body.errorCode === 'VALIDATION_FAILED') {
        throw new SubmissionError(validationErrorToFormError(entity, resp.body.errors))
      }
      return resp.body
    })
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
  return model
}

export function fetchModel(entityName, transformer = defaultModelTransformer) {
  return request(`entities/${entityName}/model`)
    .then(resp => resp.body)
    .then(json => transformer(json))
}

export const entitiesListTransformer = json => {
  return json.data.map(entity => {
    const result = {
      id: entity.key,
      values: {}
    }

    const paths = entity.paths
    for (const path in paths) {
      const type = paths[path].type
      if (type === 'field') {
        result.values[path] = paths[path].value
      } else if (type === 'entity') {
        result.values[path] = {
          type: 'string',
          value: paths[path].value ? paths[path].value.display : ''
        }
      } else if (type === 'entity-list') {
        result.values[path] = {
          type: 'string',
          value: paths[path].value ? paths[path].value.map(v => v.display).join(', ') : ''
        }
      } else if (type === 'display-expression') {
        result.values[path] = {
          type: 'html',
          value: paths[path].value
        }
      }
    }
    return result
  })
}

const defaultEntitiesTransformer = json => (json)

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
    '_form': formName,
    '_filter': searchFilters.join(','),
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

export function fetchEntities(entityName, searchInputs,
                              transformer = defaultEntitiesTransformer) {
  const params = buildParams(searchInputs)
  return getRequest(`entities/${entityName}`, params, [])
    .then(resp => resp.body)
    .then(json => transformer(json))
}

export function fetchEntityCount(entityName, searchInputs) {
  const params = buildParams(searchInputs)
  return getRequest(`entities/${entityName}/count`, params, [])
    .then(resp => resp.body)
    .then(json => json.count)
}

export const combineEntitiesInObject = entitiesList => {
  const result = {}
  entitiesList.forEach(entities => {
    result[entities.metaData.modelName] = entities.data.map(entity => ({
      displayName: entity.display,
      value: entity.key
    }))
  })

  return result
}

export const getInitialSelectBoxStore = (paths, model) => {
  const keys = Object.keys(paths)
  const stores = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const field = paths[key]
    if (field.type === 'entity') {
      if (field.value != null) {
        const targetEntity = model[key].targetEntity
        stores.push({targetEntity, store: [{value: field.value.key, label: field.value.display}]})
      }
    } else if (field.type === 'entity-list') {
      const targetEntity = model[key].targetEntity
      if (field.value != null && field.value.length > 0) {
        stores.push({targetEntity, store: field.value.map(e => ({value: e.key, label: e.display}))})
      }
    }
  }

  return stores
}

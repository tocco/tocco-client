import {request, getRequest} from 'tocco-util/src/rest'
import {SubmissionError} from 'redux-form'
import {validationErrorToFormError} from '../reduxForms'

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
  return request(`entities/${entity.model}/${entity.key}`, params, 'PATCH', entity, ['SAVE_FAILED'])
    .then(resp => {
      if (resp.body.errorCode === 'SAVE_FAILED') {
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

export function fetchEntityCount(entityName, searchInputs) {
  const params = {
    ...searchInputs
  }
  return request(`entities/${entityName}/count`, params)
    .then(resp => resp.body)
    .then(json => json.count)
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
      }
    }
    return result
  })
}

const defaultEntitiesTransformer = json => (json)

export function fetchEntities(entityName, page, orderBy = {}, limit, fields = [],
                              searchInputs = {}, transformer = defaultEntitiesTransformer) {
  const params = {
    '_sort': Object.keys(orderBy || {}).length === 2 ? `${orderBy.name} ${orderBy.direction}` : undefined,
    '_paths': fields.join(','),
    ...searchInputs
  }

  if (limit) {
    params._limit = limit
    if (page) {
      params._offset = (page - 1) * limit
    }
  }

  return getRequest(`entities/${entityName}`, params, [])
    .then(resp => resp.body)
    .then(json => transformer(json))
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


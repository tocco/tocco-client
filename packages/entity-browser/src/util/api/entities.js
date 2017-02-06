import * as rest from '../rest'

export function fetchEntity(entityName, id, fields) {
  const params = {
    '_paths': fields.join(',')
  }

  return rest.fetchRequest(`entities/${entityName}/${id}`, params)
    .then(resp => resp.json())
}

export function updateEntity(entity, fields) {
  const params = {
    '_paths': fields.join(',')
  }
  return rest.fetchRequest(`entities/${entity.model}/${entity.key}`, params, 'PATCH', entity)
    .then(resp => resp.json())
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
  return rest.fetchRequest(`entities/${entityName}/model`)
    .then(resp => resp.json())
    .then(json => transformer(json))
}

export function fetchEntityCount(entityName, searchInputs) {
  const params = {
    ...searchInputs
  }
  return rest.fetchRequest(`entities/${entityName}/count`, params)
    .then(resp => resp.json())
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

  return rest.fetchRequest(`entities/${entityName}`, params)
    .then(resp => resp.json())
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


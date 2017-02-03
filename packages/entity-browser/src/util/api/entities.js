import * as rest from '../rest'

export function fetchEntity(entityName, id, fields) {
  const params = {
    '_paths': fields.join(',')
  }

  return rest.fetchRequest(`entities/${entityName}/${id}`, params)
    .then(resp => resp.json())
}

export function updateEntity(entity) {
  return rest.fetchRequest(`entities/${entity.model}/${entity.key}`, {}, 'PATCH', entity)
    .then(resp => resp.json())
}

export const defaultModelTransformer = json => {
  const model = {}
  json.fields.forEach(f => {
    model[f.fieldName] = {
      type: f.type
    }
  })

  json.relations.forEach(r => {
    model[r.relationName] = {
      type: 'relation',
      targetEntity: r.targetEntity
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

export const getInitialSelectBoxStore = paths => {
  const keys = Object.keys(paths)
  const stores = []
  for (let i = 0; i < keys.length; i++) {
    let store = []
    const key = keys[i]
    const field = paths[key]
    if (field.type === 'entity') {
      if (field.value != null) {
        console.log(field.value)
        store = [{value: field.value.key, label: field.value.display}]
      }
    } else if (field.type === 'entity-list') {
      if (field.value != null && field.value.length > 0) {
        store = field.value.map(e => ({value: e.key, label: e.display}))
      }
    }

    stores.push({key, store})
  }

  return stores
}

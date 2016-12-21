import _union from 'lodash/union'
import * as rest from './rest'

export function fetchRecords(entityName, page, orderBy, limit, columnDefinition, searchInputs) {
  const params = {
    '_sort': Object.keys(orderBy).length === 2 ? `${orderBy.name} ${orderBy.direction}` : undefined,
    '_limit': limit,
    '_offset': (page - 1) * limit,
    '_paths': _union(...columnDefinition.map(field => (field.value))).join(','),
    ...searchInputs
  }

  return rest.fetchRequest(`entities/${entityName}`, params)
    .then(resp => resp.json())
    .then(json => transformRecordsResult(json))
}

const transformRecordsResult = json => {
  return json.data.map(entity => {
    const result = {}
    result.display = entity.display
    const paths = entity.paths
    for (let path in paths) {
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
      }
    }
    return result
  })
}

export function fetchRelationRecords(entityName) {
  const params = {
    '_limit': 50
  }

  return rest.fetchRequest(`entities/${entityName}`, params)
    .then(resp => resp.json())
}

export const transformRelationEntitiesResults = data => {
  const result = {}
  data.forEach(entities => {
    result[entities.metaData.modelName] = entities.data.map(record => ({
      displayName: record.display,
      value: record.key
    }))
  })

  return result
}

export function fetchRecordCount(entityName, searchInputs) {
  const params = {
    ...searchInputs
  }
  return rest.fetchRequest(`entities/${entityName}/count`, params)
    .then(resp => resp.json())
    .then(json => json.count)
}

export function fetchColumnDefinition(formName, formType) {
  return rest.fetchRequest(`forms/${formName}`)
    .then(resp => resp.json())
    .then(json => transformFormResult(json, formType))
}

const transformFormResult = (json, formType) => {
  const {form} = json

  const columns = form.children.find(child => child.name === formType)
    .children.filter(column => column.displayType !== 'HIDDEN')

  return columns.map(c => ({
    label: c.label,
    value: c.children
      .filter(child =>
      child.type !== 'ch.tocco.nice2.model.form.components.action.Action'
      && !child.name.startsWith('custom:'))
      .map(child => child.name)
  }))
}

export function fetchSearchForm(formName) {
  return rest.fetchRequest(`forms/${formName}`)
    .then(resp => resp.json())
    .then(json => transformSearchFormResult(json))
}

const transformSearchFormResult = json => {
  const {form} = json
  const fields = form.children[0].children

  return fields
    .filter(f => f.displayType !== 'HIDDEN')
    .map(f => ({
      name: f.name,
      type: f.type,
      displayType: f.displayType,
      label: f.label,
      useLabel: f.useLabel
    }))
}

export function fetchModel(entityName) {
  return rest.fetchRequest(`entities/${entityName}/model`)
    .then(resp => resp.json())
    .then(json => transformModel(json))
}

const transformModel = json => {
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

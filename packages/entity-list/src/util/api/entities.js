import {rest} from 'tocco-app-extensions'
import _reduce from 'lodash/reduce'
import {consoleLogger} from 'tocco-util'
import {call} from 'redux-saga/effects'

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
      targetEntity: relation.targetEntity,
      multi: relation.multi
    }
  })

  const createPermission = getCreatePermission(json)
  return {model, createPermission}
}

export function* fetchModel(entityName, transformer = defaultModelTransformer) {
  const resp = yield call(rest.requestSaga, `entities/${entityName}/model`)
  return transformer(resp.body)
}

export const entitiesListTransformer = json => (
  json.data.map(entity => (
    {
      __key: entity.key,
      __model: entity.model,
      ...(_reduce(entity.paths, (result, value, key) => ({...result, [key]: getFieldValues(value)}), {}))
    }
  ))
)

const getFieldValues = path => {
  const type = path.type
  if (type === 'field') {
    return path.value
  } else if (type === 'entity') {
    return {
      type: 'remote',
      value: path.value
    }
  } else if (type === 'entity-list') {
    return {
      type: 'multi-remote',
      value: path.value
    }
  } else if (type === 'display-expression') {
    return {
      type: 'html',
      value: path.value
    }
  } else if (type === 'multi') {
    return path.value.map(v => getFieldValues(v))
  } else {
    consoleLogger.log(`Unable to map type ${type}`)
    return {
      type: 'string',
      value: ''
    }
  }
}

export const defaultEntitiesTransformer = json => (json)
export const selectEntitiesTransformer = json => (json.data.map(e => ({display: e.display, key: e.key})))

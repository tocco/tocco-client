import {rest} from 'tocco-app-extensions'
import _reduce from 'lodash/reduce'
import {api} from 'tocco-util'
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
      ...(_reduce(
        entity.paths,
        (acc, value, key) => ({...acc, [key]: api.typeValueExtractor[value.type](value.value)}),
        {}
      ))
    }
  ))
)

export const defaultEntitiesTransformer = json => (json)
export const selectEntitiesTransformer = json => (json.data.map(e => ({display: e.display, key: e.key})))

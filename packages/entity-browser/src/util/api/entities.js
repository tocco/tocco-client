import {rest} from 'tocco-app-extensions'
import {call} from 'redux-saga/effects'

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
      ...relation
    }
  })
  return model
}

export function* fetchModel(entityName, transformer = defaultModelTransformer) {
  const resp = yield call(rest.requestSaga, `entities/${entityName}/model`)
  return yield call(transformer, resp.body)
}

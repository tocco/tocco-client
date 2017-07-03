import {call} from 'redux-saga/effects'
import {requestSaga} from 'tocco-util/src/rest'

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
  const resp = yield call(requestSaga, `entities/${entityName}/model`)
  return transformer(resp.body)
}

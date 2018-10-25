import {put} from 'redux-saga/effects'

export default function* (definition, entity, ids, parent, params, config) {
  const action = config[definition.clientAction]
  if (action) {
    yield put(action(definition, entity, ids, parent, params))
  }
}

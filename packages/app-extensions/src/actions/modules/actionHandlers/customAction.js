import {call} from 'redux-saga/effects'

export default function* (definition, entity, selection, parent, params, config) {
  const handler = config && config.customActions && config.customActions[definition.id]
  if (handler) {
    yield call(handler, definition, entity, selection, parent, params, config)
  }
}

import {call} from 'redux-saga/effects'

export default function* (definition, selection, parent, params, config) {
  const handler = config && config.customActions && config.customActions[definition.id]
  if (handler) {
    yield call(handler, definition, selection, parent, params, config)
  }
}

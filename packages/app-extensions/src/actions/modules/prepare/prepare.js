import {call} from 'redux-saga/effects'

import rest from '../../../rest'
import preCheckHandler from './preCheckHandler'
import confirmHandler from './confirmHandler'
import initialFormHandler from './initialFormHandler'
import largeSelectionHandler from './largeSelectionHandler'

export function* doRequest(definition, selection, parent) {
  const response = yield call(rest.requestSaga, definition.endpoint + '/check', {
    method: 'POST',
    body: {
      selection,
      parent
    }
  })
  return response.body
}

export const getHandlers = () => [largeSelectionHandler, preCheckHandler, confirmHandler, initialFormHandler]

export default function* run(definition, selection, parent, config) {
  let abort = false
  let abortMessage = null
  let params = {}

  const preparationResponse = definition.endpoint
    ? yield call(doRequest, definition, selection, parent)
    : {}
  const handlers = yield call(getHandlers)

  let i = 0

  while (!abort && handlers[i]) {
    const handler = handlers[i]
    const handlerResponse = yield call(handler, preparationResponse, params, definition, selection, config)

    abort = handlerResponse.abort
    params = {...params, ...handlerResponse.params}
    if (handlerResponse.abortMessage) {
      abortMessage = handlerResponse.abortMessage
    }

    i++
  }

  return {abort, abortMessage, params}
}

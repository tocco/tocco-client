import {call} from 'redux-saga/effects'

import rest from '../../../rest'
import confirmHandler from './confirmHandler'
import initialFormHandler from './initialFormHandler'
import largeSelectionHandler from './largeSelectionHandler'
import preCheckHandler from './preCheckHandler'

export function* doRequest(definition, selection, parent) {
  const response = yield call(rest.requestSaga, definition.endpoint + '/check', {
    method: 'POST',
    body: {
      selection,
      parent,
      formProperties: definition.properties
    }
  })
  return response.body
}

export const getHandlers = config => [
  largeSelectionHandler,
  preCheckHandler,
  confirmHandler,
  initialFormHandler,
  ...(config.customPreparationHandlers || [])
]

export default function* run(definition, selection, parent, config) {
  let abort = false
  let abortMessage = null
  let params = {}
  let newSelection = selection

  const preparationResponse = definition.endpoint ? yield call(doRequest, definition, selection, parent) : {}
  const handlers = yield call(getHandlers, config)

  let i = 0

  while (!abort && handlers[i]) {
    const handler = handlers[i]
    const handlerOptions = {
      preparationResponse,
      params,
      definition,
      selection: newSelection,
      config
    }
    const handlerResponse = yield call(handler, handlerOptions)

    abort = handlerResponse.abort
    params = {...params, ...handlerResponse.params}
    if (handlerResponse.abortMessage) {
      abortMessage = handlerResponse.abortMessage
    }
    if (handlerResponse.selection) {
      newSelection = handlerResponse.selection
    }

    i++
  }

  return {abort, abortMessage, params, selection: newSelection}
}

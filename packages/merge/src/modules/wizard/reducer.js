import {SET_MERGE_RESPONSE} from './actions'

function setMergeResponse(state, {payload}) {
  const {mergeResponse} = payload
  return {
    ...state,
    mergeResponse: {
      merged: true,
      ...mergeResponse
    }
  }
}

const ACTION_HANDLERS = {
  [SET_MERGE_RESPONSE]: setMergeResponse
}

export default function reducer(state = {mergeResponse: {merged: false}}, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

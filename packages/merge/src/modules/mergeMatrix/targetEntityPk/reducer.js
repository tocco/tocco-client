import {CHANGE_TARGET_ENTITY} from '../actions'

function changeTargetEntity(state, {payload}) {
  return payload.pk
}

const ACTION_HANDLERS = {
  [CHANGE_TARGET_ENTITY]: changeTargetEntity

}

const initialState = []

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

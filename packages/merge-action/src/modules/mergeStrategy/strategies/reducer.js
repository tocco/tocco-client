import {CHANGE_STRATEGY} from './actions'

function setStrategy(state, {payload}) {
  const {name, value} = payload
  return {...state, [name]: value}
}

const ACTION_HANDLERS = {
  [CHANGE_STRATEGY]: setStrategy
}

const initialState = {copyRelations: false, sourceEntityAction: 'NO_ACTION'}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

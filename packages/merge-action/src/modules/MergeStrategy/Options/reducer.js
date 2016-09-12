import {RECEIVE_OPTIONS, CHANGE_OPTION_VALUE, ACTIVATE_OPTION} from './actions'

function receiveOptions(state, {payload}) {
  var newState = [].concat(payload.options)
  newState.forEach(option => {
    option.value = option.defaultValue
    delete option.defaultValue

    option.active = false
  })
  return newState
}

function changeOptionValue(state, {payload}) {
  const {name, value} = payload
  var newState = [].concat(state)
  var option = newState.find(fS => fS.name === name)
  if (option) option.value = value
  return newState
}

function activateFieldSet(state, {payload}) {
  const {name, activate} = payload
  var newState = [].concat(state)
  var option = newState.find(fS => fS.name === name)
  if (option) option.active = activate
  return newState
}

const ACTION_HANDLERS = {
  [RECEIVE_OPTIONS]: receiveOptions,
  [CHANGE_OPTION_VALUE]: changeOptionValue,
  [ACTIVATE_OPTION]: activateFieldSet
}

const initialState = []

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

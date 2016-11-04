import {RECEIVE_EDIT_OPTIONS, CHANGE_EDIT_OPTION_VALUE, ACTIVATE_EDIT_OPTION} from './actions'

function receiveEditOption(state, {payload}) {
  const newState = [].concat(payload.editOptions)
  newState.forEach(editOption => {
    editOption.value = editOption.defaultValue
    delete editOption.defaultValue

    editOption.active = false
  })
  return newState
}

function changeEditOptionValue(state, {payload}) {
  const {name, value} = payload
  const newState = [].concat(state)
  const editOption = newState.find(eO => eO.name === name)
  if (editOption) editOption.value = value
  return newState
}

function activateEditOption(state, {payload}) {
  const {name, activate} = payload
  const newState = [].concat(state)
  const editOption = newState.find(eO => eO.name === name)
  if (editOption) editOption.active = activate
  return newState
}

const ACTION_HANDLERS = {
  [RECEIVE_EDIT_OPTIONS]: receiveEditOption,
  [CHANGE_EDIT_OPTION_VALUE]: changeEditOptionValue,
  [ACTIVATE_EDIT_OPTION]: activateEditOption
}

const initialState = []

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

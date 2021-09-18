import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const handleStartValidation = () => ({
  ...initialState,
  state: {
    ...initialState.state,
    running: true
  }
})

const handleSetTotal = (state, {payload}) => ({
  ...state,
  state: {
    ...state.state,
    total: payload.total
  }
})

const handleSetCurrent = (state, {payload}) => ({
  ...state,
  state: {
    ...state.state,
    running: true,
    total: payload.total,
    currentIndex: payload.currentIndex,
    currentName: payload.currentName
  }
})

const handleSetResult = (state, {payload}) => ({
  ...state,
  state: {
    ...state.state,
    running: false,
    result: payload.result
  }
})

const addCheckEvent = (state, {payload}) => {
  const {id, type, label} = payload
  const typeEvents = state.checkEvents[type] || []
  const newTypeEvents = [...typeEvents, {
    id,
    type,
    label
  }]
  const newCheckEvents = {
    ...state.checkEvents,
    [type]: newTypeEvents
  }

  return {
    ...state,
    checkEvents: newCheckEvents
  }
}

const handleSetSelected = (state, {payload}) => {
  const {ids, selected} = payload

  let newSelection
  if (selected) {
    newSelection = new Set(state.selection)
    ids.forEach(newSelection.add, newSelection)
  } else {
    newSelection = new Set()
    state.selection.forEach(id => {
      if (!ids.includes(id)) {
        newSelection.add(id)
      }
    })
  }

  return {
    ...state,
    selection: newSelection
  }
}

const ACTION_HANDLERS = {
  [actions.START_VALIDATION]: handleStartValidation,
  [actions.SET_TOTAL]: handleSetTotal,
  [actions.SET_CURRENT]: handleSetCurrent,
  [actions.ADD_CHECK_EVENT]: addCheckEvent,
  [actions.SET_RESULT]: handleSetResult,
  [actions.SET_SELECTED]: handleSetSelected,
  [actions.SET_SQL]: reducerUtil.singleTransferReducer('sql'),
  [actions.SET_CHANGELOG]: reducerUtil.singleTransferReducer('changelog')
}

const initialState = {
  checkEvents: {},
  state: {
    running: false,
    currentIndex: null,
    currentName: null,
    total: null,
    result: null
  },
  selection: new Set(),
  sql: null,
  changelog: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

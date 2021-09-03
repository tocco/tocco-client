import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const handleSetFragments = (state, action) => ({
  ...state,
  fragments: action.payload.fragments,
  selectedFragments:
    action.payload.fragments
      .filter(fragment => fragment.selected === true)
      .map(fragment => fragment.id)
})

const handleSetFragmentSelected = (state, action) => ({
  ...state,
  selectedFragments:
    action.payload.selected === true
      ? [...state.selectedFragments, action.payload.fragment]
      : state.selectedFragments
        .filter((_, i) => i !== state.selectedFragments.indexOf(action.payload.fragment))
})

const setRunning = running => state => ({
  ...state,
  running
})

const ACTION_HANDLERS = {
  [actions.SET_VERSION]: reducerUtil.singleTransferReducer('version'),
  [actions.SET_MODULES]: reducerUtil.singleTransferReducer('modules'),
  [actions.SET_SELECTED_MODULES]: reducerUtil.singleTransferReducer('selectedModules'),
  [actions.SET_IGNORE_ERRORS]: reducerUtil.singleTransferReducer('ignoreErrors'),
  [actions.SET_FRAGMENTS]: handleSetFragments,
  [actions.SET_FRAGMENT_SELECTED]: handleSetFragmentSelected,
  [actions.EXECUTE_DB_REFACTORING]: setRunning(true),
  [actions.UNSET_RUNNING]: setRunning(false)
}

const initialState = {
  version: '',
  modules: [],
  selectedModules: [],
  fragments: [],
  selectedFragments: [],
  ignoreErrors: false,
  running: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const handleSetFragments = (state, action) => ({
  ...state,
  dbRefactoring: {
    ...state.dbRefactoring,
    fragments: action.payload.fragments,
    selectedFragments:
      action.payload.fragments
        .filter(fragment => fragment.selected === true)
        .map(fragment => fragment.id)
  }
})

const handleSetFragmentSelected = (state, action) => ({
  ...state,
  dbRefactoring: {
    ...state.dbRefactoring,
    selectedFragments:
      action.payload.selected === true
        ? [...state.dbRefactoring.selectedFragments, action.payload.fragment]
        : state.dbRefactoring.selectedFragments
          .filter((_, i) => i !== state.dbRefactoring.selectedFragments.indexOf(action.payload.fragment))
  }
})

const setRunning = (running, path) => (state, action) => ({
  ...state,
  [path || action.payload.path]: {
    ...state[path || action.payload.path],
    running
  }
})

const ACTION_HANDLERS = {
  [actions.SET_VERSION]: reducerUtil.singleTransferReducer('version', 'dbRefactoring'),
  [actions.SET_MODULES]: reducerUtil.singleTransferReducer('modules', 'dbRefactoring'),
  [actions.SET_SELECTED_MODULES]: reducerUtil.singleTransferReducer('selectedModules', 'dbRefactoring'),
  [actions.SET_IGNORE_ERRORS]: reducerUtil.singleTransferReducer('ignoreErrors', 'dbRefactoring'),
  [actions.SET_FRAGMENTS]: handleSetFragments,
  [actions.SET_FRAGMENT_SELECTED]: handleSetFragmentSelected,
  [actions.EXECUTE_DB_REFACTORING]: setRunning(true, 'dbRefactoring'),
  [actions.UNSET_RUNNING]: setRunning(false),
  [actions.SET_LANGUAGE]: reducerUtil.singleTransferReducer('language', 'languageUpgrade'),
  [actions.EXECUTE_LANGUAGE_UPGRADE]: setRunning(true, 'languageUpgrade')
}

const initialState = {
  dbRefactoring: {
    version: '',
    modules: [],
    selectedModules: [],
    fragments: [],
    selectedFragments: [],
    ignoreErrors: false,
    running: false
  },
  languageUpgrade: {
    language: '',
    running: false
  }
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

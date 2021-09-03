export const LOAD_MODULES = 'dbrefactoring/LOAD_MODULES'
export const LOAD_FRAGMENTS = 'dbrefactoring/LOAD_FRAGMENTS'
export const SET_VERSION = 'dbrefactoring/SET_VERSION'
export const SET_FRAGMENTS = 'dbrefactoring/SET_FRAGMENTS'
export const SET_MODULES = 'dbrefactoring/SET_MODULES'
export const SET_SELECTED_MODULES = 'dbrefactoring/SET_SELECTED_MODULES'
export const SET_FRAGMENT_SELECTED = 'dbrefactoring/SET_FRAGMENT_SELECTED'
export const SET_IGNORE_ERRORS = 'dbrefactoring/SET_IGNORE_ERRORS'
export const EXECUTE_DB_REFACTORING = 'dbrefactoring/EXECUTE_DB_REFACTORING'
export const UNSET_RUNNING = 'dbrefactoring/UNSET_RUNNING'

export const loadModules = () => ({
  type: LOAD_MODULES
})
export const loadFragments = () => ({
  type: LOAD_FRAGMENTS
})

export const setVersion = version => ({
  type: SET_VERSION,
  payload: {
    version
  }
})

export const setFragments = fragments => ({
  type: SET_FRAGMENTS,
  payload: {
    fragments
  }
})

export const setModules = modules => ({
  type: SET_MODULES,
  payload: {
    modules
  }
})

export const setSelectedModules = selectedModules => ({
  type: SET_SELECTED_MODULES,
  payload: {
    selectedModules
  }
})

export const setFragmentSelected = (fragment, selected) => ({
  type: SET_FRAGMENT_SELECTED,
  payload: {
    fragment,
    selected
  }
})

export const setIgnoreErrors = ignoreErrors => ({
  type: SET_IGNORE_ERRORS,
  payload: {
    ignoreErrors
  }
})

export const executeDbRefactoring = () => ({
  type: EXECUTE_DB_REFACTORING
})

export const unsetRunning = () => ({
  type: UNSET_RUNNING
})

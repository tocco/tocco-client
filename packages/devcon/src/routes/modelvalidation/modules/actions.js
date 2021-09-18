export const START_VALIDATION = 'modelvalidation/START_VALIDATION'
export const RECEIVE_MESSAGE = 'modelvalidation/RECEIVE_MESSAGE'
export const SET_TOTAL = 'modelvalidation/SET_TOTAL'
export const SET_CURRENT = 'modelvalidation/SET_CURRENT'
export const ADD_CHECK_EVENT = 'modelvalidation/ADD_CHECK_EVENT'
export const SET_RESULT = 'modelvalidation/SET_RESULT'
export const SET_SELECTED = 'modelvalidation/SET_SELECTED'
export const GENERATE_SQL = 'modelvalidation/GENERATE_SQL'
export const SET_SQL = 'modelvalidation/SET_SQL'
export const EXECUTE_SQL = 'modelvalidation/EXECUTE_SQL'
export const GENERATE_CHANGELOG = 'modelvalidation/GENERATE_CHANGELOG'
export const SET_CHANGELOG = 'modelvalidation/SET_CHANGELOG'

export const startValidation = () => ({
  type: START_VALIDATION
})

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  payload: {
    message
  }
})

export const setResult = result => ({
  type: SET_RESULT,
  payload: {
    result
  }
})

export const setTotal = total => ({
  type: SET_TOTAL,
  payload: {
    total
  }
})

export const setCurrent = (total, currentIndex, currentName) => ({
  type: SET_CURRENT,
  payload: {
    total,
    currentIndex,
    currentName
  }
})

export const addCheckEvent = (id, type, label) => ({
  type: ADD_CHECK_EVENT,
  payload: {
    id,
    type,
    label
  }
})

export const setSelected = (ids, selected) => ({
  type: SET_SELECTED,
  payload: {
    ids,
    selected
  }
})

export const generateSql = () => ({
  type: GENERATE_SQL
})

export const setSql = sql => ({
  type: SET_SQL,
  payload: {
    sql
  }
})

export const executeSql = close => ({
  type: EXECUTE_SQL,
  payload: {
    close
  }
})

export const generateChangelog = () => ({
  type: GENERATE_CHANGELOG
})

export const setChangelog = changelog => ({
  type: SET_CHANGELOG,
  payload: {
    changelog
  }
})

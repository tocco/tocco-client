export const INITIALIZE = 'merge/INITIALIZE'
export const SET_SELECTION = 'merge/SET_SELECTION'
export const SET_SOURCE_DATA = 'merge/SET_SOURCE_DATA'
export const SET_SELECTED_SINGLE = 'merge/SET_SELECTED_SINGLE'
export const SET_SELECTED_MULTIPLE = 'merge/SET_SELECTED_MULTIPLE'
export const SET_SELECTED_MULTIPLE_ALL = 'merge/SET_SELECTED_MULTIPLE_ALL'
export const SET_TARGET_ENTITY = 'merge/SET_TARGET_ENTITY'
export const EXECUTE_MERGE = 'merge/EXECUTE_MERGE'
export const SET_MERGE_RESPONSE = 'merge/SET_MERGE_RESPONSE'
export const SET_MERGE_ERROR = 'merge/SET_MERGE_ERROR'
export const CLOSE = 'merge/CLOSE'

export const initialize = () => ({
  type: INITIALIZE
})

export const setSelection = selection => ({
  type: SET_SELECTION,
  payload: {
    selection
  }
})

export const setSourceData = sourceData => ({
  type: SET_SOURCE_DATA,
  payload: {
    sourceData
  }
})

export const setSelectedSingle = (name, entityKey) => ({
  type: SET_SELECTED_SINGLE,
  payload: {
    name,
    entityKey
  }
})

export const setSelectedMultiple = (name, entityKey, relatedEntityKey, isSelected) => ({
  type: SET_SELECTED_MULTIPLE,
  payload: {
    name,
    entityKey,
    relatedEntityKey,
    isSelected
  }
})

export const setSelectedMultipleAll = (name, entityKey, isSelected) => ({
  type: SET_SELECTED_MULTIPLE_ALL,
  payload: {
    name,
    entityKey,
    isSelected
  }
})

export const setTargetEntity = entityKey => ({
  type: SET_TARGET_ENTITY,
  payload: {
    entityKey
  }
})

export const executeMerge = () => ({
  type: EXECUTE_MERGE
})

export const setMergeResponse = mergeResponse => ({
  type: SET_MERGE_RESPONSE,
  payload: {
    mergeResponse
  }
})

export const setMergeError = (errorMsg, validationErrors) => ({
  type: SET_MERGE_ERROR,
  payload: {
    errorMsg,
    validationErrors
  }
})

export const close = () => ({
  type: CLOSE
})

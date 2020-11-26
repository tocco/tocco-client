export const INITIALIZE = 'merge/INITIALIZE'
export const SET_SELECTION = 'merge/SET_SELECTION'
export const SET_SOURCE_DATA = 'merge/SET_SOURCE_DATA'
export const EXECUTE_MERGE = 'merge/EXECUTE_MERGE'export const SET_MERGE_RESPONSE = 'merge/SET_MERGE_RESPONSE'

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

export const executeMerge = () => ({
  type: EXECUTE_MERGE
})

export const setMergeResponse = mergeResponse => ({
  type: SET_MERGE_RESPONSE,
  payload: {
    mergeResponse
  }
})

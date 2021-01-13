import {reducer as reducerUtil} from 'tocco-util'
import _omit from 'lodash/omit'

import * as actions from './actions'

const executeMerge = state => (
  {
    ...state,
    mergePending: true
  }
)

const mergeResponse = (state, {payload: {mergeResponse}}) => (
  {
    ...state,
    mergePending: false,
    mergeResponse: mergeResponse
  }
)

const mergeErrors = (state, {payload: {errorMsg, validationErrors}}) => (
  {
    ...state,
    mergePending: false,
    mergeErrorMsg: errorMsg,
    mergeValidationErrors: validationErrors
  }
)

const setSelectedSingle = (state, {payload: {name, entityKey}}) => (
  {
    ...state,
    selected: {
      ...state.selected,
      single: {
        ...state.selected.single,
        [name]: entityKey
      }
    }
  }
)

const setSelectedMultiple = (state, {payload: {name, entityKey, relatedEntityKey, isSelected}}) => {
  let multiple
  if (isSelected) {
    multiple = {
      ...state.selected.multiple,
      [name]: {
        ...state.selected.multiple[name],
        [relatedEntityKey]: entityKey
      }
    }
  } else {
    multiple = {...state.selected.multiple}
    multiple[name] = _omit(multiple[name], [relatedEntityKey])
  }
  return {
    ...state,
    selected: {
      ...state.selected,
      multiple: multiple
    }
  }
}

const setSelectedMultipleAll = (state, {payload: {name, entityKey, isSelected}}) => {
  let array
  if (isSelected) {
    array = [...state.selected.multipleAll[name] || [], entityKey]
  } else {
    array = state.selected.multipleAll[name].filter(key => key !== entityKey)
  }
  return {
    ...state,
    selected: {
      ...state.selected,
      multipleAll: {
        ...state.selected.multipleAll,
        [name]: array
      }
    }
  }
}

const setTargetEntity = (state, {payload: {entityKey}}) => {
  const single = {}
  const multiple = {}

  const paths = state.sourceData.entities.find(e => e.key === entityKey).paths
  for (const [key, obj] of Object.entries(paths)) {
    if (obj.type === 'entity-list') {
      multiple[key] = {}
      obj.value.map(e => e.key).forEach(relatedEntityKey => {
        multiple[key][relatedEntityKey] = entityKey
      })
    } else {
      single[key] = entityKey
    }
  }

  const multipleAll = state.sourceData.relations
    .filter(e => e.entityKey === entityKey && e.keys.length > 0)
    .reduce((acc, val) => ({
      ...acc,
      [val.relationName]: [entityKey]
    }), {})

  return (
    {
      ...state,
      selected: {
        ...state.selected,
        targetEntity: entityKey,
        single: single,
        multiple: multiple,
        multipleAll: multipleAll
      }
    }
  )
}

const ACTION_HANDLERS = {
  [actions.SET_SELECTION]: reducerUtil.singleTransferReducer('selection'),
  [actions.SET_SOURCE_DATA]: reducerUtil.singleTransferReducer('sourceData'),
  [actions.EXECUTE_MERGE]: executeMerge,
  [actions.SET_MERGE_RESPONSE]: mergeResponse,
  [actions.SET_MERGE_ERROR]: mergeErrors,
  [actions.SET_SELECTED_SINGLE]: setSelectedSingle,
  [actions.SET_SELECTED_MULTIPLE]: setSelectedMultiple,
  [actions.SET_SELECTED_MULTIPLE_ALL]: setSelectedMultipleAll,
  [actions.SET_TARGET_ENTITY]: setTargetEntity
}

const initialState = {
  selection: null,
  sourceData: null,
  mergePending: false,
  mergeResponse: null,
  mergeErrorMsg: null,
  mergeValidationErrors: [],
  selected: {
    targetEntity: null,
    single: {},
    multiple: {},
    multipleAll: {}
  }
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

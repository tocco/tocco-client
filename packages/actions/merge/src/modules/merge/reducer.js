import _omit from 'lodash/omit'
import _setWith from 'lodash/setWith'
import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const executeMerge = state => ({
  ...state,
  mergePending: true
})

const setMergeResponse = (state, {payload: {mergeResponse}}) => ({
  ...state,
  mergePending: false,
  mergeResponse
})

const setMergeErrors = (state, {payload: {errorMsg, validationErrors}}) => ({
  ...state,
  mergePending: false,
  mergeErrorMsg: errorMsg,
  mergeValidationErrors: validationErrors
})

const setSelectedSingle = (state, {payload: {name, entityKey}}) => ({
  ...state,
  selected: {
    ...state.selected,
    single: {
      ...state.selected.single,
      [name]: entityKey
    }
  }
})

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
      multiple
    }
  }
}

const setSelectedMultipleAll = (state, {payload: {name, entityKey, isSelected}}) => {
  let array
  if (isSelected) {
    array = [...(state.selected.multipleAll[name] || []), entityKey]
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

  const targetEntity = state.sourceData.entities.find(e => e.key === entityKey)
  for (const [key, obj] of Object.entries(targetEntity.paths)) {
    if (obj.type !== 'entity-list') {
      single[key] = entityKey
    }
  }

  state.sourceData.entities.filter(e => e.key !== entityKey).forEach(e => setTargetEntityMultiple(multiple, e))
  setTargetEntityMultiple(multiple, targetEntity)

  const multipleAll = state.sourceData.relations.reduce(
    (acc, val) => ({
      ...acc,
      [val.relationName]: [...(acc[val.relationName] || []), val.entityKey]
    }),
    {}
  )

  return {
    ...state,
    selected: {
      ...state.selected,
      targetEntity: entityKey,
      single,
      multiple,
      multipleAll
    }
  }
}

const setTargetEntityMultiple = (multiple, entity) => {
  for (const [key, obj] of Object.entries(entity.paths)) {
    if (obj.type === 'entity-list') {
      obj.value
        .map(e => e.key)
        .forEach(relatedEntityKey => {
          _setWith(multiple, [key, relatedEntityKey], entity.key, Object)
        })
    }
  }
}

const ACTION_HANDLERS = {
  [actions.SET_SOURCE_DATA]: reducerUtil.singleTransferReducer('sourceData'),
  [actions.EXECUTE_MERGE]: executeMerge,
  [actions.SET_MERGE_RESPONSE]: setMergeResponse,
  [actions.SET_MERGE_ERROR]: setMergeErrors,
  [actions.SET_SELECTED_SINGLE]: setSelectedSingle,
  [actions.SET_SELECTED_MULTIPLE]: setSelectedMultiple,
  [actions.SET_SELECTED_MULTIPLE_ALL]: setSelectedMultipleAll,
  [actions.SET_TARGET_ENTITY]: setTargetEntity
}

const initialState = {
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

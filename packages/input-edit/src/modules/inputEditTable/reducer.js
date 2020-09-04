import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const initialState = {
  actionDefinitions: [],
  dataFormColumns: [],
  data: [],
  inputEditForm: [],
  sorting: [],
  dataLoadingInProgress: false
}

const setValue = (state, action) => {
  const {inputDataKey, node, value} = action.payload
  return {
    ...state,
    data: state.data.reduce((acc, val) => {
      if (val.pk === inputDataKey) {
        return [...acc, {
          ...val,
          [node]: value
        }]
      }
      return [...acc, val]
    }, [])
  }
}

const defaultOrder = 'asc'
const getOpposite = order => order === 'asc' ? 'desc' : 'asc'
const setSorting = (state, {payload: {field, add}}) => {
  if (!add) {
    const currentSorting = state.sorting
    const order = (currentSorting.length > 0 && currentSorting[0].field === field
      ? getOpposite(currentSorting[0].order)
      : defaultOrder)
    return {
      ...state,
      sorting: [{field, order}]
    }
  } else {
    const contains = state.sorting.filter(s => s.field === field)
    const order = contains.length > 0 ? getOpposite(contains[0].order) : defaultOrder

    return {
      ...state,
      sorting: [...state.sorting.filter(s => s.field !== field), {field, order}]
    }
  }
}

const ACTION_HANDLERS = {
  [actions.SET_DATA_FORM_COLUMNS]: reducerUtil.singleTransferReducer('dataFormColumns'),
  [actions.SET_ACTION_DEFINITIONS]: reducerUtil.singleTransferReducer('actionDefinitions'),
  [actions.SET_EDIT_FORM]: reducerUtil.singleTransferReducer('inputEditForm'),
  [actions.SET_DATA]: reducerUtil.singleTransferReducer('data'),
  [actions.SET_DATA_LOADING_IN_PROGRESS]: reducerUtil.singleTransferReducer('dataLoadingInProgress'),
  [actions.SET_VALUE]: setValue,
  [actions.SET_SORTING]: setSorting
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

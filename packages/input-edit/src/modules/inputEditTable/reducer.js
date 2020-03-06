import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const initialState = {
  data: {},
  inputEditForm: [],
  inputDataForm: {},
  sorting: {}
}

const setValue = (state, action) => {
  const {inputDataKey, node, value} = action.payload
  const indexToUpdate = Object.keys(state.data).find(index => state.data[index].pk === inputDataKey)
  return {
    ...state,
    data: {
      ...state.data,
      [indexToUpdate]: {
        ...state.data[indexToUpdate],
        [node]: value
      }
    }
  }
}

const ACTION_HANDLERS = {
  [actions.SET_EDIT_FORM]: reducerUtil.singleTransferReducer('inputEditForm'),
  [actions.SET_DATA_FORM]: reducerUtil.singleTransferReducer('inputDataForm'),
  [actions.SET_DATA]: reducerUtil.singleTransferReducer('data'),
  [actions.SET_VALUE]: setValue,
  [actions.SET_SORTING]: reducerUtil.singleTransferReducer('sorting')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

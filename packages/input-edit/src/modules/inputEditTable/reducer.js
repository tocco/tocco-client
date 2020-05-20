import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const initialState = {
  data: [],
  inputEditForm: [],
  inputDataForm: {},
  sorting: {}
}

const setValue = (state, action) => {
  const {inputDataKey, node, value} = action.payload
  return {
    ...state,
    data: state.data.reduce((acc, val) => {
      if (val.pk.value === inputDataKey) {
        return [...acc, {
          ...val,
          [node]: value
        }]
      }
      return [...acc, val]
    }, [])
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

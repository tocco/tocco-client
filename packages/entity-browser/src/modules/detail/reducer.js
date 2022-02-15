import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_FORM_TOUCHED]: reducerUtil.singleTransferReducer('formTouched'),
  [actions.SET_DETAIL_PARAMS]: reducerUtil.singleTransferReducer('detailParams')
}

const initialState = {
  detailParams: undefined,
  formTouched: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

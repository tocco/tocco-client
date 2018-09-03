import {reducers} from 'tocco-util'

import * as actions from './actions'

const setFormBase = (state, {payload}) => {
  const {formBase} = payload
  if (!formBase) return {...state}

  return {
    ...state,
    formBase
  }
}

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: reducers.singleTransferReducer('entityName'),
  [actions.SET_FORM_BASE]: setFormBase,
  [actions.SET_APP_ID]: reducers.singleTransferReducer('appId')
}

const initialState = {
  entityName: '',
  formBase: '',
  appId: ''
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

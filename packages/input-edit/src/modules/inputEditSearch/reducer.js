import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const initialState = {
  form: {},
  model: {},
  searchQueries: []
}

const ACTION_HANDLERS = {
  [actions.SET_FORM]: reducerUtil.singleTransferReducer('form'),
  [actions.SET_MODEL]: reducerUtil.singleTransferReducer('model'),
  [actions.SET_SEARCH_QUERIES]: reducerUtil.singleTransferReducer('searchQueries')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

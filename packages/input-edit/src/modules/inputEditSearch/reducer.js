import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const initialState = {
  form: {},
  initialized: false,
  searchQueries: []
}

const ACTION_HANDLERS = {
  [actions.SET_FORM]: reducerUtil.singleTransferReducer('form'),
  [actions.SET_SEARCH_QUERIES]: reducerUtil.singleTransferReducer('searchQueries'),
  [actions.SET_INITIALIZED]: reducerUtil.singleTransferReducer('initialized')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

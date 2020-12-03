import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_BREADCRUMBS]: reducerUtil.singleTransferReducer('breadcrumbs'),
  [actions.SET_SEARCH_MODE]: reducerUtil.singleTransferReducer('searchMode')
}

const initialState = {
  breadcrumbs: [],
  searchMode: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

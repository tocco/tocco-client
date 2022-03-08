import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_SEARCH_FORM_COLLAPSED]: reducerUtil.singleTransferReducer('searchFormCollapsed'),
  [actions.SET_SCROLL_BEHAVIOUR]: reducerUtil.singleTransferReducer('scrollBehaviour')
}

const initialState = {
  searchFormCollapsed: null,
  scrollBehaviour: 'inline'
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

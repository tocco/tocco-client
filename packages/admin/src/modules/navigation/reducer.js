import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

export const toogleMenu = state => (
  {
    ...state,
    menuOpen: !state.menuOpen
  }
)

const ACTION_HANDLERS = {
  [actions.SET_ENTITIES]: reducerUtil.singleTransferReducer('entities'),
  [actions.SET_MENU_OPEN]: reducerUtil.singleTransferReducer('menuOpen'),
  [actions.TOGGLE_MENU_OPEN]: toogleMenu
}

const initialState = {
  menuOpen: false,
  entities: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

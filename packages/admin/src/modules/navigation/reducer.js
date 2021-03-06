import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

export const toogleMenu = state => (
  {
    ...state,
    menuOpen: !state.menuOpen
  }
)

const ACTION_HANDLERS = {
  [actions.SET_MENU_OPEN]: reducerUtil.singleTransferReducer('menuOpen'),
  [actions.SET_MODULES_MENU_TREE]: reducerUtil.singleTransferReducer('modulesMenuTree'),
  [actions.SET_SETTINGS_MENU_TREE]: reducerUtil.singleTransferReducer('settingsMenuTree'),
  [actions.SET_SYSTEM_MENU_TREE]: reducerUtil.singleTransferReducer('systemMenuTree'),
  [actions.SET_COMPLETE_MENU_TREE]: reducerUtil.singleTransferReducer('completeMenuTree'),
  [actions.TOGGLE_MENU_OPEN]: toogleMenu,
  [actions.SET_ACTIVE_MENU_TAB]: reducerUtil.singleTransferReducer('activeMenuTab'),
  [actions.SET_VISIBLE_MENUS]: reducerUtil.singleTransferReducer('visibleMenus')
}

const initialState = {
  menuOpen: false,
  entities: [],
  activeMenuTab: '',
  visibleMenus: 'main'
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

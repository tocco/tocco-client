export const INITIALIZE_NAVIGATION = 'navigation/INITIALIZE_NAVIGATION'
export const SET_MENU_OPEN = 'navigation/SET_MENU_OPEN'
export const TOGGLE_MENU_OPEN = 'navigation/TOGGLE_MENU_OPEN'
export const SET_MODULES_MENU_TREE = 'navigation/SET_MODULES_MENU_TREE'
export const SET_SETTINGS_MENU_TREE = 'navigation/SET_SETTINGS_MENU_TREE'
export const SET_ACTIVE_MENU_TAB = 'navigation/SET_ACTIVE_MENU_TAB'

export const initializeNavigation = () => ({
  type: INITIALIZE_NAVIGATION
})

export const setMenuOpen = menuOpen => ({
  type: SET_MENU_OPEN,
  payload: {
    menuOpen
  }
})

export const toggleMenuOpen = () => ({
  type: TOGGLE_MENU_OPEN
})

export const setSettingsMenuTree = settingsMenuTree => ({
  type: SET_SETTINGS_MENU_TREE,
  payload: {
    settingsMenuTree
  }
})

export const setModulesMenuTree = modulesMenuTree => ({
  type: SET_MODULES_MENU_TREE,
  payload: {
    modulesMenuTree
  }
})

export const setActiveMenuTab = activeMenuTab => ({
  type: SET_ACTIVE_MENU_TAB,
  payload: {
    activeMenuTab
  }
})

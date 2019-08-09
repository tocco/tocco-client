export const SET_ENTITIES = 'navigation/SET_ENTITIES'
export const INITIALIZE_NAVIGATION = 'navigation/INITIALIZE_NAVIGATION'export const SET_MENU_OPEN = 'navigation/SET_MENU_OPEN'export const TOGGLE_MENU_OPEN = 'navigation/TOGGLE_MENU_OPEN'

export const setEntities = entities => ({
  type: SET_ENTITIES,
  payload: {
    entities
  }
})

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

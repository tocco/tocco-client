export const INITIALIZE_NAVIGATION = 'navigation/INITIALIZE_NAVIGATION'
export const SET_MENU_OPEN = 'navigation/SET_MENU_OPEN'
export const TOGGLE_MENU_OPEN = 'navigation/TOGGLE_MENU_OPEN'
export const SET_MENU_ITEMS = 'navigation/SET_MENU_ITEMS'

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

export const setMenuItems = menuItems => ({
  type: SET_MENU_ITEMS,
  payload: {
    menuItems
  }
})

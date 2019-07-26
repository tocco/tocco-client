export const SET_ENTITIES = 'navigation/SET_ENTITIES'
export const INITIALIZE_NAVIGATION = 'navigation/INITIALIZE_NAVIGATION'

export const setEntities = entities => ({
  type: SET_ENTITIES,
  payload: {
    entities
  }
})

export const initializeNavigation = () => ({
  type: INITIALIZE_NAVIGATION
})

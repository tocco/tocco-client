export const SET_ENTITY_NAME = 'SET_ENTITY_NAME'
export const SET_FORM_BASE = 'SET_FORM_BASE'
export const SET_SCROLL_BEHAVIOUR = 'SET_SCROLL_BEHAVIOUR'
export const SET_APP_ID = 'root/SET_APP_ID'

export const setEntityName = entityName => ({
  type: SET_ENTITY_NAME,
  payload: {
    entityName
  }
})

export const setFormBase = formBase => ({
  type: SET_FORM_BASE,
  payload: {
    formBase
  }
})

export const setScrollBehaviour = scrollBehaviour => ({
  type: SET_SCROLL_BEHAVIOUR,
  payload: {
    scrollBehaviour
  }
})

export const setAppId = appId => ({
  type: SET_APP_ID,
  payload: {
    appId
  }
})

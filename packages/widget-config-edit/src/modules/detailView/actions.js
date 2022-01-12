export const FETCH_SPECIFIC_CONFIG_ENTITY_ID = 'detailView/FETCH_SPECIFIC_CONFIG_ENTITY_ID'
export const SET_SPECIFIC_CONFIG_ENTITY_ID = 'detailView/SET_SPECIFIC_CONFIG_ENTITY_ID'
export const LINK_CREATED_SPECIFIC_CONFIG = 'detailView/LINK_CREATED_SPECIFIC_CONFIG'
export const UNSET_LINKING = 'detailView/UNSET_LINKING'
export const FIRE_SUCCESS = 'detailView/FIRE_SUCCESS'

export const fetchSpecificConfigEntityId = () => ({
  type: FETCH_SPECIFIC_CONFIG_ENTITY_ID
})

export const setSpecificConfigEntityId = specificConfigEntityId => ({
  type: SET_SPECIFIC_CONFIG_ENTITY_ID,
  payload: {
    specificConfigEntityId
  }
})

export const linkCreatedSpecificConfig = specificConfigEntityId => ({
  type: LINK_CREATED_SPECIFIC_CONFIG,
  payload: {
    specificConfigEntityId
  }
})

export const unsetLinking = () => ({
  type: UNSET_LINKING
})

export const fireSuccess = () => ({
  type: FIRE_SUCCESS
})

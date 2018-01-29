export const LOAD_REMOTE_ENTITY = 'form/LOAD_REMOTE_ENTITY'
export const SET_REMOTE_ENTITY = 'form/SET_REMOTE_ENTITY'
export const SET_REMOTE_ENTITY_LOADING = 'form/SET_REMOTE_ENTITY_LOADING'

export const loadRemoteEntity = (field, entityName, searchTerm) => ({
  type: LOAD_REMOTE_ENTITY,
  payload: {
    field,
    entityName,
    searchTerm
  }
})

export const setRemoteEntity = (field, entities, moreOptionsAvailable) => ({
  type: SET_REMOTE_ENTITY,
  payload: {
    field,
    entities,
    moreOptionsAvailable
  }
})

export const setRemoteEntityLoading = field => ({
  type: SET_REMOTE_ENTITY_LOADING,
  payload: {
    field
  }
})

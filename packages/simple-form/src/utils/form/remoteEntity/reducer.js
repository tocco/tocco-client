export const setRelationEntityLoaded = (state, {payload}) => {
  const relationEntities = {...state.relationEntities}
  if (!relationEntities[payload.entityName]) {
    relationEntities[payload.entityName] = {}
  }
  relationEntities[payload.entityName].loaded = true
  return {...state, relationEntities}
}

export const setRemoteEntity = (state, {payload}) => {
  const {field, entities, moreOptionsAvailable} = payload
  return {
    ...state,
    remoteEntities: {
      ...state.remoteEntities,
      [field]: {
        loading: false,
        entities,
        moreOptionsAvailable
      }
    }
  }
}

export const setRemoteEntityLoading = (state, {payload}) => {
  const {field} = payload
  return {
    ...state,
    remoteEntities: {
      ...state.remoteEntities,
      [field]: {
        loading: true,
        entities: []
      }
    }
  }
}

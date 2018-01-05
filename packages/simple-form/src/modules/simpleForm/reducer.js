import * as relationEntitesActions from '../../utils/relationEntity/actions'

import {setRelationEntity, setRelationEntityLoaded} from '../../utils/relationEntity/reducer'

const ACTION_HANDLERS = {
  [relationEntitesActions.SET_RELATION_ENTITY]: setRelationEntity,
  [relationEntitesActions.SET_RELATION_ENTITY_LOADED]: setRelationEntityLoaded
}

const initialState = {
  relationEntities: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

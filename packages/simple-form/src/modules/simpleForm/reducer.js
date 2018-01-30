import * as relationEntityActions from '../../utils/form/relationEntity/actions'
import * as remoteEntityActions from '../../utils/form/remoteEntity/actions'

import {setRelationEntity, setRelationEntityLoaded} from '../../utils/form/relationEntity/reducer'
import {setRemoteEntity, setRemoteEntityLoading} from '../../utils/form/remoteEntity/reducer'

const ACTION_HANDLERS = {
  [relationEntityActions.SET_RELATION_ENTITY]: setRelationEntity,
  [relationEntityActions.SET_RELATION_ENTITY_LOADED]: setRelationEntityLoaded,
  [remoteEntityActions.SET_REMOTE_ENTITY]: setRemoteEntity,
  [remoteEntityActions.SET_REMOTE_ENTITY_LOADING]: setRemoteEntityLoading
}

const initialState = {
  relationEntities: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

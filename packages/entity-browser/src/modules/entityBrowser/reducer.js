import * as actions from './actions'
import {singleTransferReducer} from 'tocco-util/reducers'

const showEntityDetail = (state, {payload}) => ({
  ...state,
  showDetailEntityId: payload.entityId
})

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: singleTransferReducer('entityName'),
  [actions.SET_FORM_BASE]: singleTransferReducer('formBase'),
  [actions.SHOW_ENTITY_DETAIL]: showEntityDetail,
  [actions.CLOSE_ENTITY_DETAIL]: showEntityDetail
}

const initialState = {
  entityName: '',
  formBase: '',
  showDetailEntityId: undefined
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}


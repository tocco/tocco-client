import * as actions from './actions'
import {singleTransferReducer} from 'tocco-util/reducers'

const setStore = (state, {payload}) => ({
  ...state,
  stores: {
    ...state.stores,
    [payload.entityName]: {
      data: payload.store,
      loaded: false
    }
  }
})

const setStoreLoaded = (state, {payload}) => ({
  ...state,
  stores: {
    ...state.stores,
    [payload.entityName]: {
      data: state.stores[payload.entityName].data,
      loaded: payload.loaded
    }
  }
})

const ACTION_HANDLERS = {
  [actions.SET_FORM_DEFINITION]: singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY_NAME]: singleTransferReducer('entityName'),
  [actions.SET_ENTITY]: singleTransferReducer('entity'),
  [actions.LOAD_RELATION_ENTITIES]: singleTransferReducer('relationEntities'),
  [actions.SET_STORE]: setStore,
  [actions.SET_STORE_LOADED]: setStoreLoaded,
  [actions.SET_ENTITY_MODEL]: singleTransferReducer('entityModel')
}

const initialState = {
  entityName: '',
  formDefinition: [],
  entity: {},
  stores: {},
  entityModel: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}


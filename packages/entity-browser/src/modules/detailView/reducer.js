import * as actions from './actions'
import {reducers} from 'tocco-util'

const setStore = (state, {payload}) => ({
  ...state,
  selectBoxStores: {
    ...state.selectBoxStores,
    [payload.entityName]: {
      data: payload.store,
      loaded: false
    }
  }
})

const setStoreLoaded = (state, {payload}) => ({
  ...state,
  selectBoxStores: {
    ...state.selectBoxStores,
    [payload.entityName]: {
      data: state.selectBoxStores[payload.entityName].data,
      loaded: payload.loaded
    }
  }
})

const ACTION_HANDLERS = {
  [actions.SET_FORM_DEFINITION]: reducers.singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY_NAME]: reducers.singleTransferReducer('entityName'),
  [actions.SET_ENTITY]: reducers.singleTransferReducer('entity'),
  [actions.LOAD_RELATION_ENTITIES]: reducers.singleTransferReducer('relationEntities'),
  [actions.SET_STORE]: setStore,
  [actions.SET_STORE_LOADED]: setStoreLoaded,
  [actions.SET_LAST_SAVE]: reducers.singleTransferReducer('lastSave')
}

const initialState = {
  entityName: '',
  formDefinition: [],
  entity: {},
  selectBoxStores: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}


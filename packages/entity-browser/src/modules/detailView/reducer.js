import * as actions from './actions'
import {singleTransferReducer} from 'tocco-util/reducers'

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
  [actions.SET_FORM_DEFINITION]: singleTransferReducer('formDefinition'),
  [actions.SET_ENTITY_NAME]: singleTransferReducer('entityName'),
  [actions.SET_ENTITY]: singleTransferReducer('entity'),
  [actions.LOAD_RELATION_ENTITIES]: singleTransferReducer('relationEntities'),
  [actions.SET_STORE]: setStore,
  [actions.SET_STORE_LOADED]: setStoreLoaded
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


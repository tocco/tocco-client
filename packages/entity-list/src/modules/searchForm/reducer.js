import * as actions from './actions'
import {reducers} from 'tocco-util'

const simpleSearchFieldsToArray = simpleSearchFields => (
  simpleSearchFields.split(',')
    .filter(s => s)
    .map(s => s.trim())
)

const setSimpleSearchFields = (state, {payload}) => {
  const fieldArray = simpleSearchFieldsToArray(payload.simpleSearchFields)
  if (fieldArray.length > 0) {
    return {
      ...state,
      simpleSearchFields: fieldArray
    }
  }
  return state
}

const setRelationEntity = (state, {payload}) => {
  const relationEntities = {...state.relationEntities}

  if (!relationEntities[payload.entityName]) {
    relationEntities[payload.entityName] = {}
  }

  if (payload.reset) {
    relationEntities[payload.entityName] = {}
    relationEntities[payload.entityName].data = payload.entities
  } else {
    if (!relationEntities[payload.entityName].data) {
      relationEntities[payload.entityName].data = []
    }

    payload.entities.forEach(entity => {
      const idx = relationEntities[payload.entityName].data.findIndex(e => e.value === entity.value)
      if (idx === -1) {
        relationEntities[payload.entityName].data.push(entity)
      }
    })
  }

  return {...state, relationEntities}
}

const setRelationEntityLoaded = (state, {payload}) => {
  const relationEntities = {...state.relationEntities}
  if (!relationEntities[payload.entityName]) {
    relationEntities[payload.entityName] = {}
  }
  relationEntities[payload.entityName].loaded = true
  return {...state, relationEntities}
}

const ACTION_HANDLERS = {
  [actions.SET_SEARCH_FORM_NAME]: reducers.singleTransferReducer('searchFormName'),
  [actions.SET_SIMPLE_SEARCH_FIELDS]: setSimpleSearchFields,
  [actions.SET_FORM_DEFINITION]: reducers.singleTransferReducer('formDefinition'),
  [actions.SET_SHOW_EXTENDED_SEARCH_FORM]: reducers.singleTransferReducer('showExtendedSearchForm'),
  [actions.SET_PRESELECTED_SEARCH_FIELDS]: reducers.singleTransferReducer('preselectedSearchFields'),
  [actions.SET_DISABLE_SIMPLE_SEARCH]: reducers.singleTransferReducer('disableSimpleSearch'),
  [actions.SET_RELATION_ENTITY]: setRelationEntity,
  [actions.SET_RELATION_ENTITY_LOADED]: setRelationEntityLoaded
}

const initialState = {
  searchFormName: '',
  formDefinition: {},
  showExtendedSearchForm: false,
  simpleSearchFields: ['txtFulltext'],
  preselectedSearchFields: [],
  disableSimpleSearch: false,
  relationEntities: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

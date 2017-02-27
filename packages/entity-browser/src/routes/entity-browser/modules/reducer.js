import * as actions from './actions'
import {reducers} from 'tocco-util'

const simpleSearchFieldsToArray = simpleSearchFields => (
  simpleSearchFields.split(',')
    .filter(s => s)
    .map(s => s.trim())
)

const simpleSearchFields = (state, {payload}) => {
  const fieldArray = simpleSearchFieldsToArray(payload.simpleSearchFields)
  return {
    ...state,
    simpleSearchFields: (fieldArray.length === 0) ? ['txtFulltext'] : fieldArray
  }
}

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: reducers.singleTransferReducer('entityName'),
  [actions.SET_FORM_BASE]: reducers.singleTransferReducer('formBase'),
  [actions.SET_SHOW_SEARCH_FORM]: reducers.singleTransferReducer('showSearchForm'),
  [actions.SET_DISABLE_SIMPLE_SEARCH]: reducers.singleTransferReducer('disableSimpleSearch'),
  [actions.SET_SIMPLE_SEARCH_FIELDS]: simpleSearchFields,
  [actions.SET_ENTITY_MODEL]: reducers.singleTransferReducer('entityModel')
}

const initialState = {
  entityName: '',
  formBase: '',
  showSearchForm: true,
  disableSimpleSearch: false,
  entityModel: {},
  simpleSearchFields: ''
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}


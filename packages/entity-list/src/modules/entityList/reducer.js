import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'
import searchFormTypes from '../../util/searchFormTypes'

const setSearchFormType = (state, {payload}) => {
  const {searchFormType: newSearchFormType} = payload

  const searchFormType = Object.values(searchFormTypes).find(enumV => enumV === newSearchFormType)
    || searchFormTypes.BASIC

  return {...state, searchFormType}
}

const ACTION_HANDLERS = {
  [actions.SET_INITIALIZED]: reducerUtil.singleTransferReducer('initialized'),
  [actions.SET_ENTITY_NAME]: reducerUtil.singleTransferReducer('entityName'),
  [actions.SET_ENTITY_MODEL]: reducerUtil.singleTransferReducer('entityModel'),
  [actions.SET_SEARCH_FORM_TYPE]: setSearchFormType,
  [actions.SET_SEARCH_FORM_POSITION]: reducerUtil.singleTransferReducer('searchFormPosition'),
  [actions.SET_PARENT]: reducerUtil.singleTransferReducer('parent')
}

const initialState = {
  initialized: false,
  entityName: '',
  entityModel: {},
  searchFormType: searchFormTypes.BASIC,
  searchFormPosition: 'top',
  parent: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

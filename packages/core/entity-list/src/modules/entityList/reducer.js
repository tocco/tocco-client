import {reducer as reducerUtil} from 'tocco-util'

import searchFormTypes from '../../util/searchFormTypes'
import * as actions from './actions'

const setSearchFormType = (state, {payload}) => {
  const {searchFormType: newSearchFormType} = payload

  const searchFormType =
    Object.values(searchFormTypes).find(enumV => enumV === newSearchFormType) || searchFormTypes.SIMPLE_ADVANCED

  return {...state, searchFormType}
}

const ACTION_HANDLERS = {
  [actions.SET_INITIALIZED]: reducerUtil.singleTransferReducer('initialized'),
  [actions.SET_SEARCH_FORM_TYPE]: setSearchFormType,
  [actions.SET_SEARCH_FORM_TYPE_FROM_INPUT]: setSearchFormType,
  [actions.SET_SEARCH_FORM_COLLAPSED]: reducerUtil.singleTransferReducer('searchFormCollapsed'),
  [actions.SET_SEARCH_FORM_COLLAPSED_INITIAL_VALUE]: reducerUtil.singleTransferReducer('searchFormCollapsed')
}

const initialState = {
  initialized: false,
  searchFormType: searchFormTypes.SIMPLE_ADVANCED,
  searchFormCollapsed: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

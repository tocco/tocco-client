import { combineReducers } from 'redux'

import listReducer from './list'
import searchTermReducer from './searchTerm'
import liveSearchReducer from './liveSearch'

export default combineReducers({
  list: listReducer,
  searchTerm: searchTermReducer,
  liveSearch: liveSearchReducer
})

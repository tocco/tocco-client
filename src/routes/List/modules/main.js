import { combineReducers } from 'redux'

import list from './list'
import searchTerm from './searchTerm'
import liveSearch from './liveSearch'

export default combineReducers({
  list,
  searchTerm,
  liveSearch
})

import { combineReducers } from 'redux'

import list from './list'
import searchTerm from './searchTerm'
import liveSearch from './liveSearch'
import form from './form'

export default combineReducers({
  list,
  searchTerm,
  liveSearch,
  form
})

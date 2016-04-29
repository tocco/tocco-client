import { combineReducers } from 'redux'

import list from './list'
import searchTerm from './searchTerm'
import liveSearch from './liveSearch'
import entityModel from './entityModel'

export default combineReducers({
  list,
  searchTerm,
  liveSearch,
  entityModel
})

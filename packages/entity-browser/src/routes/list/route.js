import {GridRootReducer} from 'react-redux-grid'
import ListViewContainer from './containers/ListViewContainer'

import sagas from './modules/sagas'
import {setLimit, setShowSearchForm, setSearchFilters} from './modules/actions'
import {setPreselectedSearchFields, setSimpleSearchFields, setDisableSimpleSearch} from './modules/searchForm/actions'

import searchFormSagas from './modules/searchForm/sagas'
import list from './modules'
import searchForm from './modules/searchForm'

const inputDispatches = [
  {
    field: 'limit',
    action: setLimit,
    mandatory: true
  },
  {
    field: 'showSearchForm',
    action: setShowSearchForm
  },
  {
    field: 'searchFilters',
    action: setSearchFilters
  }, {
    field: 'disableSimpleSearch',
    action: setDisableSimpleSearch
  }, {
    field: 'simpleSearchFields',
    action: setSimpleSearchFields
  }, {
    field: 'preselectedSearchFields',
    action: setPreselectedSearchFields
  }
]

export default {
  container: ListViewContainer,
  reducers: {
    list,
    searchForm,
    grid: GridRootReducer
  },
  sagas: [sagas, searchFormSagas],
  inputDispatches: inputDispatches
}

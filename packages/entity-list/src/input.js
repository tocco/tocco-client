import {setShowSearchForm} from './modules/entityList/actions'
import {setPreselectedSearchFields, setDisableSimpleSearch, setSimpleSearchFields} from './modules/searchForm/actions'
import {setLimit, setSearchFilters} from './modules/list/actions'

export const getDispatchActions = input => (
  [
    setShowSearchForm(input.showSearchForm),
    setLimit(input.limit),
    setSearchFilters(input.searchFilters),
    setPreselectedSearchFields(input.preselectedSearchFields),
    setDisableSimpleSearch(input.disableSimpleSearch),
    setSimpleSearchFields(input.simpleSearchFields)
  ]
)

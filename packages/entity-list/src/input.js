import {setShowSearchForm} from './modules/entityList/actions'
import {setPreselectedSearchFields, setDisableSimpleSearch, setSimpleSearchFields} from './modules/searchForm/actions'
import {setLimit, setSearchFilters, setColumnDefinition} from './modules/list/actions'
import {columnDefinitionTransformer} from './util/api/forms'
export const getDispatchActions = input => (
  [
    setColumnDefinition(columnDefinitionTransformer({
      form: {
        children: [{
          name: 'table',
          children: input.formDefinition.children
        }]
      }
    })),
    setShowSearchForm(input.showSearchForm),
    setLimit(input.limit),
    setSearchFilters(input.searchFilters),
    setPreselectedSearchFields(input.preselectedSearchFields),
    setDisableSimpleSearch(input.disableSimpleSearch),
    setSimpleSearchFields(input.simpleSearchFields)
  ]
)

import {setShowSearchForm, setEntityName} from './modules/entityList/actions'
import {
  setSearchFormName,
  setPreselectedSearchFields,
  setDisableSimpleSearch,
  setSimpleSearchFields
} from './modules/searchForm/actions'
import {setLimit, setSearchFilters, setColumnDefinition} from './modules/list/actions'
import {columnDefinitionTransformer} from './util/api/forms'

export const getDispatchActions = input => {
  const actions = [
    setEntityName(input.entityName),
    setColumnDefinition(columnDefinitionTransformer({
      form: {
        children: [input.tableDefinition]
      }
    }))
  ]

  if (input.limit) {
    actions.push(setLimit(input.limit))
  }

  if (input.searchFilters) {
    actions.push(setSearchFilters(input.searchFilters))
  }

  if (input.searchFormName) {
    actions.push(setSearchFormName(input.searchFormName))
  } else {
    actions.push(setSearchFormName(`${input.entityName}_search`))
  }

  if (typeof input.showSearchForm === 'boolean') {
    actions.push(setShowSearchForm(input.showSearchForm))
  }

  if (typeof input.disableSimpleSearch === 'boolean') {
    actions.push(setDisableSimpleSearch(input.disableSimpleSearch))
  }

  if (input.preselectedSearchValues) {
    actions.push(setPreselectedSearchFields(input.preselectedSearchValues))
  }

  if (input.simpleSearchFields) {
    actions.push(setSimpleSearchFields(input.simpleSearchFields))
  }

  return actions
}

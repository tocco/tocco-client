import {setShowSearchForm, setEntityName, setShowCreateButton} from './modules/entityList/actions'
import {
  setSearchFormName,
  setPreselectedSearchFields,
  setDisableSimpleSearch,
  setSimpleSearchFields
} from './modules/searchForm/actions'
import {setLimit, setSearchFilters, setListFormName} from './modules/list/actions'

export const getDispatchActions = input => {
  const actions = [
    setEntityName(input.entityName),
    setListFormName(`${input.formBase}_list`),
    setSearchFormName(`${input.formBase}_search`),
    setPreselectedSearchFields(input.preselectedSearchFields || [])
  ]

  if (input.limit) {
    actions.push(setLimit(input.limit))
  }

  if (input.searchFilters) {
    actions.push(setSearchFilters(input.searchFilters))
  }

  if (typeof input.showSearchForm === 'boolean') {
    actions.push(setShowSearchForm(input.showSearchForm))
  }

  if (typeof input.showCreateButton === 'boolean') {
    actions.push(setShowCreateButton(input.showCreateButton))
  }

  if (typeof input.disableSimpleSearch === 'boolean') {
    actions.push(setDisableSimpleSearch(input.disableSimpleSearch))
  }

  if (input.simpleSearchFields) {
    actions.push(setSimpleSearchFields(input.simpleSearchFields))
  }

  return actions
}

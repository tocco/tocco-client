import {setShowSearchForm, setEntityName, setShowCreateButton} from './modules/entityList/actions'
import {
  setSearchFormName,
  setPreselectedSearchFields,
  setDisableSimpleSearch,
  setSimpleSearchFields
} from './modules/searchForm/actions'
import {setLimit, setSearchFilters, setListFormName, setSelection} from './modules/list/actions'

const isDefined = value => !(value === undefined || value === null)

export const getDispatchActions = (input, init) =>
  actionSettings.reduce((acc, actionSetting) => {
    if (isDefined(input[actionSetting.name])) {
      acc.push(actionSetting.action(...actionSetting.argsFactory(input)))
    } else if (init && actionSetting.defaultInitalValue) {
      acc.push(actionSetting.action(actionSetting.defaultInitalValue))
    }

    return acc
  }, [])

const actionSettings = [
  {
    name: 'entityName',
    action: setEntityName,
    argsFactory: input => [input.entityName]
  }, {
    name: 'formBase',
    action: setListFormName,
    argsFactory: input => [`${input.formBase}_list`]
  }, {
    name: 'formBase',
    action: setSearchFormName,
    argsFactory: input => [`${input.formBase}_search`]
  },
  {
    name: 'limit',
    action: setLimit,
    argsFactory: input => [input.limit]
  },
  {
    name: 'preselectedSearchFields',
    action: setPreselectedSearchFields,
    defaultInitalValue: [],
    argsFactory: input => [input.preselectedSearchFields]
  },
  {
    name: 'searchFilters',
    action: setSearchFilters,
    argsFactory: input => [input.searchFilters]
  },
  {
    name: 'showSearchForm',
    action: setShowSearchForm,
    argsFactory: input => [input.showSearchForm]
  }, {
    name: 'showCreateButton',
    action: setShowCreateButton,
    argsFactory: input => [input.showCreateButton]
  },
  {
    name: 'disableSimpleSearch',
    action: setDisableSimpleSearch,
    argsFactory: input => [input.disableSimpleSearch]
  },
  {
    name: 'simpleSearchFields',
    action: setSimpleSearchFields,
    argsFactory: input => [input.simpleSearchFields]
  },
  {
    name: 'selection',
    type: 'boolean',
    action: setSelection,
    argsFactory: input => [input.selection]
  }
]

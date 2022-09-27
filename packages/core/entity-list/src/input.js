import {action} from 'tocco-util'

import {setSearchFormCollapsedInitialValue, setSearchFormTypeFromInput} from './modules/entityList/actions'
import {setSearchFilters, setFormDefinition as setListFormDefinition} from './modules/list/actions'
import {setSimpleSearchFields} from './modules/searchForm/actions'
import {setSelection} from './modules/selection/actions'

export const getDispatchActions = input => action.getDispatchActions(input, actionSettings)

export const reloadOptions = {
  ALL: 3,
  DATA: 2,
  NOTHING: 1
}

export const getReloadOption = input => {
  return Object.keys(input).reduce((res, key) => {
    const actionSetting = actionSettings.find(aS => aS.name === key)
    if (actionSetting && actionSetting.reload > res) {
      return actionSetting.reload
    }
    return res
  }, reloadOptions.NOTHING)
}

const actionSettings = [
  {
    name: 'entityName',
    argsFactory: input => [input.entityName],
    reload: reloadOptions.ALL
  },
  {
    name: 'formName',
    argsFactory: input => [input.formName],
    reload: reloadOptions.ALL
  },
  {
    name: 'limit',
    argsFactory: input => [input.limit],
    reload: reloadOptions.DATA
  },
  {
    name: 'scope',
    argsFactory: input => [input.scope],
    reload: reloadOptions.ALL
  },
  {
    name: 'searchFilters',
    action: setSearchFilters,
    argsFactory: input => [input.searchFilters],
    reload: reloadOptions.DATA
  },
  {
    name: 'searchFormType',
    action: setSearchFormTypeFromInput,
    argsFactory: input => [input.searchFormType],
    reload: reloadOptions.DATA
  },
  {
    name: 'searchFormPosition',
    argsFactory: input => [input.searchFormPosition],
    reload: reloadOptions.DATA
  },
  {
    name: 'simpleSearchFields',
    action: setSimpleSearchFields,
    argsFactory: input => [input.simpleSearchFields],
    reload: reloadOptions.DATA
  },
  {
    name: 'selection',
    type: 'boolean',
    action: setSelection,
    argsFactory: input => [input.selection],
    reload: reloadOptions.NOTHING
  },
  {
    name: 'scrollBehaviour',
    argsFactory: input => [input.scrollBehaviour],
    reload: reloadOptions.NOTHING
  },
  {
    name: 'parent',
    argsFactory: input => [input.parent],
    reload: reloadOptions.DATA
  },
  {
    name: 'listFormDefinition',
    action: setListFormDefinition,
    argsFactory: input => [input.listFormDefinition],
    reload: reloadOptions.ALL
  },
  {
    name: 'showLink',
    argsFactory: input => [input.showLink],
    reload: reloadOptions.NOTHING
  },
  {
    name: 'sortable',
    argsFactory: input => [input.sortable],
    reload: reloadOptions.NOTHING
  },
  {
    name: 'tql',
    argsFactory: input => [input.tql],
    reload: reloadOptions.DATA
  },
  {
    name: 'keys',
    argsFactory: input => [input.keys],
    reload: reloadOptions.DATA
  },
  {
    name: 'searchFilters',
    argsFactory: input => [input.searchFilters],
    reload: reloadOptions.DATA
  },
  {
    name: 'constriction',
    argsFactory: input => [input.constriction],
    reload: reloadOptions.DATA
  },
  {
    name: 'searchFormCollapsed',
    action: setSearchFormCollapsedInitialValue,
    argsFactory: input => [input.searchFormCollapsed],
    reload: reloadOptions.NOTHING
  }
]

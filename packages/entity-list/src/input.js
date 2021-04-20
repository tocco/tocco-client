import {
  setSearchFormType,
  setFormName,
  setEntityName,
  setParent,
  setSearchFormPosition
} from './modules/entityList/actions'
import {
  setDisableSimpleSearch,
  setSimpleSearchFields
} from './modules/searchForm/actions'
import {
  setLimit,
  setSearchFilters,
  setFormDefinition as setListFormDefinition,
  setShowLink
} from './modules/list/actions'
import {setSelection} from './modules/selection/actions'

const isDefined = value => value !== undefined

export const getDispatchActions = input =>
  actionSettings.reduce((acc, actionSetting) => {
    if (isDefined(input[actionSetting.name])) {
      acc.push(actionSetting.action(...actionSetting.argsFactory(input)))
    }
    return acc
  }, [])

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
    action: setEntityName,
    argsFactory: input => [input.entityName],
    reload: reloadOptions.ALL
  },
  {
    name: 'formName',
    action: setFormName,
    argsFactory: input => [input.formName],
    reload: reloadOptions.ALL
  },
  {
    name: 'limit',
    action: setLimit,
    argsFactory: input => [input.limit],
    reload: reloadOptions.DATA
  },
  {
    name: 'searchFilters',
    action: setSearchFilters,
    argsFactory: input => [input.searchFilters],
    reload: reloadOptions.DATA
  },
  {
    name: 'searchFormType',
    action: setSearchFormType,
    argsFactory: input => [input.searchFormType],
    reload: reloadOptions.DATA
  },
  {
    name: 'searchFormPosition',
    action: setSearchFormPosition,
    argsFactory: input => [input.searchFormPosition],
    reload: reloadOptions.DATA
  },
  {
    name: 'disableSimpleSearch',
    action: setDisableSimpleSearch,
    argsFactory: input => [input.disableSimpleSearch],
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
    name: 'parent',
    action: setParent,
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
    action: setShowLink,
    argsFactory: input => [input.showLink],
    reload: reloadOptions.NOTHING
  }
]

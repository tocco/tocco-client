import {action} from 'tocco-util'

import {setEntityName, setFormBase, setAppId, setScrollBehaviour} from './modules/entityBrowser/actions'

export const getDispatchActions = (input, checkMandatory = true) =>
  action.getDispatchActions(input, actionSettings, checkMandatory)

const actionSettings = [
  {
    name: 'entityName',
    action: setEntityName,
    mandatory: true,
    argsFactory: input => [input.entityName]
  },
  {
    name: 'entityName',
    action: setFormBase,
    argsFactory: input => [input.formBase || input.entityName]
  },
  {
    name: 'formBase',
    action: setFormBase,
    argsFactory: input => [input.formBase]
  },
  {
    name: 'scrollBehaviour',
    action: setScrollBehaviour,
    argsFactory: input => [input.scrollBehaviour]
  },
  {
    name: 'id',
    action: setAppId,
    argsFactory: input => [input.id || new Date().valueOf()]
  }
]

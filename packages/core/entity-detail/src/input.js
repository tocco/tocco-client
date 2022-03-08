import {action} from 'tocco-util'

import {
  loadDetailView,
  setAppId,
  setDefaultValues,
  setEntityId,
  setEntityName,
  setFormName,
  setMode
} from './modules/entityDetail/actions'

export const getDispatchActions = input => {
  const actions = action.getDispatchActions(input, actionSettings)

  if (actions.length > 0) {
    actions.push(loadDetailView())
  }

  return actions
}

const actionSettings = [
  {
    name: 'entityName',
    action: setEntityName,
    argsFactory: input => [input.entityName]
  },
  {
    name: 'entityId',
    action: setEntityId,
    argsFactory: input => [input.entityId || null]
  },
  {
    name: 'mode',
    action: setMode,
    argsFactory: input => [input.mode]
  },
  {
    name: 'formName',
    action: setFormName,
    argsFactory: input => [input.formName]
  },
  {
    name: 'id',
    action: setAppId,
    argsFactory: input => [input.id]
  },
  {
    name: 'defaultValues',
    action: setDefaultValues,
    argsFactory: input => [input.defaultValues]
  }
]

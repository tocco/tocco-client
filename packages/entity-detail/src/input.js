import {
  loadDetailView,
  setEntityName,
  setEntityId,
  setFormName,
  setMode,
  setAppId,
  setDefaultValues
} from './modules/entityDetail/actions'

export const getDispatchActions = input => ([
  setEntityName(input.entityName),
  setEntityId(input.entityId ? input.entityId : null),
  setMode(input.mode),
  setFormName(input.formName),
  setAppId(input.id),
  setDefaultValues(input.defaultValues),
  loadDetailView()
])

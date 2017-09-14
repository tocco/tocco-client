import {
  loadDetailView,
  setEntityName,
  setEntityId,
  setFormName,
  setMode
} from './modules/entityDetail/actions'

export const getDispatchActions = input => ([
  setEntityName(input.entityName),
  setEntityId(input.entityId),
  setMode(input.mode),
  setFormName(input.formName),
  loadDetailView()
])

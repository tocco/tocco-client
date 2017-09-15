import {
  loadDetailView,
  setEntityName,
  setEntityId,
  setFormName,
  setMode,
  setShowSubGridsCreateButton
} from './modules/entityDetail/actions'

export const getDispatchActions = input => ([
  setEntityName(input.entityName),
  setEntityId(input.entityId),
  setMode(input.mode),
  setFormName(input.formName),
  setShowSubGridsCreateButton(input.showSubGridsCreateButton),
  loadDetailView()
])

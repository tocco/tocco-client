export default function* (definition, selection, parent, params, config) {
  const actionDefinition = new window.nice2.netui.actions.model.ClientActionDefinition(definition.id, definition.id)
  actionDefinition.setEnabled(!definition.readOnly)

  const entityExplorer = new window.nice2.modules.NewClientLegacyActionsModule({
    entityName: selection.entityName,
    formName: selection.entityName
  })
  entityExplorer.init()

  const ctx = new window.nice2.modules.entityexplorer.EntityExplorerActionContext(entityExplorer, null)

  const situation = {
    entityName: selection.entityName
  }

  const action = window.NetuiActionRegistry.newActionFromDefinition(actionDefinition, situation, ctx)

  action.getSelectionNumber = function() {
    return selection.ids.length
  }
  action.getSelection = function() {
    return {
      entityName: selection.entityName,
      selectedEntities: selection.ids
    }
  }

  action.perform()
}

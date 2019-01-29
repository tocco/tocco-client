import selectionModes from './../util/selectionModes'

export const deriveSelectionFromState = state => {
  const {selection} = state

  if (selection.selectionMode === selectionModes.ALL) {
    return {
      entityName: state.entityList.entityName,
      type: 'QUERY',
      query: selection.query,
      count: selection.queryCount || 0
    }
  }

  return {
    entityName: state.entityList.entityName,
    type: 'ID',
    ids: selection.selection,
    count: selection.selection.length || 0
  }
}

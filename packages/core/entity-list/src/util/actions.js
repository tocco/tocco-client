export const deriveSelectionFromState = state => {
  const {selection, input} = state

  if (selection.selection.length > 0 || input.selectionStyle === 'multi_explicit') {
    return {
      entityName: state.input.entityName,
      type: 'ID',
      ids: selection.selection,
      count: selection.selection.length || 0
    }
  }

  return {
    entityName: state.input.entityName,
    type: 'QUERY',
    query: selection.query,
    count: selection.queryCount || 0
  }
}

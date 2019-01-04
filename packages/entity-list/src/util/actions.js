import selectionModes from './../util/selectionModes'

export const deriveSelectionFromState = state => {
  const {selection} = state

  if (selection.selectionMode === selectionModes.ALL) {
    return {
      mode: 'QUERY',
      payload: selection.query,
      count: selection.queryCount || 0
    }
  }

  return {
    mode: 'ID',
    payload: selection.selection,
    count: selection.selection.length || 0
  }
}

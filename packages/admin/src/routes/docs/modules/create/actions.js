export const OPEN_DIALOG = 'docs/create/OPEN_DIALOG'
export const FILES_SELECTED = 'docs/create/FILES_SELECTED'

export const openDialog = (location, onSuccess, onError) => ({
  type: OPEN_DIALOG,
  payload: {
    location,
    onSuccess,
    onError
  }
})

export const filesSelected = files => ({
  type: FILES_SELECTED,
  payload: {
    files
  }
})

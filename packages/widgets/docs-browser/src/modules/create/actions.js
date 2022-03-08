export const OPEN_DIALOG = 'docs/create/OPEN_DIALOG'
export const FILES_SELECTED = 'docs/create/FILES_SELECTED'

export const openDialog = (directory, onSuccess, onError) => ({
  type: OPEN_DIALOG,
  payload: {
    directory,
    onSuccess,
    onError
  }
})

export const filesSelected = (location, files, isDirectory) => ({
  type: FILES_SELECTED,
  payload: {
    location,
    files,
    isDirectory
  }
})

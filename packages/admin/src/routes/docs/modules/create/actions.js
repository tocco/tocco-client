export const OPEN_DIALOG = 'docs/create/OPEN_DIALOG'
export const FILES_SELECTED = 'docs/create/FILES_SELECTED'

export const openDialog = (location, directory, onSuccess, onError) => ({
  type: OPEN_DIALOG,
  payload: {
    location,
    directory,
    onSuccess,
    onError
  }
})

export const filesSelected = (files, isDirectory) => ({
  type: FILES_SELECTED,
  payload: {
    files,
    isDirectory
  }
})

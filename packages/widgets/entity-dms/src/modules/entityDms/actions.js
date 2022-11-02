export const LOAD_FOLDER_KEY = 'entityDms/LOAD_FOLDER_KEY'
export const SET_FOLDER_KEY = 'entityDms/SET_FOLDER_KEY'

export const loadFolderKey = () => ({
  type: LOAD_FOLDER_KEY
})

export const setFolderKey = folderKey => ({
  type: SET_FOLDER_KEY,
  payload: {
    folderKey
  }
})

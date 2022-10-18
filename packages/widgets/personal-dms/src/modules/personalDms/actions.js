export const LOAD_PERSONAL_FOLDER_KEY = 'personalDms/LOAD_PERSONAL_FOLDER_KEY'
export const SET_PERSONAL_FOLDER_KEY = 'personalDms/SET_PERSONAL_FOLDER_KEY'

export const loadPersonalFolderKey = () => ({
  type: LOAD_PERSONAL_FOLDER_KEY
})

export const setPersonalFolderKey = personalFolderKey => ({
  type: SET_PERSONAL_FOLDER_KEY,
  payload: {
    personalFolderKey
  }
})

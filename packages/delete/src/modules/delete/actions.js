export const LOAD_DIALOG_INFO = 'root/LOAD_DIALOG_INFO'
export const SET_DIALOG_INFO = 'delete/SET_DELETE_DIALOG_INFO'
export const DO_DELETE = 'delete/DO_DELETE'
export const SET_DELETING_IN_PROGRESS = 'delete/SET_DELETING_IN_PROGRESS'
export const ON_CANCEL = 'delete/ON_CANCEL'

export const
  loadDialogInfo = () => ({
    type: LOAD_DIALOG_INFO
  })

export const setDeleteDialogInfo = dialogInfo => ({
  type: SET_DIALOG_INFO,
  payload: {
    dialogInfo
  }
})

export const doDelete = () => ({
  type: DO_DELETE
})

export const setDeletingInProgress = deletingInProgress => ({
  type: SET_DELETING_IN_PROGRESS,
  payload: {
    deletingInProgress
  }
})

export const onCancel = () => ({
  type: ON_CANCEL
})

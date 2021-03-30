export const CHANGE_LIST_PARENT = 'docs/list/CHANGE_LIST_PARENT'
export const SET_FORM_NAME = 'docs/list/SET_FORM_NAME'

export const changeListParent = parent => ({
  type: CHANGE_LIST_PARENT,
  payload: {
    parent
  }
})

export const setFormName = formName => ({
  type: SET_FORM_NAME,
  payload: {
    formName
  }
})

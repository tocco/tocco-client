export const CHANGE_LIST_PARENT = 'docs/list/CHANGE_LIST_PARENT'

export const changeListParent = parent => ({
  type: CHANGE_LIST_PARENT,
  payload: {
    parent
  }
})

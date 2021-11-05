export const CHANGE_LIST_PARENT = 'docs/list/CHANGE_LIST_PARENT'
export const CHANGE_SELECTION = 'docs/list/CHANGE_SELECTION'
export const CHANGE_SEARCH_FORM_COLLAPSED = 'docs/list/CHANGE_SEARCH_FORM_COLLAPSED'
export const SET_SEARCH_FORM_COLLAPSED = 'docs/list/SET_SEARCH_FORM_COLLAPSED'

export const changeListParent = parent => ({
  type: CHANGE_LIST_PARENT,
  payload: {
    parent
  }
})

export const changeSelection = selection => ({
  type: CHANGE_SELECTION,
  payload: {
    selection
  }
})

export const changeSearchFormCollapsed = collapsed => ({
  type: CHANGE_SEARCH_FORM_COLLAPSED,
  payload: {
    collapsed
  }
})

export const setSearchFormCollapsed = searchFormCollapsed => ({
  type: SET_SEARCH_FORM_COLLAPSED,
  payload: {
    searchFormCollapsed
  }
})

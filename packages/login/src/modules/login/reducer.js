import {CHANGE_PAGE} from './actions'
import {Pages} from './../../types/Pages'

function changePage(state, {payload}) {
  const {page} = payload
  return {
    ...state,
    currentPage: page
  }
}

const ACTION_HANDLERS = {
  [CHANGE_PAGE]: changePage
}

export default function reducer(state = {currentPage: Pages.LOGIN_FORM}, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

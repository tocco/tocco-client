import {CHANGE_PAGE} from './actions'

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

var initialState = {status: 'init'}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

import fetch from 'isomorphic-fetch'

export const REQUEST_FORM = 'REQUEST_FORM'
export const RECEIVE_FORM = 'RECEIVE_FORM'

function requestForm(name) {
  return {
    type: REQUEST_FORM,
    name
  }
}

function receiveForm(name, json) {
  return {
    type: RECEIVE_FORM,
    name,
    form: json.form,
    receivedAt: Date.now()
  }
}

export function fetchForm(name) {
  return (dispatch, getState) => {
    if (getState().forms[name]) {
      return null
    }
    dispatch(requestForm(name))
    return fetch(`${__BACKEND_URL__}/nice2/rest/forms/${name}`)
      .then(response => response.json())
      .then(json => dispatch(receiveForm(name, json)))
  }
}

const ACTION_HANDLERS = {
  [RECEIVE_FORM]: (forms, { name, form }) => {
    return Object.assign({}, forms, { [name]: form })
  }
}

const initialState = {}

export default function formsReducer(state = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

import fetch from 'isomorphic-fetch'

export const REQUEST_FORM = 'REQUEST_FORM'
export const RECEIVE_FORM = 'RECEIVE_FORM'

function requestForm() {
  return {
    type: REQUEST_FORM
  }
}

function receiveForm(json) {
  return {
    type: RECEIVE_FORM,
    form: json.form,
    receivedAt: Date.now()
  }
}

export function fetchForm(name) {
  return dispatch => {
    dispatch(requestForm())
    return fetch(`http://localhost:8080/nice2/rest/forms/${name}`)
      .then(response => response.json())
      .then(json => dispatch(receiveForm(json)))
  }
}

const ACTION_HANDLERS = {
  [RECEIVE_FORM]: (state, { form }) => {
    return form;
  }
}

const initialState = null

export default function formReducer(state = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

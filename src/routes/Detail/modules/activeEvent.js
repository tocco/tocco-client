import fetch from 'isomorphic-fetch'

export const REQUEST_EVENT = 'REQUEST_EVENT'
export const RECEIVE_EVENT = 'RECEIVE_EVENT'
export const REQUEST_EVENT_FAILURE = 'REQUEST_EVENT_FAILURE'

function requestEvent() {
  return {
    type: REQUEST_EVENT
  }
}

function receiveEvent(json) {
  return {
    type: RECEIVE_EVENT,
    event: json,
    receivedAt: Date.now()
  }
}

function requestEventFailure() {
  return {
    type: REQUEST_EVENT_FAILURE
  }
}

export function fetchEvent(key) {
  return dispatch => {
    dispatch(requestEvent())
    return fetch(`http://localhost:8080/nice2/rest/entities/Event/${key}`)
      .then(resp => {
        if (resp.ok === true) {
          return resp.json()
        }
        throw Error(resp.statusText)
      })
      .then(json => dispatch(receiveEvent(json)))
      .catch(error => dispatch(requestEventFailure()))
  }
}

const ACTION_HANDLERS = {
  [REQUEST_EVENT]: activeEvent => Object.assign({}, activeEvent, {
    data: null,
    loading: true,
    failure: false
  }),
  [RECEIVE_EVENT]: (activeEvent, { event: newEvent }) => Object.assign({}, activeEvent, {
    data: newEvent,
    loading: false
  }),
  [REQUEST_EVENT_FAILURE]: activeEvent => Object.assign({}, activeEvent, {
    data: null,
    loading: false,
    failure: true
  }),
}

const initialState = {
  data: null,
  loading: true,
  failure: false
}

export default function activeEventReducer (state = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

import fetch from 'isomorphic-fetch'

export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'

function requestEvents() {
  return {
    type: REQUEST_EVENTS
  }
}

function receiveEvents(json) {
  return {
    type: RECEIVE_EVENTS,
    events: json.data,
    receivedAt: Date.now()
  }
}

export function fetchEvents(searchTerm) {
  return dispatch => {
    dispatch(requestEvents())
    return fetch(`http://localhost:8080/nice2/rest/entities/Event?_search=${searchTerm}`)
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
  }
}

const ACTION_HANDLERS = {
  [RECEIVE_EVENTS]: (events, { events: newEvents }) => {
    return [].concat(newEvents);
  }
}

const initialState = []

export default function listReducer (state: list = initialState, action: Action): list {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

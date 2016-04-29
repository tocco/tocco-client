import fetch from 'isomorphic-fetch'

export const REQUEST_ENTITY = 'REQUEST_ENTITY'
export const RECEIVE_ENTITY = 'RECEIVE_ENTITY'
export const REQUEST_ENTITY_FAILURE = 'REQUEST_ENTITY_FAILURE'

function requestEntity() {
  return {
    type: REQUEST_ENTITY
  }
}

function receiveEntity(json) {
  return {
    type: RECEIVE_ENTITY,
    data: json,
    receivedAt: Date.now()
  }
}

function requestEntityFailure() {
  return {
    type: REQUEST_ENTITY_FAILURE
  }
}

export function fetchEntity(model, key) {
  return dispatch => {
    dispatch(requestEntity())
    return fetch(`http://localhost:8080/nice2/rest/entities/${model}/${key}`)
      .then(resp => {
        if (resp.ok === true) {
          return resp.json()
        }
        throw Error(resp.statusText)
      })
      .then(json => dispatch(receiveEntity(json)))
      .catch(error => {
        if (console) console.error(error)
        dispatch(requestEntityFailure())
      })
  }
}

const ACTION_HANDLERS = {
  [REQUEST_ENTITY]: state => Object.assign({}, state, {
    data: null,
    loading: true,
    failure: false
  }),
  [RECEIVE_ENTITY]: (state, { data }) => Object.assign({}, state, {
    data,
    loading: false
  }),
  [REQUEST_ENTITY_FAILURE]: state => Object.assign({}, state, {
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

export default function detailReducer(state = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

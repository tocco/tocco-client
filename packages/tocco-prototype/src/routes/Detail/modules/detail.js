import fetch from 'isomorphic-fetch'
import getChangedFields from '../../../utils/changedFields'

export const REQUEST_ENTITY = 'REQUEST_ENTITY'
export const RECEIVE_ENTITY = 'RECEIVE_ENTITY'
export const REQUEST_ENTITY_FAILURE = 'REQUEST_ENTITY_FAILURE'

export const UPDATE_ENTITY = 'UPDATE_ENTITY'
export const UPDATE_ENTITY_SUCCESS = 'UPDATE_ENTITY_SUCCESS'
export const UPDATE_ENTITY_FAILURE = 'UPDATE_ENTITY_FAILURE'

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
    return fetch(`${__BACKEND_URL__}/nice2/rest/entities/${model}/${key}`, {
      credentials: 'include'
    })
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

function requestUpdateEntity() {
  return {
    type: UPDATE_ENTITY
  }
}

function updateEntitySuccess() {
  return {
    type: UPDATE_ENTITY_SUCCESS
  }
}

function updateEntityFailure() {
  return {
    type: UPDATE_ENTITY_FAILURE
  }
}

export function updateEntity(data) {
  return (dispatch, getState) => {
    dispatch(requestUpdateEntity())

    const { fields, model, key, version } = getState().detail.data

    const changedFields = getChangedFields(fields, data)

    const newBean = {
      model,
      key,
      version,
      fields: changedFields
    }

    const options = {
      method: 'PATCH',
      body: JSON.stringify(newBean),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'include'
    }

    return fetch(`${__BACKEND_URL__}/nice2/rest/entities/${model}/${key}`, options)
      .then(resp => {
        if (resp.ok === true) {
          dispatch(updateEntitySuccess())
        } else {
          throw Error(resp.statusText)
        }
      })
      .catch(error => {
        if (console) console.error(error)
        dispatch(updateEntityFailure())
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
  })
}

const initialState = {
  data: null,
  loading: true,
  failure: false
}

export default function detailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

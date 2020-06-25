import queryStringUtil from 'query-string'
import {call} from 'redux-saga/effects'

import selectionTypes from './selectionTypes'

export const selectionToQueryString = selection =>
  `selection=${encodeURIComponent(JSON.stringify(selection))}`

export const queryStringToSelection = queryString => {
  const obj = queryStringUtil.parse(queryString)
  return obj.selection ? JSON.parse(obj.selection) : null
}

export function* getEntities(selection, fetchEntities) {
  const {entityName} = selection
  if (selection.type === selectionTypes.QUERY) {
    const entities = yield call(fetchEntities, selection.entityName, {...selection.query, limit: 100000})
    return {
      entityName,
      keys: entities.map(e => e.key)
    }
  }

  return {
    entityName,
    keys: selection.ids
  }
}

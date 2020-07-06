import queryStringUtil from 'query-string'
import {call} from 'redux-saga/effects'

import consoleLogger from '../consoleLogger'
import selectionTypes from './selectionTypes'

export const selectionToQueryString = selection =>
  `selection=${encodeURIComponent(JSON.stringify(selection))}`

export const queryStringToSelection = queryString => {
  const obj = queryStringUtil.parse(queryString)
  return obj.selection ? JSON.parse(obj.selection) : null
}

const limit = 100000
/**
 * Helper to get all entitiy keys of a selection.
 * @param {object}  selection - selection object
 * @param {function} fetchEntities - rest helper function
 * @returns {object} Object containing entityName and an array of keys (limited if selection is query)
 */
export function* getEntities(selection, fetchEntities) {
  const {entityName} = selection
  if (selection.type === selectionTypes.QUERY) {
    const entities = yield call(fetchEntities, selection.entityName, {...selection.query, limit})

    if (entities.length > limit) {
      yield call(consoleLogger.logError, `Selected records exceed limit of ${limit}`)
    }

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

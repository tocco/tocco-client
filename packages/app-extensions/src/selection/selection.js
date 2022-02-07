import {call} from 'redux-saga/effects'
import {consoleLogger} from 'tocco-util'

import selectionTypes from './selectionTypes'

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

/**
 * Helper to get single entity key of a seletion.
 * Throws error
 *  - if wront entity is selected
 *  - if `selection.type` is not `ID`
 *  - if none or more than one entity is selected
 * @param {object} selection - selection object
 * @param {string} expectedEntityName - selected entityName
 * @returns {string} ID of single selected entity
 */
export const getSingleKey = (selection, expectedEntityName) => {
  if (selection.entityName !== expectedEntityName) {
    throw new Error(`Only selection of ${expectedEntityName} supported`)
  }
  if (selection.type !== 'ID') {
    throw new Error('Only ID selection type supported')
  }
  if (!selection.ids || selection.ids.length !== 1) {
    throw new Error(`Exactly one ${expectedEntityName} must be selected`)
  }
  return selection.ids[0]
}

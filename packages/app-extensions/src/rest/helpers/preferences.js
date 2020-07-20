import {call} from 'redux-saga/effects'

import {requestSaga} from '../rest'

/**
 * To fetch user preferences.
 *
 * @param path {string} To load specific preferences matching the path. Wildcards (e.g. *) may be used.
 */
export function* fetchUserPreferences(path) {
  const response = yield call(requestSaga, `client/preferences${path ? '/' + path : ''}`)
  return response.body.preferences
}

/**
 * Deletes all preferences matching the path.
 *
 * @param path {string} All preferences matching the path will be deleted. Wildcards (e.g. *) may be used.
 */
export function* deleteUserPreferences(path) {
  yield call(requestSaga, `client/preferences/${path}`, {method: 'DELETE'})
}

/**
 * To add or overwrite preferences.
 *
 * @param preferences {object} Key/Value pairs.
 */
export function* savePreferences(preferences) {
  yield call(requestSaga, 'client/preferences', {method: 'PUT', body: {values: preferences}})
}

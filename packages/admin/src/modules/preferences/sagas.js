import {rest} from 'tocco-app-extensions'
import {all, call, put, takeLatest, takeLeading} from 'redux-saga/effects'

import {transformValues} from './preferences'
import * as actions from './actions'

export function* loadSettingsAndPreferences() {
  const settings = yield call(rest.fetchServerSettings)
  yield put(actions.setServerSettings(settings))

  const preferences = yield call(rest.fetchUserPreferences, 'admin.*')
  const transformedPreferences = yield call(transformValues, preferences)
  yield put(actions.setUserPreferences(transformedPreferences))
}

export function* saveUserPreference({payload: {key, value}}) {
  yield call(rest.savePreferences, {
    [key]: value
  })
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_SETTINGS_AND_PREFERENCES, loadSettingsAndPreferences),
    takeLeading(actions.SAVE_USER_PREFERENCE, saveUserPreference)
  ])
}

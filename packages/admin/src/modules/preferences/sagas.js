import {rest} from 'tocco-app-extensions'
import {takeLatest, call, all, put} from 'redux-saga/effects'

import {transformValues} from './preferences'
import * as actions from './actions'

export function* loadSettingsAndPreferences() {
  const settings = yield call(rest.fetchServerSettings)
  yield put(actions.setServerSettings(settings))

  const adminPreferences = yield call(rest.fetchUserPreferences, 'admin.*')
  const transformedAdminPreferences = yield call(transformValues, adminPreferences)

  const adminTreePreferences = yield call(rest.fetchUserPreferences, 'admintree.*')
  const transformedAdminTreePreferences = yield call(transformValues, adminTreePreferences)

  yield put(actions.setUserPreferences({...transformedAdminTreePreferences, ...transformedAdminPreferences}))
}

export function* saveUserPreference({payload: {key, value}}) {
  yield call(rest.savePreferences, {
    [key]: value
  })
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_SETTINGS_AND_PREFERENCES, loadSettingsAndPreferences),
    takeLatest(actions.SAVE_USER_PREFERENCE, saveUserPreference)
  ])
}

import {takeLatest, call, all, put} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import {transformValues} from './preferences'

export function* loadSettingsAndPreferences() {
  const settings = yield call(rest.fetchServerSettings)
  yield put(actions.setServerSettings(settings))

  const adminPreferences = yield call(rest.fetchUserPreferences, 'admin.*')
  const transformedAdminPreferences = yield call(transformValues, adminPreferences)

  const adminTreePreferences = yield call(rest.fetchUserPreferences, 'admintree.*')
  const transformedAdminTreePreferences = yield call(transformValues, adminTreePreferences)

  yield put(actions.setUserPreferences({...transformedAdminTreePreferences, ...transformedAdminPreferences}))
}

export function* saveUserPreferences({payload: {preferences}}) {
  yield call(rest.savePreferences, preferences)
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_SETTINGS_AND_PREFERENCES, loadSettingsAndPreferences),
    takeLatest(actions.SAVE_USER_PREFERENCES, saveUserPreferences)
  ])
}

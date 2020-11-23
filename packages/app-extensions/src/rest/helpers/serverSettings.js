import {call} from 'redux-saga/effects'
import {cache} from 'tocco-util'
import _omit from 'lodash/omit'

import {requestSaga} from '../rest'

/**
 * To fetch server settings containing:
 * runEnv
 * captchaKey
 */
export function* fetchServerSettings() {
  const cachedSettings = cache.getLongTerm('server', 'settings')
  if (cachedSettings !== undefined) {
    return cachedSettings
  }

  const settingsResponse = yield call(requestSaga, 'client/settings')
  const settings = _omit(settingsResponse.body, ['_links'])

  yield cache.addLongTerm('server', 'settings', settings)

  return settings
}

export function* hasRevisionIdChanged() {
  const prevSettings = cache.getLongTerm('server', 'settings')
  const settingsResponse = yield call(requestSaga, 'client/settings')
  const settings = _omit(settingsResponse.body, ['_links'])

  yield cache.addLongTerm('server', 'settings', settings)
  return !prevSettings || !prevSettings.niceRevision || prevSettings.niceRevision !== settings.niceRevision
}

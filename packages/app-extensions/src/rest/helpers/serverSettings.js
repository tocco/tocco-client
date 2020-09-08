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
  const cachedSettings = cache.get('server', 'settings')
  if (cachedSettings !== undefined) {
    return cachedSettings
  }

  const settingsResponse = yield call(requestSaga, 'client/settings')
  const settings = _omit(settingsResponse.body, ['_links'])

  yield cache.add('server', 'settings', settings)

  return settings
}

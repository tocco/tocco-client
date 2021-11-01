import {consoleLogger} from 'tocco-util'
import {cache, externalEvents, intl, rest} from 'tocco-app-extensions'
import {takeLatest, put, select, call, all} from 'redux-saga/effects'

import * as actions from './actions'
import * as loginActions from './login/actions'
import {setMessage, setPending, activateRecaptcha} from './loginForm/actions'
import {updateOldPassword} from './passwordUpdate/password/actions'
import {setUsernameOrPk, setForcedUpdate} from './passwordUpdate/dialog/actions'
import {changePage, setPassword} from './login/actions'
import {setSecret} from './twoStepLogin/actions'
import {Pages} from '../types/Pages'

export const DEFAULT_TIMEOUT = 30

export const textResourceSelector = (state, key) => state.intl.messages[key] || key
export const loginSelector = state => state.login

export function doRequest(url, options) {
  return new Promise(resolve => {
    fetch(url, options)
      .then(resp => resp.json().then(json => resolve(json)))
      .catch(e => {
        consoleLogger.logError('Failed to execute request', e)
        resolve({success: false})
      })
  })
}

export function* doLoginRequest(data) {
  return yield call(doRequest, `${__BACKEND_URL__}/nice2/login`, getOptions(data))
}

export function* doSessionRequest() {
  return yield call(doRequest, `${__BACKEND_URL__}/nice2/session`, getOptions())
}

function getOptions(data = {}) {
  return {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }),
    credentials: 'include',
    body: Object.keys(data)
      .filter(k => !!data[k])
      .sort()
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&')
  }
}

export function* handleTwoStepLoginResponse() {
  yield put(changePage(Pages.TWOSTEPLOGIN))
}

export function* handleTwoStepActivationResponse(response) {
  const twoFactorResponse = response[Pages.TWOSTEPLOGIN_ACTIVATION]
  yield put(setSecret(twoFactorResponse))
  yield put(changePage(Pages.TWOSTEPLOGIN_ACTIVATION))
}

export function* handlePasswordUpdateResponse() {
  const login = yield select(loginSelector)
  yield put(updateOldPassword(login.password))
  yield put(setUsernameOrPk(login.username))
  yield put(setForcedUpdate(true))
  yield put(changePage(Pages.PASSWORD_UPDATE))
}

export function* handleBlockResponse() {
  const text = yield select(textResourceSelector, 'client.login.form.blocked')
  yield put(setMessage(text, true))
}

export function* handleFailedResponse() {
  const text = yield select(textResourceSelector, 'client.login.form.failed')
  yield put(setMessage(text, true))
}

export function* handleSuccessfulLogin(response) {
  const [revisionChanged, localChanged] = yield all([call(rest.hasRevisionIdChanged), call(intl.hasUserLocaleChanged)])
  if (revisionChanged || localChanged) {
    yield call(cache.clearAll)
  } else {
    yield call(cache.clearShortTerm)
  }
  yield put(setPassword(''))
  const timeout = response.timeout || DEFAULT_TIMEOUT
  yield put(externalEvents.fireExternalEvent('loginSuccess', {timeout}))
}

export function* loginSaga({payload}) {
  const {username, password, captchaToken, userCode} = payload
  const loginData = {
    username,
    password,
    ...(captchaToken && {captchaToken}),
    ...(userCode && {userCode})
  }
  yield put(setPending(true))

  const response = yield call(doLoginRequest, loginData)
  if (response.success) {
    yield call(handleSuccessfulLogin, response)
  } else {
    yield put(changePage(Pages.LOGIN_FORM)) // in order to display possible error message
    if (response.CAPTCHA) {
      yield put(activateRecaptcha())
    } else if (response.TWOSTEPLOGIN) {
      yield call(handleTwoStepLoginResponse, response)
    } else if (response.RESET_PASSWORD_REQUIRED) {
      yield call(handlePasswordUpdateResponse)
    } else if (response.LOGIN_BLOCKED) {
      yield call(handleBlockResponse)
    } else if (response.TWOSTEPLOGIN_ACTIVATION) {
      yield call(handleTwoStepActivationResponse, response)
    } else {
      yield call(handleFailedResponse)
    }
    yield put(setPending(false))
  }
}

export function* checkSessionSaga() {
  const response = yield call(doSessionRequest)

  if (response.success) {
    yield call(handleSuccessfulLogin, response)
  }
}

export function* loadSettings() {
  const settings = yield call(rest.fetchServerSettings)
  yield put(loginActions.setCaptchaKey(settings.captchaKey))
}

export function* initialize() {
  yield call(checkSessionSaga)
  yield call(loadSettings)
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOGIN, loginSaga),
    takeLatest(actions.INITIALIZE, initialize)
  ])
}

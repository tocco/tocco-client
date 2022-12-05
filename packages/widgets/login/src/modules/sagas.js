import {takeLatest, put, select, call, all} from 'redux-saga/effects'
import {externalEvents, rest, cache as cacheHelpers} from 'tocco-app-extensions'
import {consoleLogger, request, cache, queryString} from 'tocco-util'

import {Pages} from '../types/Pages'
import * as actions from './actions'
import * as loginActions from './login/actions'
import {changePage, setPassword} from './login/actions'
import {setMessage, setPending, activateRecaptcha} from './loginForm/actions'
import {setUsernameOrPk, setForcedUpdate} from './passwordUpdate/dialog/actions'
import {updateOldPassword} from './passwordUpdate/password/actions'
import {setSecret} from './twoStepLogin/actions'

export const DEFAULT_TIMEOUT = 30

export const textResourceSelector = (state, key) => state.intl.messages[key] || key
export const loginSelector = state => state.login
export const inputSelector = state => state.input

export function doRequest(url, options) {
  return new Promise(resolve => {
    request
      .executeRequest(url, options)
      .then(request.extractBody)
      .then(json => resolve(json))
      .catch(e => {
        consoleLogger.logError('Failed to execute request', e)
        resolve({success: false})
      })
  })
}

export function* doLoginRequest(data) {
  return yield call(doRequest, 'login', getOptions(data))
}

export function* doSessionRequest() {
  return yield call(doRequest, 'session', {method: 'POST'})
}

function getOptions(data = {}) {
  return {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }),
    body: Object.keys(data)
      .filter(k => !!data[k])
      .sort()
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
      .join('&')
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

export function* handleRedirect() {
  const redirectUrl = yield loadRedirectUrl()
  if (redirectUrl) {
    window.location.href = redirectUrl
  }
}

export function* loadRedirectUrl() {
  const {_redirect_url: queryUrl} = queryString.fromQueryString(window.location.search)
  if (queryUrl) {
    return queryUrl
  } else {
    const {redirectUrl: inputUrl} = yield select(inputSelector)
    return inputUrl
  }
}

export function* handleSuccessfulLogin(response) {
  const needsCacheInvalidation = yield call(cacheHelpers.hasInvalidCache)
  if (needsCacheInvalidation) {
    yield call(cache.clearAll)
  } else {
    yield call(cache.clearShortTerm)
  }
  yield put(setPassword(''))
  const timeout = response.timeout || DEFAULT_TIMEOUT
  yield put(externalEvents.fireExternalEvent('onVisibilityStateChange', 'success'))
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
    yield call(handleRedirect)
  } else {
    yield put(externalEvents.fireExternalEvent('onVisibilityStateChange', 'failed'))
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

  return response.success
}

export function* loadSettings() {
  const settings = yield call(rest.fetchServerSettings)
  yield put(loginActions.setCaptchaKey(settings.captchaKey))
}

export function* initialize() {
  const success = yield call(checkSessionSaga)
  yield call(loadSettings)
  if (success) {
    yield call(handleRedirect)
  }
}

export default function* mainSagas() {
  yield all([takeLatest(actions.LOGIN, loginSaga), takeLatest(actions.INITIALIZE, initialize)])
}

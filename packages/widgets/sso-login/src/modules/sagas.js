import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import {externalEvents, rest, cache as cacheHelpers} from 'tocco-app-extensions'
import {cache, request, queryString, env} from 'tocco-util'

import {transformProviderEntities} from '../utils/providers'
import * as actions from './actions'

const entityName = 'Openid_provider'

export const intlSelector = state => state.intl
export const inputSelector = state => state.input

export function* loadProviders() {
  const intl = yield select(intlSelector)

  const query = {
    paths: ['unique_id', 'label', 'button_primary_color', 'button_secondary_color', 'button_icon', 'button_label'],
    conditions: {locale: intl.locale, active: true}
  }

  const entities = yield call(rest.fetchEntities, entityName, query, {method: 'GET'}, transformProviderEntities)
  yield put(actions.setProviders(entities))
}

export function* doLoginRequest() {
  yield call(request.executeRequest, 'login', {
    method: 'GET',
    headers: new Headers({
      'X-Business-Unit': env.getBusinessUnit()
    })
  })
}

export function* getRedirectUrl() {
  const {_redirect_url: queryUrl} = yield call(queryString.fromQueryString, window.location.search)
  const {redirectUrl: inputUrl} = yield select(inputSelector)

  return queryUrl || inputUrl
}

export function* handleRedirect() {
  const redirectUrl = yield call(getRedirectUrl)
  if (redirectUrl) {
    window.location.href = redirectUrl
  }
}

export function* loginCompleted({payload: {result}}) {
  const {appContext} = yield select(inputSelector)

  const needsCacheInvalidation = yield call(cacheHelpers.hasInvalidCache)
  if (needsCacheInvalidation) {
    yield call(cache.clearAll)
  } else {
    yield call(cache.clearShortTerm)
  }

  if (appContext?.embedType === 'widget') {
    if (result?.successful) {
      // call /nice2/login to notify WordPress Tocco Plugin that user has logged in
      yield call(doLoginRequest)
      yield call(handleRedirect)
      // TODO: TOCDEV-6243 "Sichtbarkeitsstatus für Success"
    } else if (result?.registration) {
      // TODO: TOCDEV-6243 "Sichtbarkeitsstatus für Registration"
    } else {
      // TODO: TOCDEV-6243 "Sichtbarkeitsstatus für Error"
    }
  }

  yield put(externalEvents.fireExternalEvent('loginCompleted', result))
}

export default function* mainSagas() {
  yield all([takeLatest(actions.LOAD_PROVIDERS, loadProviders), takeLatest(actions.LOGIN_COMPLETED, loginCompleted)])
}

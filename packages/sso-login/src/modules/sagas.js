import {externalEvents, rest} from 'tocco-app-extensions'

import {transformProviderEntities} from '../utils/providers'
import * as actions from './actions'

import {takeLatest, fork, all, call, put, select} from 'redux-saga/effects'

const entityName = 'Openid_provider'

export const intlSelector = state => state.intl

export function* loadProviders() {
  const intl = yield select(intlSelector)

  const query = {
    paths: ['unique_id', 'label', 'button_primary_color', 'button_secondary_color', 'button_icon', 'button_label'],
    conditions: {locale: intl.locale, active: true}
  }

  const entities = yield call(rest.fetchEntities, entityName, query, {method: 'GET'}, transformProviderEntities)
  yield put(actions.setProviders(entities))
}

export function* loginCompleted({payload: {result}}) {
  yield put(externalEvents.fireExternalEvent('loginCompleted', result))
}

export default function* mainSagas() {
  yield all([
    fork(takeLatest, actions.LOAD_PROVIDERS, loadProviders),
    fork(takeLatest, actions.LOGIN_COMPLETED, loginCompleted)
  ])
}

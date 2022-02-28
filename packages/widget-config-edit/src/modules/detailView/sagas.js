import {all, call, put, select, takeEvery} from 'redux-saga/effects'
import {externalEvents, rest, notification, selection as selectionUtil} from 'tocco-app-extensions'
import {consoleLogger} from 'tocco-util'

import * as actions from './actions'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([
    takeEvery(actions.FETCH_SPECIFIC_CONFIG_ENTITY_ID, fetchSpecificConfigEntityId),
    takeEvery(actions.LINK_CREATED_SPECIFIC_CONFIG, linkCreatedSpecificConfig),
    takeEvery(actions.FIRE_SUCCESS, fireSuccess)
  ])
}

export function* fetchSpecificConfigEntityId() {
  try {
    const configKey = yield call(getConfigKey)
    const response = yield call(rest.requestSaga, `/widget/configs/${configKey}/specific-config`)
    yield put(actions.setSpecificConfigEntityId(response.body))
  } catch (e) {
    consoleLogger.logError('Failed to fetch specific config entity id', e)
    yield put(actions.setSpecificConfigEntityId(null))
    yield put(
      notification.toaster({
        type: 'error',
        title: 'client.actions.widget-config-edit.fetchErrorToasterTitle'
      })
    )
  }
}

export function* linkCreatedSpecificConfig({payload: {specificConfigEntityId}}) {
  try {
    const configKey = yield call(getConfigKey)
    const resource = `/widget/configs/${configKey}/specific-config`
    yield call(rest.requestSaga, resource, {
      method: 'PUT',
      body: specificConfigEntityId
    })
    yield put(actions.fireSuccess())
  } catch (e) {
    consoleLogger.logError('Failed to link specific config entity', e)
    yield put(actions.unsetLinking())
    yield put(
      notification.toaster({
        type: 'error',
        title: 'client.actions.widget-config-edit.linkErrorToasterTitle'
      })
    )
  }
}

export function* fireSuccess() {
  yield put(externalEvents.fireExternalEvent('onSuccess'))
}

export function* getConfigKey() {
  const {selection} = yield select(inputSelector)
  return selectionUtil.getSingleKey(selection, 'Widget_config')
}

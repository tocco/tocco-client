import {all, call, put, takeEvery} from 'redux-saga/effects'
import {rest, notification, externalEvents} from 'tocco-app-extensions'
import {consoleLogger, cache} from 'tocco-util'

import * as actions from './actions'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([takeEvery(actions.FETCH_DATA, fetchData), takeEvery(actions.POST_DATA, postData)])
}

export function* fetchData() {
  const url = '/reloadConfiguration'
  try {
    const response = yield call(rest.simpleRequest, url)
    let data = null
    if (response) {
      data = response.body.configurations
    }
    yield put(actions.setData(data))
  } catch (e) {
    consoleLogger.logError('Failed to fetch data', e)
    yield put(actions.setData(null))
    yield put(
      notification.toaster({
        type: 'error',
        title: 'client.actions.reload-configuration.fetch-error-message.header',
        body: 'client.actions.reload-configuration.fetch-error-message.body'
      })
    )
  }
}

export function* postData({payload: {data}}) {
  const url = '/reloadConfiguration'
  const options = {
    method: 'POST',
    body: data
  }
  try {
    yield put(actions.setLoading(true))
    yield call(rest.simpleRequest, url, options)
    yield put(
      notification.toaster({
        type: 'success',
        title: 'client.actions.reload-configuration.succes-message.header',
        body: 'client.actions.reload-configuration.succes-message.body'
      })
    )
    yield put(externalEvents.fireExternalEvent('onSuccess'))
  } catch (e) {
    consoleLogger.logError('Failed to fetch data', e)
    yield put(
      notification.toaster({
        type: 'error',
        title: 'client.actions.reload-configuration.error-message.header',
        body: 'client.actions.reload-configuration.error-message.body'
      })
    )
  }
  yield call(cache.clearAll)
  yield put(actions.setLoading(false))
}

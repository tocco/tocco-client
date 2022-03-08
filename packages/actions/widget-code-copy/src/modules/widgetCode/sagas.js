import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {rest, notification, selection as selectionUtil} from 'tocco-app-extensions'
import {js, consoleLogger} from 'tocco-util'

import {generateWidgetCode} from '../../utils/widgetCode'
import * as actions from './actions'

export const inputSelector = state => state.input
export const widgetCodeSelector = state => state.widgetCode

export default function* sagas() {
  yield all([
    takeEvery(actions.FETCH_WIDGET_CONFIG, fetchWidgetConfig),
    takeLatest(actions.COPY_WIDGET_CODE, copyWidgetCode)
  ])
}

export function* fetchWidgetConfig() {
  const {selection} = yield select(inputSelector)

  try {
    const widgetConfigKey = selectionUtil.getSingleKey(selection, 'Widget_config')
    const widgetConfig = yield call(rest.fetchEntity, 'Widget_config', widgetConfigKey, {paths: ['domain']})
    yield put(actions.setWidgetConfig(widgetConfig))
  } catch (err) {
    consoleLogger.logError('Failed to get selected Widget_config', err)
    yield put(
      notification.toaster({
        type: 'error',
        title: 'client.actions.widget-code-copy.toasterTitle',
        body: 'client.actions.widget-code-copy.fetchFailedMessage'
      })
    )
  }
}

export function* copyWidgetCode() {
  const {widgetConfig} = yield select(widgetCodeSelector)
  try {
    const widgetCode = generateWidgetCode(widgetConfig)
    yield call(js.copyToClipboard, widgetCode)
    yield put(
      notification.toaster({
        type: 'success',
        title: 'client.actions.widget-code-copy.toasterTitle',
        body: 'client.actions.widget-code-copy.copiedMessage'
      })
    )
  } catch (err) {
    consoleLogger.logError('Failed to generate and copy widget code', err)
    yield put(
      notification.toaster({
        type: 'error',
        title: 'client.actions.widget-code-copy.toasterTitle',
        body: 'client.actions.widget-code-copy.copyFailedMessage'
      })
    )
  }
}

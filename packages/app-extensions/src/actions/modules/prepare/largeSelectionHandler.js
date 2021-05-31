import {call, put, take} from 'redux-saga/effects'
import {channel} from 'redux-saga'
import {FormattedMessage} from 'react-intl'
import React from 'react'

import notifier from '../../../notifier'

const SELECTION_THRESHOLD_DEFAULT = 100

export default function* largeSelectionHandler(preparationResponse, params, definition, selection, config) {
  const threshold = definition.confirmationThreshold === null || definition.confirmationThreshold === undefined
    ? SELECTION_THRESHOLD_DEFAULT
    : definition.confirmationThreshold

  if (threshold !== -1 && selection && selection.count > threshold) {
    const confirmResponse = yield call(promptConfirm, selection.count)
    return {abort: !confirmResponse}
  }

  return {abort: false}
}

export function* promptConfirm(count) {
  const answerChannel = yield call(channel)
  const onYes = () => answerChannel.put(true)
  const onCancel = () => answerChannel.put(false)

  yield put(
    notifier.confirm(
      <FormattedMessage id="client.component.actions.confirmTitle"/>,
      <FormattedMessage id="client.component.actions.largeSelectionConfirm" values={{count}}/>,
      <FormattedMessage id="client.common.yes"/>,
      <FormattedMessage id="client.common.cancel"/>,
      onYes,
      onCancel
    )
  )
  return yield take(answerChannel)
}

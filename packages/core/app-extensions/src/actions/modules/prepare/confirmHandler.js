import React from 'react'
import {FormattedMessage} from 'react-intl'
import {channel} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'

import notification from '../../../notification'

export default function* confirmHandler(preparationResponse, params, definition, selection, config) {
  if (preparationResponse.preCheck && preparationResponse.preCheck.confirmMessage) {
    const confirmResponse = yield call(promptConfirm, preparationResponse.preCheck.confirmMessage)
    return {abort: !confirmResponse}
  }

  return {abort: false}
}

export function* promptConfirm(message) {
  const answerChannel = yield call(channel)
  const onYes = () => answerChannel.put(true)
  const onCancel = () => answerChannel.put(false)

  yield put(
    notification.confirm(
      'client.component.actions.confirmTitle',
      message,
      <FormattedMessage id="client.common.yes" />,
      <FormattedMessage id="client.common.cancel" />,
      onYes,
      onCancel
    )
  )
  return yield take(answerChannel)
}

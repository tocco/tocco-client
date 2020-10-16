import {call, put, take} from 'redux-saga/effects'
import {channel} from 'redux-saga'
import {FormattedMessage} from 'react-intl'
import React from 'react'

import notifier from '../../../notifier'

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
    notifier.confirm(
      'client.component.actions.confirmTitle',
      <FormattedMessage id={message}/>,
      <FormattedMessage id="client.common.yes"/>,
      <FormattedMessage id="client.common.cancel"/>,
      onYes,
      onCancel
    )
  )
  return yield take(answerChannel)
}

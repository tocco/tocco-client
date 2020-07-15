import React from 'react'
import {channel} from 'redux-saga'
import {FormattedMessage} from 'react-intl'
import {call, put, take} from 'redux-saga/effects'

import notifier from '../../../notifier'

export const answer = answer => ({answer})

const shouldRun = actionDefinition => actionDefinition.showConfirmMessage === true

export function* run(params, definition, ids) {
  const answerChannel = yield call(channel)
  const onYes = () => answerChannel.put(answer(true))
  const onCancel = () => answerChannel.put(answer(null))
  const message = <FormattedMessage
    id={definition.confirmationMessageText || 'client.component.actions.defaultConfirmMessage'}
    values={{length: ids.length}}
  />

  yield put(
    notifier.confirm(
      'client.component.actions.confirmTitle',
      message,
      <FormattedMessage id="client.common.yes"/>,
      <FormattedMessage id="client.common.cancel"/>,
      onYes,
      onCancel
    )
  )
  const response = yield take(answerChannel)
  return {
    abort: response.answer == null
  }
}

export default {shouldRun, run}

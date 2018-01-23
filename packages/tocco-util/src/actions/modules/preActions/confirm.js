import React from 'react'
import {call, put, take} from 'redux-saga/effects'
import {channel} from 'redux-saga'
import notifier from '../../../notifier'
import {FormattedMessage} from 'react-intl'

export const answer = answer => ({answer})

const shouldRun = actionDefinition => actionDefinition.showConfirmMessage === true

export function* run(params, definition, ids) {
  const answerChannel = yield call(channel)
  const onYes = () => answerChannel.put(answer(true))
  const onCancel = () => answerChannel.put(answer(null))
  const message = <FormattedMessage
    id={definition.confirmMessage || 'client.component.actions.defaultConfirmMessage'}
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

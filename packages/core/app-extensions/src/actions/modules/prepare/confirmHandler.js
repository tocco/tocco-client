import {FormattedMessage} from 'react-intl'
import {channel} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'

import notification from '../../../notification'

export default function* confirmHandler({preparationResponse}) {
  if (preparationResponse.preCheck && preparationResponse.preCheck.confirmMessage) {
    const {confirmMessage, defaultAction} = preparationResponse.preCheck
    const confirmResponse = yield call(promptConfirm, confirmMessage, defaultAction)
    return {abort: !confirmResponse}
  }

  return {abort: false}
}

export function* promptConfirm(message, defaultAction) {
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
      onCancel,
      defaultAction
    )
  )
  return yield take(answerChannel)
}

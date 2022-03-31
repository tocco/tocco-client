import {FormattedMessage} from 'react-intl'
import {channel} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'

import notification from '../../../notification'

export default function* largeSelectionHandler(preparationResponse, params, definition, selection, config) {
  if (definition.showConfirmation && selection && selection.count > definition.confirmationThreshold) {
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
    notification.confirm(
      <FormattedMessage id="client.component.actions.confirmTitle" />,
      <FormattedMessage id="client.component.actions.largeSelectionConfirm" values={{count}} />,
      <FormattedMessage id="client.common.yes" />,
      <FormattedMessage id="client.common.cancel" />,
      onYes,
      onCancel
    )
  )
  return yield take(answerChannel)
}

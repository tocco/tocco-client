import {isDirty as formsIsDirtySelector} from 'redux-form'
import {channel} from 'redux-saga'
import {select, call, put, take, race} from 'redux-saga/effects'
import {notification} from 'tocco-app-extensions'

import PendingChangesModal from '../../components/PendingChangesModal'
import {FORM_SUBMISSION_FAILED, FORM_SUBMITTED, submitForm} from '../entityDetail/actions'
import {FORM_ID} from '../entityDetail/sagas'

export function* pendingChangesHandler({definition}) {
  const isDirtySelector = yield call(formsIsDirtySelector, FORM_ID)
  const isDirty = yield select(isDirtySelector)

  if (isDirty) {
    const confirmResponse = yield call(promptConfirm, definition.id)
    if (confirmResponse === 'continue') {
      return {abort: false}
    }
    if (confirmResponse === 'abort') {
      return {abort: true}
    }
    if (confirmResponse === 'save') {
      // save changes and continue then
      yield put(submitForm())
      const response = yield race({
        submitted: take(FORM_SUBMITTED),
        failed: take(FORM_SUBMISSION_FAILED)
      })

      // only continue when save was successful
      const abort = !response.submitted
      return {abort}
    }
  }

  return {
    abort: false
  }
}

export function* promptConfirm(id) {
  const answerChannel = yield call(channel)

  yield put(
    notification.modal(
      `action-pending-changes-${id}`,
      null,
      'client.entity-detail.confirmDirtyBeforeAction',
      ({close}) => {
        const onYes = () => {
          close()
          answerChannel.put('save')
        }
        const onNo = () => {
          close()
          answerChannel.put('continue')
        }
        return <PendingChangesModal onYes={onYes} onNo={onNo} />
      },
      true,
      () => answerChannel.put('abort')
    )
  )
  return yield take(answerChannel)
}

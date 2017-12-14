import {takeEvery, fork, all, put, call, take} from 'redux-saga/effects'
import {channel} from 'redux-saga'
import * as actions from './actions'
import notifier from '../../notifier'
import {ClientQuestionCancelledException, requestSaga} from '../../rest'
import errorLogging from '../../errorLogging'

export default function* sagas(config) {
  yield all([
    fork(takeEvery, actions.ACTION_INVOKE, invokeAction, config)
  ])
}

export function* invokeAction(config, {payload}) {
  const {definition, entity, ids} = payload

  if (definition.type === 'ch.tocco.nice2.model.form.components.action.CreateAction') {
    // CUSTOM
  } else if (definition.type === 'ch.tocco.nice2.model.form.components.action.SimpleAction') {
    const confirmation = yield call(handleConfirm, definition, ids)
    if (confirmation.answer) {
      const randomId = Math.random()
      const title = definition.config.progressMsg || 'process...'

      yield put(notifier.blockingInfo(randomId, title, null, 'circle-o-notch fa-spin fa-fw'))
      yield call(invokeSimpleAction, definition, entity, ids)
      yield put(notifier.removeBlockingInfo(randomId))
    }
  }
}

export const answer = answer => ({answer})

export function* handleConfirm(definition, ids) {
  if (definition.config.confirm) {
    const answerChannel = yield call(channel)
    const onYes = () => answerChannel.put(answer(true))
    const onCancel = () => answerChannel.put(answer(null))
    const s = `${ids.length === 1 ? 'this entity' : ids.length + ' entities'}`
    yield put(
      notifier.confirm(
        'Confirm',
        `Are you sure you want to call this action for ${s}?`,
        'Yes',
        'Cancel',
        onYes,
        onCancel
      )
    )
    return yield take(answerChannel)
  }

  return answer(true)
}

export function* invokeSimpleAction(definition, entity, ids) {
  const {config} = definition
  try {
    const response = yield call(requestSaga, config.endpoint, {method: 'POST', body: {ids, entity}})

    const successfully = response.body.successful === true

    yield put(notifier.info(
      successfully ? 'success' : 'warning',
      response.body.message || 'Action completed',
      null,
      successfully ? 'check' : 'exclamation'
    ))
  } catch (error) {
    if (!(error instanceof ClientQuestionCancelledException)) {
      yield put(errorLogging.logError(
        'client.common.unexpectedError',
        'client.entity-detail.saveError',
        error
      ))
    }
  }
}

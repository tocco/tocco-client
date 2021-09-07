import {all, call, put, take, takeEvery} from 'redux-saga/effects'
import {channel} from 'redux-saga'
import {v4 as uuid} from 'uuid'
import React from 'react'

import * as actions from './actions'
import * as valueActions from '../values/actions'
import rest from '../../rest'
import notification from '../../notification'
import RemoteCreate from './RemoteCreateContainer'

export default function* sagas(config) {
  yield all([
    takeEvery(actions.OPEN_REMOTE_CREATE, openRemoteCreate, config)
  ])
}

export function* openRemoteCreate({detailApp}, {payload: {formName, formField}}) {
  const answerChannel = yield call(channel)
  const modalId = yield call(uuid)
  const buildCreateForm = ({close}) => <RemoteCreate
    targetEntity={formField.targetEntity}
    answerChannel={answerChannel}
    close={close}
    DetailApp={detailApp}/>
  yield put(notification.modal(modalId, formField.label, null, buildCreateForm, true))

  const {id} = yield take(answerChannel)
  const display = yield call(rest.fetchDisplay, formField.targetEntity, id)
  yield put(valueActions.changeFieldValue(formName, formField.path, {key: id, display}))
}

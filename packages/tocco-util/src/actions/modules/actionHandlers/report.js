import React from 'react'
import {channel} from 'redux-saga'

import {requestSaga} from '../../../rest'
import notifier from '../../../notifier'
import ReportSettings from '../../components/ReportSettings'

import {call, put, take} from 'redux-saga/effects'

export default function* (definition, entity, ids) {
  const reportSettingsResponse = yield call(requestSaga, `reports/${definition.id}/settings`)

  const settingsDefinition = reportSettingsResponse.body

  const answerChannel = yield call(channel)

  const onSubmit = values => answerChannel.put(values)

  yield put(notifier.modalComponent(
    Math.random(),
    settingsDefinition.description.name,
    null,
    () => (
      <ReportSettings
        onSubmit={onSubmit}
        settingsDefinition={settingsDefinition}
      />
    ),
    true
  ))

  const response = yield take(answerChannel)

  // eslint-disable-next-line no-console
  console.log('>>>>>response', response, entity, ids)
}

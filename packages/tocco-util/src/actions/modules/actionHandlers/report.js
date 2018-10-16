import React from 'react'
import {channel} from 'redux-saga'
import uuid from 'uuid/v4'

import {requestSaga, fetchEntity} from '../../../rest'
import notifier from '../../../notifier'
import ReportSettings from '../../components/ReportSettings'
import download from '../../../download'
import sagaHelpers from '../../../sagaHelpers'

import {call, put, take} from 'redux-saga/effects'

export default function* (actionDefinition, entity, ids) {
  const answerChannel = yield call(channel)
  const settingsModalId = yield call(displayReportSettings, actionDefinition, entity, ids, answerChannel)
  yield call(awaitSettingsSubmit, actionDefinition, answerChannel, settingsModalId, entity, ids)
}

export function* displayReportSettings(actionDefinition, entity, ids, answerChannel) {
  const options = {
    queryParams: {
      entity,
      ids: ids.join(',')
    }
  }

  const {body: settingsDefinition} = yield call(requestSaga, `report/${actionDefinition.reportId}/settings`, options)
  const onSubmit = values => answerChannel.put(values)
  const settingsModalId = yield call(uuid)

  yield put(notifier.modalComponent(
    settingsModalId,
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

  return settingsModalId
}

export function* awaitSettingsSubmit(definition, answerChannel, settingsModalId, entity, ids) {
  while (true) {
    const settings = yield take(answerChannel)
    const body = {entityModel: entity, entityIds: ids, ...settings}
    const requestOptions = {
      method: 'POST',
      body,
      acceptedStatusCodes: [400]
    }

    const generationsResponse = yield call(requestSaga, `report/${definition.reportId}/generations`, requestOptions)

    if (generationsResponse.status === 400) {
      yield call(handleFailedGenerationsRequest, settingsModalId, generationsResponse)
    } else {
      yield call(handleReportGenerations, settingsModalId, generationsResponse)
    }
  }
}

export function* handleReportGenerations(settingsModalId, generationsResponse) {
  yield put(notifier.removeModalComponent(settingsModalId))
  const pollingUrl = generationsResponse.headers.get('Location')
  const blockingInfoId = yield call(uuid)
  yield put(notifier.blockingInfo(blockingInfoId, 'client.common.report.inProgress', null, 'file-pdf'))

  const completed = yield call(sagaHelpers.checkStatusLoop, pollingUrl, 'in_progress')
  yield put(notifier.removeBlockingInfo(blockingInfoId))
  if (completed.body.status === 'completed') {
    yield call(handleSuccessfulReport, completed)
  } else {
    yield call(handleFailedReport)
  }
}

export function* handleSuccessfulReport(completed) {
  const outputJobId = completed.body.outputJobId
  const outputJob = yield call(fetchEntity, 'Output_job', outputJobId, {paths: ['document']})
  const {fileName, binaryLink} = outputJob.paths.document.value.value
  yield call(download.downloadUrl, binaryLink, fileName)
  yield put(notifier.info('success', 'client.common.report.successful', null))
}

export function* handleFailedReport() {
  yield put(notifier.info('error', 'client.common.report.failed', null))
}

export function* handleFailedGenerationsRequest(modalId, generationsResponse) {
  const title = 'client.common.report.failedGenerationTitle'
  const message = generationsResponse.body.message || 'client.common.report.failedGenerationMessage'
  yield put(notifier.info('warning', title, message))
}

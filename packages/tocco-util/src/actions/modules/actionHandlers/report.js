import React from 'react'
import {channel, delay} from 'redux-saga'
import uuid from 'uuid/v4'

import {requestSaga} from '../../../rest'
import notifier from '../../../notifier'
import ReportSettings from '../../components/ReportSettings'

import {call, put, take} from 'redux-saga/effects'

export default function* (actionDefinition, entity, ids) {
  const answerChannel = yield call(channel)
  const settingsModalId = yield call(displayReportSettings, actionDefinition, answerChannel)
  yield call(awaitSettingsSubmit, actionDefinition, answerChannel, settingsModalId, entity, ids)
}

export function* displayReportSettings(actionDefinition, answerChannel) {
  const {body: settingsDefinition} = yield call(requestSaga, `report/${actionDefinition.reportId}/settings`)
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

  const completed = yield call(checkReportStatusLoop, pollingUrl)
  yield put(notifier.removeBlockingInfo(blockingInfoId))
  if (completed.body.status === 'completed') {
    yield call(handleSuccessfulReport, completed)
  } else {
    yield call(handleFailedReport)
  }
}

export function* handleSuccessfulReport(completed) {
  const result = completed.body._links.result
  const outputJob = yield call(requestSaga, result.href, {queryParams: {_paths: 'document'}})
  const {fileName, binaryLink} = outputJob.body.paths.document.value.value
  yield call(downloadUrl, binaryLink, fileName)
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

export function* checkReportStatusLoop(location) {
  let delayer = 1
  while (true) {
    const response = yield call(requestSaga, location)
    if (response.body.status === 'in_progress') {
      yield delay(500 * delayer)
      if (delayer < 10) delayer++
    } else {
      return response
    }
  }
}

export function downloadUrl(url, fileName) {
  const a = document.createElement('a')
  a.href = url
  a.download = fileName || url.split('/').pop()
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  if (window.URL.revokeObjectURL) { window.URL.revokeObjectURL(url) }
  a.remove()
}

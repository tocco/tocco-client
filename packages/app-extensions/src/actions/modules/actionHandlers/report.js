import React from 'react'
import {channel} from 'redux-saga'
import {v4 as uuid} from 'uuid'
import {saga as sagaUtil, download, api} from 'tocco-util'
import {call, put, take} from 'redux-saga/effects'

import {submitActions} from '../../utils/report'
import rest from '../../../rest'
import notifier from '../../../notifier'
import ReportSettings from '../../components/ReportSettings'

export default function* (actionDefinition, selection, parent, params, config) {
  const answerChannel = yield call(channel)
  const settingsModalId = yield call(displayReportSettings, actionDefinition, selection, answerChannel, config)
  yield call(awaitSettingsSubmit, actionDefinition, answerChannel, settingsModalId, selection)
}

export function* displayReportSettings(actionDefinition, selection, answerChannel, config) {
  const options = {
    queryParams: {
      model: selection.entityName,
      ...(selection.mode === 'ID' ? {keys: selection.ids.join(',')} : {})
    }
  }

  const resource = `report/${actionDefinition.reportId}/settings`
  const {body: settingsDefinition} = yield call(rest.requestSaga, resource, options)
  const onSubmit = (submitAction, formValues) => answerChannel.put({
    submitAction,
    formValues,
    settingsDefinition
  })
  const settingsModalId = yield call(uuid)

  yield put(notifier.modalComponent(
    settingsModalId,
    settingsDefinition.description.name,
    null,
    () => (
      <ReportSettings
        listApp={config.listApp}
        formApp={config.formApp}
        onSubmit={onSubmit}
        settingsDefinition={settingsDefinition}
      />
    ),
    true
  ))

  return settingsModalId
}

export function* awaitSettingsSubmit(definition, answerChannel, settingsModalId, selection) {
  while (true) {
    const {
      submitAction,
      formValues: {customSettings, generalSettings, recipientSettings},
      settingsDefinition
    } = yield take(answerChannel)

    const customSettingsEntity = settingsDefinition.customSettings
      ? api.toEntity({
          __model: settingsDefinition.customSettings.entity.name,
          ...customSettings
        })
      : null

    const body = {
      entityModel: selection.entityName,
      selection,
      generalSettings,
      recipientSettings,
      customSettings: customSettingsEntity
    }

    const requestOptions = {
      method: 'POST',
      body,
      acceptedStatusCodes: [400]
    }

    const resource = `report/${definition.reportId}/generations`
    const generationsResponse = yield call(rest.requestSaga, resource, requestOptions)

    if (generationsResponse.status === 400) {
      yield call(handleFailedGenerationsRequest, settingsModalId, generationsResponse)
    } else {
      yield call(handleReportGenerations, settingsModalId, generationsResponse, submitAction)
    }
  }
}

export function* handleReportGenerations(settingsModalId, generationsResponse, submitAction) {
  yield put(notifier.removeModalComponent(settingsModalId))
  const pollingUrl = generationsResponse.headers.get('Location')
  const blockingInfoId = yield call(uuid)
  yield put(notifier.blockingInfo(blockingInfoId, 'client.common.report.inProgress', null, 'file-pdf'))

  const completed = yield call(sagaUtil.checkStatusLoop, rest.requestSaga, pollingUrl, 'in_progress')
  yield put(notifier.removeBlockingInfo(blockingInfoId))
  if (completed.body.status === 'completed') {
    yield call(handleSuccessfulReport, completed, submitAction)
  } else {
    yield call(handleFailedReport)
  }
}

export const getDownloadUrl = binaryLink =>
  download.addParameterToURL(binaryLink, 'download', true)

export function* handleSuccessfulReport(completed, submitAction) {
  const outputJobId = completed.body.outputJobId
  const outputJob = yield call(rest.fetchEntity, 'Output_job', outputJobId, {paths: ['document']})
  const {fileName, binaryLink} = outputJob.paths.document.value

  if (submitAction === submitActions.DOWNLOAD) {
    const downloadLink = yield call(getDownloadUrl, binaryLink)
    yield call(download.downloadUrl, downloadLink, fileName)
  } else if (submitAction === submitActions.DISPLAY) {
    yield call(download.openUrl, binaryLink)
  }

  yield put(notifier.info('success', 'client.common.report.successful', null, null, 3000))
}

export function* handleFailedReport() {
  yield put(notifier.info('error', 'client.common.report.failed', null))
}

export function* handleFailedGenerationsRequest(modalId, generationsResponse) {
  const title = 'client.common.report.failedGenerationTitle'
  const message = generationsResponse.body.message || 'client.common.report.failedGenerationMessage'
  yield put(notifier.info('warning', title, message))
}

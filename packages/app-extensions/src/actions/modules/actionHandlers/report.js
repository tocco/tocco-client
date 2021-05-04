import React from 'react'
import {channel} from 'redux-saga'
import {v4 as uuid} from 'uuid'
import {api} from 'tocco-util'
import {call, put, take} from 'redux-saga/effects'

import rest from '../../../rest'
import notification from '../../../notification'
import ReportSettings from '../../components/ReportSettings'
import {invokeActionAsync} from './simpleAction'

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
  const onSubmit = formValues => answerChannel.put({
    formValues,
    settingsDefinition
  })
  const settingsModalId = yield call(uuid)

  yield put(notification.modal(
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
      formValues: {customSettings, generalSettings, recipientSettings},
      settingsDefinition
    } = yield take(answerChannel)

    definition.endpoint = 'report/generations'
    const customSettingsEntity = settingsDefinition.customSettings
      ? api.toEntity({
          __model: settingsDefinition.customSettings.entity.name,
          ...customSettings
        })
      : null
    const params = {
      params: {
        reportParams: {
          reportId: definition.reportId,
          generalSettings,
          recipientSettings
        }
      },
      formData: customSettingsEntity
    }

    yield call(invokeActionAsync, definition, selection, null, params)
    yield put(notification.removeModal(settingsModalId))
  }
}

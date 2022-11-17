import {channel} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'
import {api, env} from 'tocco-util'
import {v4 as uuid} from 'uuid'

import notification from '../../../notification'
import rest from '../../../rest'
import ReportSettings from '../../components/ReportSettings'
import {invokeActionAsync} from './simpleAction'

export default function* (actionDefinition, selection, parent, params, config) {
  if (env.getEmbedType() === 'widget') {
    yield call(generateReportWithoutSettings, actionDefinition, selection)
  } else {
    const answerChannel = yield call(channel)
    const settingsModalId = yield call(displayReportSettings, actionDefinition, selection, answerChannel, config)
    yield call(awaitSettingsSubmit, actionDefinition, answerChannel, settingsModalId, selection)
  }
}

export function* displayReportSettings(actionDefinition, selection, answerChannel, config) {
  const settingsDefinition = yield call(getSettingsDefinition, actionDefinition, selection)
  const onSubmit = formValues =>
    answerChannel.put({
      formValues,
      settingsDefinition
    })
  const settingsModalId = yield call(uuid)

  yield put(
    notification.modal(
      settingsModalId,
      settingsDefinition.description.name,
      null,
      () => (
        <ReportSettings
          listApp={config.listApp}
          docsApp={config.docsApp}
          formApp={config.formApp}
          onSubmit={onSubmit}
          settingsDefinition={settingsDefinition}
        />
      ),
      true
    )
  )

  return settingsModalId
}

export function* generateReportWithoutSettings(actionDefinition, selection) {
  const settingsDefinition = yield call(getSettingsDefinition, actionDefinition, selection)
  const generalSettings = settingsDefinition.generalSettings.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: field.defaultValue?.key || field.defaultValue
    }),
    {}
  )
  actionDefinition.endpoint = 'report/generations'
  const params = {
    additionalProperties: {
      reportId: actionDefinition.reportId,
      generalSettings,
      recipientSettings: {}
    },
    formData: null
  }

  yield call(invokeActionAsync, actionDefinition, selection, null, params)
}

function* getSettingsDefinition(actionDefinition, selection) {
  const options = {
    body: selection,
    method: 'POST'
  }

  const resource = `report/${actionDefinition.reportId}/settings`
  const {body: settingsDefinition} = yield call(rest.requestSaga, resource, options)
  return settingsDefinition
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
      additionalProperties: {
        reportId: definition.reportId,
        generalSettings,
        recipientSettings
      },
      formData: customSettingsEntity
    }

    yield call(invokeActionAsync, definition, selection, null, params)
    yield put(notification.removeModal(settingsModalId))
  }
}

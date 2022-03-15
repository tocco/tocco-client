import _get from 'lodash/get'
import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import {rest, templateValues, externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'

export const selectionSelector = state => state.input.selection

export default function* mainSagas() {
  yield all([takeLatest(actions.LOAD_FORM_DATA, loadFormData), takeLatest(actions.RUN_EXPORT, runExport)])
}

export function* loadFormData({payload: {selection}}) {
  const {body: formData} = yield call(rest.requestSaga, 'action/export/formData', {
    method: 'POST',
    body: selection
  })

  yield put(
    actions.setAvailableColumns(
      formData.columns.map(column => ({
        id: column.fieldName,
        label: column.label,
        hidden: !column.selected
      }))
    )
  )
  yield put(actions.setDefaultValues(formData.defaultValues))
}

export function* runExport({payload: {columns}}) {
  const selectedPaths = columns
    .filter(column => !column.hidden)
    .reduce((acc, column) => ({...acc, [column.id]: column.label}), {})
  const selection = yield select(selectionSelector)
  const formValues = yield call(templateValues.getFormValues)
  const exportData = {
    paths: selectedPaths,
    printFieldNames: _get(formValues, 'print_field_names', false),
    languageKey: _get(formValues, ['relCorrespondence_language', 'key']),
    formatKey: _get(formValues, ['relExport_format', 'key']),
    filename: _get(formValues, 'filename'),
    archive: _get(formValues, 'archive', false)
  }
  yield call(rest.requestSaga, 'action/export', {
    method: 'POST',
    body: {
      selection,
      params: {background: true},
      additionalProperties: exportData
    }
  })
  // close action without message, notification gets handled over websocket
  yield put(externalEvents.fireExternalEvent('onSuccess', {title: null}))
}

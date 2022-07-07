import _get from 'lodash/get'
import _intersectionBy from 'lodash/intersectionBy'
import _unionBy from 'lodash/unionBy'
import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import {rest, templateValues, externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'

export const selectionSelector = state => state.input.selection
export const availableColumnsSelector = state => state.exportAction.availableColumns
export const defaultColumnsSelector = state => state.exportAction.defaultColumns
export const templateColumnsSelector = state => state.exportAction.templateColumns

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_FORM_DATA, loadFormData),
    takeLatest(actions.RUN_EXPORT, runExport),
    takeLatest(actions.HANDLE_TEMPLATE_CHANGE, handleTemplateChange),
    takeLatest(actions.SET_DEFAULT_COLUMNS, calculateAvailableColumns),
    takeLatest(actions.SET_TEMPLATE_COLUMNS, calculateAvailableColumns)
  ])
}

export function* loadFormData({payload: {selection}}) {
  const {body: formData} = yield call(rest.requestSaga, 'action/export/formData', {
    method: 'POST',
    body: selection
  })

  yield call(setColumns, actions.setDefaultColumns, formData.columns)
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

export function* handleTemplateChange({payload: {text}}) {
  if (text) {
    const selection = yield select(selectionSelector)
    const {body: templatePaths} = yield call(rest.requestSaga, 'action/export/templatePaths', {
      method: 'POST',
      body: {
        entityName: selection.entityName,
        text
      }
    })
    yield call(setColumns, actions.setTemplateColumns, templatePaths.columns)
  } else {
    yield put(actions.setTemplateColumns(null))
  }
}

function* setColumns(actionCreator, columns) {
  yield put(
    actionCreator(
      columns.map(column => ({
        id: column.fieldName,
        label: column.label,
        hidden: !column.selected
      }))
    )
  )
}

export function* calculateAvailableColumns() {
  const availableColumns = yield select(availableColumnsSelector)
  const defaultColumns = yield select(defaultColumnsSelector)
  const templateColumns = yield select(templateColumnsSelector)

  if (templateColumns) {
    const allColumns = _unionBy(
      templateColumns,
      defaultColumns.map(column => ({
        ...column,
        hidden: true
      })),
      column => column.id
    )
    yield put(actions.setAvailableColumns(allColumns))
  } else if (availableColumns) {
    const selectedColumns = _intersectionBy(availableColumns, defaultColumns, column => column.id)
    yield put(actions.setAvailableColumns(selectedColumns))
  } else {
    yield put(actions.setAvailableColumns(defaultColumns))
  }
}
